

import { nonce } from '../../../utils/utils.js'

const clientID = '944275913741312080'



export const get_discord_token = async (redirectURI = `http${location.host === 'localhost' ? '' : 's'}://${location.host}/discord/`) => {
    const token = localStorage.getItem('discord_token')
    if (token) {
        return token
    } else {
        const state = nonce(15)
        sessionStorage.setItem('state', state)

        await new Promise((resolve) => {
            const url = `https://discord.com/api/oauth2/authorize` +
                `?response_type=token` +
                `&client_id=${clientID}` +
                `&redirect_uri=${redirectURI}` +
                `&state=${state}` +
                `&scope=identify`

            const window_popup = window.open(url,
                "_blank",
                "titlebar=0"
                + ",menubar=0"
                + ",dependent=1"
                + ",modal=1"
                + ",alwaysRaised=1"
                + ",dialog=1"
                + ",scrollbars=1"
                + ",resizable=1"
                + ",width=400"
                + ",height=600")

            const interval = setInterval(() => {
                if (window_popup.closed) {
                    clearInterval(interval)
                    delete window.oauth_token_resolve
                    resolve()
                }
            }, 500)
        })

        return localStorage.getItem('discord_token') || undefined
    }
}








