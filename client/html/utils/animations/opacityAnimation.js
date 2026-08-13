
export const OpacityAnimation = (element, parent, fade_s = 0.1) => {
    let displayed

    if (element.offsetParent === null) displayed = false
    else displayed = true

    if (element.onanimationend === undefined) {
        return {
            display: () => { parent.appendChild(element) },
            close: () => { element.remove() },
        }
    }

    element.onanimationend = () => {
        if (!displayed) element.remove()
    }


    const display = () => {
        if (displayed) return
        displayed = true
        element.style.animation = `${fade_s}s opacityIn`
        parent.appendChild(element)
    }
    
    const close = () => {
        if (!displayed) return
        displayed = false
        element.style.animation = `${fade_s}s opacityOut`
    }

    return {
        display: display,
        close: close,
    }
}
