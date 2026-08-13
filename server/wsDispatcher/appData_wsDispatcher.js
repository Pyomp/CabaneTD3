



import { User_Data } from '../../common/user_data/User_Data.js'
import {
    CMD_LOAD_APP_DATA,
    CMD_LOAD_APP_DATA_FORCE,
    CMD_REQ,
    CMD_SAVE_APP_DATA,
    CMD_SAVE_APP_DATA_FORCE,
    RES0,
    RES1,
} from '../../constants/cmd.js'
import { wait } from '../../utils/utils.js'
import { User } from '../User/User.js'

const fakeAppData = new User_Data()
/**
 * @type {Object.<string, (user: User, payload: string | Uint8Array )=>{}>}
 */
export const wsDispatcher_appData = {
    // save appData
    [CMD_SAVE_APP_DATA]: (user, payload) => {
        if (payload.length > 2000) {
            user.cheat_score += 10
            user.frame_analyse(CMD_SAVE_APP_DATA, `payload.length > 2000`)
            user.send(RES1)
            return
        }

        user.frame_analyse(CMD_SAVE_APP_DATA, payload)

        try {
            const data_array = JSON.parse(payload.substring(3))
            fakeAppData.fromArray(data_array)
            if (user.appData.game.xp >= fakeAppData.game.xp) {
                user.send(RES1)
            } else {
                user.appData.fromArray(data_array)
                user.send(RES0)
            }
        } catch { user.send(RES1) }
    },

    [CMD_SAVE_APP_DATA_FORCE]: async (user, payload) => {
        if (payload.length > 2000) {
            user.cheat_score += 10
            user.frame_analyse(CMD_SAVE_APP_DATA_FORCE, 'payload.length > 2000')
            user.send(RES1)
            return
        }
        user.frame_analyse(CMD_SAVE_APP_DATA_FORCE, payload)
        try {
            await wait(1000)
            const o = JSON.parse(payload.substring(3))
            user.appData.fromArray(o)
            user.send(RES0)
        } catch (e) { console.error(e); user.send(RES1) }
    },

    // load appData
    [CMD_LOAD_APP_DATA]: (user, payload) => {
        if (payload.length > 10) {
            user.cheat_score += 10
            user.frame_analyse(CMD_LOAD_APP_DATA, 'payload.length > 10')
            user.send(RES1)
            return
        }

        user.frame_analyse(CMD_LOAD_APP_DATA, payload)

        try {
            const xp = +payload.substring(3)
            if (user.appData.game.xp > xp)
                user.send(CMD_REQ + JSON.stringify(user.appData.toArray()))
            else
                user.send(RES1)
        } catch { user.send(RES1) }
    },
    [CMD_LOAD_APP_DATA_FORCE]: (user, payload) => {
        if (payload.length > 10) {
            user.cheat_score += 10
            user.frame_analyse(CMD_LOAD_APP_DATA_FORCE, 'payload.length > 10')
            user.send(RES1)
            return
        }
        user.frame_analyse(CMD_LOAD_APP_DATA_FORCE, payload)
        user.send(CMD_REQ + JSON.stringify(user.appData.toArray()))
    }
}