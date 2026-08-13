

export const init_caches = async () => {
    if(!self.caches) return
    const version = +(await (await fetch(`./version.txt`)).text())
    const lastVersion = +localStorage.getItem('app_version') || 0
    
    if (lastVersion !== version) {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => {
            caches.delete(key)
        }))
        const cache = await caches.open('main')
        await cache.addAll([
            './',
        ])
        localStorage.setItem('app_version', version)
        console.log('Cache cleared.');
        location.reload()
    }
}

export const init_service_worker = (url = './sw.js', scope = '/') => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(url, { type: 'module' }).then((reg) => {
            if (reg.installing) {
                // console.log('Service worker installing')
            } else if (reg.waiting) {
                // console.log('Service worker installed')

            } else if (reg.active) {
                // console.log('Service worker active')
            }
        }).catch((error) => {
            // registration failed
            console.log('Registration failed with ' + error)
        })
    }
}