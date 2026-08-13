import { cbH, createTimeoutBuffer } from '../../../utils/utils.js'
import { resizerIMG } from './icons/icons.js'

const on_first_interaction = new Set()
addEventListener('pointerdown', () => {
    cbH(on_first_interaction)
}, { capture: true, once: true })

/**
 * @param {HTMLElement} element 
 * @param {function(e, dx, dy)} onMove
 * @param {function(e)} onDown
 * @param {function(e)} onUp
 */
export const pointerMove = (element, onMove, onDown, onUp) => {
    let lastX, lastY
    element.style.userSelect = 'none'
    element.style.touchAction = 'none'
    let activated = false

    const onpointerdown = (e) => {
        activated = true
        element.setPointerCapture(e.pointerId)
        lastX = e.clientX
        lastY = e.clientY
        if (onDown) onDown(e)
    }
    const onpointermove = (e) => {
        if (activated) {
            onMove(
                e,
                e.clientX - lastX,
                e.clientY - lastY
            )
            lastX = e.clientX
            lastY = e.clientY
        }
    }
    const onlostpointercapture = (e) => {
        activated = false
        element.releasePointerCapture(e.pointerId)
        if (onUp) onUp(e)
    }
    element.addEventListener('pointerdown', onpointerdown)
    element.addEventListener('pointermove', onpointermove)
    element.addEventListener('lostpointercapture', onlostpointercapture)

    return () => {
        element.removeEventListener('pointerdown', onpointerdown)
        element.removeEventListener('pointermove', onpointermove)
        element.removeEventListener('lostpointercapture', onlostpointercapture)
    }
}

/**
 *  @param {HTMLElement} container
 *  @param {Set} onPlacement
 */
export const resizer = (id, container, minW = 50, minH = 100) => {
    if (container.style.position !== 'relative'
        && container.style.position !== 'absolute'
        && container.style.position !== 'fixed')
        container.style.position = 'relative'

    const s = container.style

    if (container.children.length === 1) {
        const sChild = container.firstElementChild.style
        // sChild.overflow = 'auto'
        // sChild.overflow = 
        sChild.height = '100%'
        sChild.width = '100%'

    }


    const icon = resizerIMG(20, 20)
    icon.style.position = 'absolute'
    icon.style.padding = '10px'
    icon.style.right = '-10px'
    icon.style.bottom = '-10px'
    icon.draggable = false
    container.appendChild(icon)

    icon.ondragstart = (e) => { e.preventDefault() }

    let w = +localStorage.getItem(`${id}W`) || innerWidth / 3
    let h = +localStorage.getItem(`${id}H`) || innerHeight / 3

    const check = () => {
        const { x, y, right, bottom } = container.getBoundingClientRect()
        if (right > innerWidth) w = innerWidth - x
        if (bottom > innerHeight) h = innerHeight - y
        s.width = w + 'px'
        s.height = h + 'px'
    }
    addEventListener('resize', check)

    if (w < minW) w = minW
    if (h < minH) h = minH
    if (!w) w = +s.width.slice(0, -2)
    if (!h) h = +s.height.slice(0, -2)
    s.width = w + 'px'
    s.height = h + 'px'

    const localStorageUpdate = createTimeoutBuffer(() => {
        localStorage.setItem(`${id}W`, w)
        localStorage.setItem(`${id}H`, h)
    }, 1000)

    pointerMove(icon, (e, dx, dy) => {
        w += dx
        h += dy
        if (w < minW) w = minW
        if (h < minH) h = minH

        const { x, y } = container.getBoundingClientRect()
        if (x + w > innerWidth) w = innerWidth - x
        if (y + h > innerHeight) h = innerHeight - y

        s.width = w + 'px'
        s.height = h + 'px'
        localStorageUpdate()
    })
}

// 
// export const closeEventCb = []
// export const defaultCloseCb = new Set()
// export const closeEventTrigger = (e) => {
//     if (e && e.target && e.target.blur) e.target.blur()
//     const poped = INPUT.closeEventCb.pop()
//     if (poped) if (poped() === true) INPUT.closeEventTrigger()
//     else {
//         document.activeElement.blur()
//         cbH(INPUT.defaultCloseCb)
//     }
// }


// History
let tryBack = 0
window.onpopstate = (e) => {
    console.log(e.state)
    if (e.state === 1) {
        if (INPUT.closeEventCb.length === 0 && tryBack === 1) {
            history.go(-2)
        }
        else if (INPUT.closeEventCb.length === 0)
            tryBack = 1
        else
            tryBack = 0

        INPUT.closeEventTrigger(e)
    } else {
        history.go(1)
    }
}