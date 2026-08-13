

import { get_id_from_provider } from '../auth_fetch.js'

import { Frame_Analyse } from './Frame_Analyse.js'
import { insertDB_id, selectDB_id, updateDB_id } from '../db/id_db.js'
import { insertDB_user, selectDB_user, updateDB_user } from '../db/user_db.js'
import { RES0 } from '../../constants/cmd.js'
import { User_Data } from '../../common/user_data/User_Data.js'
import { DISCORD_ID, GOOGLE_ID, TWITCH_ID } from '../../constants/providers_id.js'

const buffer_tmp = Buffer.from([0, 0])

export const user_set = new Set()
export const user_map = {}
export class User {

    appData = new User_Data()

    constructor(id, account_linked) {
        this.id = id
        this.pseudo_buffered
        this.cmd = {}
        this.cheat_score = 0

        user_map[id] = (async () => {
            let appData_server = await selectDB_user(id)
            if (!appData_server) {
                if (await insertDB_user(id) === undefined) return
            } else {
                this.appData.fromArray(appData_server)
            }

            this.appData.game.id = id
            this.appData.game.account_linked = account_linked || 0

            clearTimeout(dispose_timeout)
            this.update_pseudo_buffered()
            user_map[id] = this
            user_set.add(this)
            return this
        })()

        this.update_pseudo_buffered = () => {
            const pseudo = this.appData.game.pseudo
            const pseudo_buffer = Buffer.from(pseudo)
            buffer_tmp.writeUint16LE(pseudo_buffer.length)
            this.pseudo_buffered = Buffer.concat([pseudo_buffer, buffer_tmp])
        }

        const dispose = () => {
            updateDB_user(id, this.appData.toArray())
            delete user_map[id]
            user_set.delete(this)
            frame_analyse.dispose()
        }

        // websocket
        let dispose_timeout = setTimeout(dispose, 10 * 1000)
        this.send = () => { }
        let ws
        this.addWs = async (wsP) => {
            clearTimeout(dispose_timeout)
            if (ws) {
                ws.onclose = () => { }
                ws.close(1008, 'to_many_connection')
            }
            ws = wsP
            this.send = ws.send.bind(ws)
            this.send(RES0)

            ws.onclose = () => {
                console.log(this.id + ' ws disconnected')

                dispose()
                // dispose_timeout = setTimeout(dispose, 10_0000)
            }
        }

        const frame_analyse = new Frame_Analyse(id)
        this.frame_analyse = frame_analyse.frame_analyse
    }
}

export const getUser = async (provider, token) => {
    // id
    const providerId = await get_id_from_provider(provider, token)
    if (!providerId) return

    let appId, account_linked
    const id_res = await selectDB_id[provider]?.(providerId)
    if (id_res === undefined) {
        appId = await insertDB_id()
        if (appId === undefined) return
        const res = await updateDB_id[provider]?.(appId, providerId)
        account_linked = 1
        if (res === undefined) return
    } else {
        appId = id_res.app
        account_linked =
            (id_res.twitch === undefined ? 0 : TWITCH_ID)
            + (id_res.discord === undefined ? 0 : DISCORD_ID)
            + (id_res.google === undefined ? 0 : GOOGLE_ID)
    }

    // user
    let user = await user_map[appId]
    if (!user) {
        new User(appId, account_linked)
        user = await user_map[appId]
    }

    return user
}


