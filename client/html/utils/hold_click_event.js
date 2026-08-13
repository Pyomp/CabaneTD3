



/**
 * 
 * @param {Element} element 
 * @param {function} cb 
 */
export const hold_click_event = (element, cb) => {
    let timeout
    element.addEventListener('pointerdown', (e) => {
        element.setPointerCapture(e.pointerId)
        const repeat = () => {
            cb()
            timeout = setTimeout(repeat, 100)
        }
        cb()
        timeout = setTimeout(repeat, 500)
    })
    element.addEventListener('lostpointercapture', () => {
        clearTimeout(timeout)
    })
}







