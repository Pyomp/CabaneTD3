




import { User_Data } from '../../../common/user_data/User_Data.js'
import {
    CMD_LOAD_APP_DATA,
    CMD_LOAD_APP_DATA_FORCE,
    CMD_SAVE_APP_DATA,
    CMD_SAVE_APP_DATA_FORCE
} from '../../../constants/cmd.js'
import { WS_Client } from '../WS_Client.js'

export class WS_C_Save_User_Data {

    /**
     * @param {User_Data} user_data 
     * @param {WS_Client} ws_client
     */
    constructor(
        user_data,
        ws_client,
    ) {

        this.save = async () => {
            const res = await ws_client.req(CMD_SAVE_APP_DATA + JSON.stringify(
                user_data.toArray()))
            if (res?.[2] === 0) return true
            else return false
        }

        const fake_user_data = new User_Data()
        this.load = async () => {
            const res = await ws_client.req(CMD_LOAD_APP_DATA + user_data.game.xp)
            if (typeof res === 'string') {
                try {

                    const o = JSON.parse(res)
                    fake_user_data.fromArray(o)
                    if (fake_user_data.game.xp > user_data.game.xp) {
                        user_data.fromArray(o)
                    }

                    return true

                } catch (e) { return false }

            } else return false
        }
    }
}











