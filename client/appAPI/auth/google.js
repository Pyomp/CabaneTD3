

import { nonce } from '../../../utils/utils.js'

const clientID = '648458932726-ik2ggqrl5qdjl5ikl5rjvtgnjrj26pbq.apps.googleusercontent.com'

export const get_google_token = async (redirectURI = `http${location.host === 'localhost' ? '' : 's'}://${location.host}/google/`) => {
    const token = localStorage.getItem('google_token')
    if (token) {
        return token
    } else {
        const state = nonce(15)
        sessionStorage.setItem('state', state)

        await new Promise((resolve) => {
            const url = `https://accounts.google.com/o/oauth2/v2/auth` +
                `?scope=openid` +
                `&response_type=token` +
                `&redirect_uri=${redirectURI}` +
                `&client_id=${clientID}` +
                `&state=${state}`

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
        return localStorage.getItem('google_token') || undefined
    }
}








