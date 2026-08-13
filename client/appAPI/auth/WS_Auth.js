


export class WS_Auth {
    
    /**
     * @param {string[]} providers 
     */
    constructor(providers) {
        this.auto_auth = (ws) => {
            for (const provider_name of providers) {
                const token = localStorage.getItem(`${provider_name}_token`)
                if (token) { ws.init(provider_name, token); return }
            }
        }

        const TIMEOUT_AUTH = 10_000

        this.auth = (ws, provider, token) => {
            return new Promise((resolve) => {
                const timeout = setTimeout(resolve, TIMEOUT_AUTH)
                try {
                    ws.send(`${provider}|${token}`)
                    ws.onmessage = async (e) => {
                        clearTimeout(timeout)
                        resolve(true)
                    }
                    ws.onclose = () => {
                        localStorage.removeItem(`${provider}_token`)
                        resolve(false)
                    }
                } catch {
                    localStorage.removeItem(`${provider}_token`)
                    resolve(false)
                }
            })
        }
    }
}