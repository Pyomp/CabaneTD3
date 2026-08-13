


import { cbH, empty_function } from '../../utils/utils.js'
import { WS_Auth } from './auth/WS_Auth.js'
import { CMD_LINK_PROVIDER, CMD_REQ, CMD_REQ_BIN, RES0 } from '../../constants/cmd.js'

export class WS_Client {
    static OPEN = 0
    static CONNECTING = 1
    static CLOSE = 2

    on_state = new Set()
    #state = WS_Client.CLOSE
    get state() { return this.#state }
    set state(a) {
        this.#state = a
        cbH(this.on_state)
    }

    send = empty_function

    /**
     * @param {WS_Auth} ws_auth 
     */
    constructor(
        ws_auth,
    ) {

        const dispatcher = {}
        this.dispatcher = dispatcher

        const onMessage = (e) => {
            const data = e.data

            if (typeof data === 'string') {
                const cb = dispatcher[data.substring(0, 3)]

                if (cb) cb(data.substring(3))
                else console.warn(`WS message string callback unknown: ${data.substring(0, 3)}`)
            } else {
                // blob
                data.arrayBuffer().then((buffer) => {
                    const uint8array = new Uint8Array(buffer)
                    const cmd = (uint8array[0] << 8) + uint8array[1]
                    const cb = dispatcher[cmd]
                    if (cb) cb(uint8array)
                    else console.warn(`WS message blob callback unknown: ${cmd}`)
                })
            }
        }

        const connecting_timeout_time = 2000
        let connecting_timeout
        const connecting = (e) => {
            if (e?.reason === 'to_many_connection') {
                this.state = WS_Client.CLOSE
                return
            }
            if (this.state !== WS_Client.CONNECTING)
                this.state = WS_Client.CONNECTING

            connecting_timeout = setTimeout(this.init, connecting_timeout_time)
        }

        let ws
        let provider_save, token_save
        this.init = (provider = provider_save, token = token_save) => {
            provider_save = provider
            token_save = token

            // link_provider
            if (this.state === WS_Client.OPEN) {
                return new Promise(async (resolve) => {
                    const res = await this.req(CMD_LINK_PROVIDER + JSON.stringify([provider, token]))
                    if (res[2] !== 0) localStorage.removeItem(`${provider}_token`)
                    resolve(res)
                })
            }

            this.state = WS_Client.CONNECTING

            return new Promise((resolve) => {
                try {
                    ws = new WebSocket(`ws${location.host === 'localhost' ? '' : 's'}://${location.host}/`)

                    ws.onopen = async (e) => {

                        // auth
                        const authResult = await ws_auth.auth(ws, provider_save, token_save)
                        if (!authResult) {
                            this.close()
                            resolve()
                            return
                        }

                        // auth success
                        ws.onmessage = onMessage
                        this.send = ws.send.bind(ws)

                        resolve(RES0)

                        this.state = WS_Client.OPEN
                    }

                    ws.addEventListener('close', connecting)
                    ws.addEventListener('close', () => { this.send = empty_function })

                    ws.onerror = (e) => {
                        console.warn('appWS error: ', e)
                    }
                } catch (error) {
                    console.log(error)
                    connecting()
                }
            })
        }


        // request
        const TIMEOUT_REQ = 20_000
        const MAX_REQ = 10

        let reqPromise
        let reqResolve = () => { }
        let reqNb = 0
        let timeout_req
        dispatcher[CMD_REQ] = (data) => {
            clearTimeout(timeout_req)
            reqResolve(data)
        }
        dispatcher[CMD_REQ_BIN] = (data) => {
            clearTimeout(timeout_req)
            reqResolve(data)
        }

        this.req = (message) => {
            if (reqNb > MAX_REQ) { console.log(`! req > ${MAX_REQ} req ! :(`) }
            reqNb++
            reqPromise = new Promise(async (resolve) => {
                await reqPromise
                reqNb--
                if (this.state !== WS_Client.OPEN) { resolve(); return }

                reqResolve = resolve

                timeout_req = setTimeout(() => {
                    console.log('timeout req (server not connected ?)')
                    resolve()
                }, TIMEOUT_REQ)

                ws.send(message)
            })
            return reqPromise
        }

        this.close = () => {
            if (this.state === WS_Client.CLOSE) return
            clearTimeout(connecting_timeout)
            this.state = WS_Client.CLOSE
            ws.removeEventListener('close', connecting)
            if (ws.close) ws.close()
        }
    }
}
