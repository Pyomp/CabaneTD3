

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('main').then((cache) => {
            return cache.addAll([
                './game',
            ])
        })
    )
})

self.addEventListener('fetch', (e) => {
    const req = e.request
    const origin = location.origin
    const url = req.url
    if (//isDev||
        origin !== url.substring(0, origin.length)
        || [`${origin}/version.txt`].includes(url)) {
        e.respondWith(
            fetch(req)
                .catch((err) => { console.warn(url, err) })
        )
    } else {
        e.respondWith(caches.match(req).then((response) => {
            // caches.match() always resolves
            // but in case of success response will have value
            if (response !== undefined) {
                return response
            } else {
                return fetch(req)
                    .then((response) => {
                        // response may be used only once
                        // we need to save clone to put one copy in cache
                        // and serve second one
                        let responseClone = response.clone()
                        caches.open('main').then((cache) => {
                            cache.put(req, responseClone)
                        })
                        return response
                    })
                    .catch((err) => { console.warn(url, err) })
            }
        }))
    }
})
