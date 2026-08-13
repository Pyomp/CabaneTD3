





import { DISCORD_ID, GOOGLE_ID, TWITCH_ID } from '../../../constants/providers_id.js'
import { get_discord_token } from './discord.js'
import { get_google_token } from './google.js'
import { get_twitch_token } from './twitch.js'


export class Provider_Info {

    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {()=>{}} get_token 
     */
    constructor(
        id,
        name,
        color,
        get_token,
    ) {
        this.id = id
        this.name = name
        this.color = color
        /** @type {async} */
        this.get_token = get_token
    }
}

export const providers_info = {
    twitch: new Provider_Info(TWITCH_ID, 'twitch', 'rgb(92, 22, 197)', get_twitch_token),
    discord: new Provider_Info(DISCORD_ID, 'discord', 'rgb(84, 96, 230)', get_discord_token),
    google: new Provider_Info(GOOGLE_ID, 'google', 'rgb(207, 67, 50)', get_google_token),
}

