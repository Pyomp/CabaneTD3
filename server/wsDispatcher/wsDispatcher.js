





import {
    CMD_LINK_PROVIDER,
    RES0, RES1, RES2, RES3, RES4,
} from '../../constants/cmd.js'
import { get_id_from_provider } from '../auth_fetch.js'
import { wsDispatcher_appData } from './appData_wsDispatcher.js'
import { selectDB_id, updateDB_id } from '../db/id_db.js'
import { User } from '../User/User.js'

/** @type {Object.<string, (user: User, payload: string | Uint8Array )=>{}>} */
export const dispatcher1 = {
    ...wsDispatcher_appData,
    [CMD_LINK_PROVIDER]: async (user, d) => {
        if (d.length > 1000) {
            user.cheat_score += 10
            user.frame_analyse(CMD_LINK_PROVIDER, 'd.length > 1000')
            user.send(RES4)
            return
        }
        user.frame_analyse(CMD_LINK_PROVIDER, d)

        try {
            const [provider_name, token] = JSON.parse(d.substring(3))

            const provider_id = await get_id_from_provider(provider_name, token)
            if (provider_id === undefined) { user.send(RES3); return }
            const app_id = await selectDB_id[provider_name](provider_id)
            if (app_id === user.id) {
                user.send(RES1)
            } else if (app_id === undefined) {
                const res = await updateDB_id[provider_name](user.id, provider_id)
                if (res === undefined) {
                    user.send(RES4)
                } else {
                    user.send(RES0)
                }
            } else {
                user.send(RES2)
            }
        } catch { user.send(RES4) }
    }
}

