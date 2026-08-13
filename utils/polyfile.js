





if (window.requestIdleCallback === undefined) {
    window.requestIdleCallback = (cb) => {
        return setTimeout(cb, Math.random() * 5)
    }
    window.cancelIdleCallback = clearTimeout
}



