
import { WebSocketServer } from 'ws'
import { dispatcher1 } from './wsDispatcher/wsDispatcher.js'
import { isDev } from '../env.js'
import { getUser, User } from './User/User.js'
import { info } from './monitoring/info.js'

const init = (server) => {
    delete wss.init

    const webSocketServer = new WebSocketServer({ server })
    webSocketServer.on('connection', async (wsConnection, req) => {
        const ip = req.socket.remoteAddress

        wsConnection.onerror = (e) => {
            console.log(`WS Error from ${ip}: `, e)
        }
        const connectionTimeout = setTimeout(wsConnection.terminate, 30 * 1000)

        wsConnection.onmessage = async (e) => {
            wsConnection.onmessage = () => { }
            const [provider, token] = e.data.split('|', 2)

            const user = await getUser(provider, token)
            clearTimeout(connectionTimeout)
            if (!user) { setTimeout(wsConnection.terminate, 1000); return }

            info.connection_number++
            console.log(`WS Message connection OK`)

            wsConnection.onmessage = (e) => {
                const payload = e.data

                if (isDev) console.log(`${new Date().toISOString()} WS Message from ${ip}: `, payload)
                if (typeof payload === 'string') {
                    const cb = dispatcher[payload.substring(0, 3)]
                    if (cb) {
                        cb(user, payload, wsConnection)
                    } else {
                        if (isDev) console.log('WS message callback unknown.')
                        else user.cheat_score += 10
                    }
                } else {
                    const cmd = (payload[0] << 8) + payload[1]
                    const cb = dispatcher[cmd]
                    if (cb) cb(user, payload, wsConnection)
                    else if (isDev) console.warn(`WS message callback unknown: ${cmd}`)
                    else user.cheat_score += 10
                }
            }
            user.addWs(wsConnection)
        }
    })
}

const dispatcher = {
    ...dispatcher1
}
/**
 * @param {string} cmd length must be 3
 * @param {function(User, (Buffer|string), WebSocket)} cb 
 */
const addLookup = (cmd, cb) => {
    dispatcher[cmd] = cb
}
export const wss = {
    init: init,
    addLookup: addLookup
}
