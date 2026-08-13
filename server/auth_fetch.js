import { request as httpsRequest } from 'https'

export const get_id_from_provider = (provider, token) => {
    switch (provider) {
        case 'twitch':
            return getTwitchId(token)

        case 'discord':
            return get_discord_id(token)

        case 'google':
            return get_google_id(token)

        default:
            return
    }
}

const twitch_clientID = 'tywvxcigayfhk02zlbz8ijyy01ypve'
const getTwitchId = (oauthToken) => {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.twitch.tv',
            port: 443,
            path: '/helix/users',
            method: 'GET'
        }
        try {
            const req = httpsRequest(options, (res) => {
                let body = ''
                res.on('data', (d) => { body += d.toString() })
                res.on('end', async () => {
                    try {
                        const twitchId = JSON.parse(body)['data'][0]['id']
                        resolve(twitchId)
                    } catch { resolve() }
                })
            })
            req.on('error', (e) => { console.error(e); resolve() })

            req.setHeader('Client-Id', twitch_clientID)
            req.setHeader('Authorization', `Bearer ${oauthToken}`)
            req.end()
        } catch { resolve() }
    })
}

const get_discord_id = (oauthToken) => {
    return new Promise((resolve) => {
        const options = {
            hostname: 'discordapp.com',
            port: 443,
            path: '/api/users/@me',
            method: 'GET'
        }
        try {
            const req = httpsRequest(options, (res) => {
                let body = ''
                res.on('data', (d) => { body += d.toString() })
                res.on('end', async () => {
                    try {
                        const id = JSON.parse(body)['id']
                        resolve(id)
                    } catch { resolve() }
                })
            })
            req.on('error', (e) => { console.error(e); resolve() })

            req.setHeader('Authorization', `Bearer ${oauthToken}`)
            req.end()
        } catch { resolve() }
    })
}

const get_google_id = (oauthToken) => {
    return new Promise((resolve) => {
        const options = {
            hostname: 'oauth2.googleapis.com',
            port: 443,
            path: `/tokeninfo?access_token=${oauthToken}`,
            method: 'GET'
        }
        try {
            const req = httpsRequest(options, (res) => {
                let body = ''
                res.on('data', (d) => { body += d.toString() })
                res.on('end', async () => {
                    try {
                        const id = JSON.parse(body)['sub']
                        resolve(id)
                    } catch { resolve() }
                })
            })
            req.on('error', (e) => { console.error(e); resolve() })

            req.end()
        } catch { resolve() }
    })
}