import { WS_C_Save_User_Data } from './api/Save_User_Data.js'
import { WS_Auth } from './auth/WS_Auth.js'
import { WS_Client } from './WS_Client.js'





export class WS_Manager {
    constructor(
        user_data
    ) {
        const ws_auth = new WS_Auth(['twitch', 'discord', 'google'])

        this.ws_client = new WS_Client(
            ws_auth
        )

        this.save_user_data = new WS_C_Save_User_Data(
            user_data,
            this.ws_client,
        )
    }
}








