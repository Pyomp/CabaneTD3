





const TIME_BEFORE_DRAG = 800
const FREE_SCROLL_DIST = 15

const element_droppable = []
const element_droppable_cb = []
export const add_drop_event = (element, cb) => {
    element_droppable.push(element)
    element_droppable_cb.push(cb)
}


/**
 * 
 * @param {Element} element 
 */
const drag_element = document.createElement('div')
const s = drag_element.style
s.position = 'fixed'
s.opacity = '0.8'
s.transition = 'transform .4s'
s.transitionTimingFunction = 'cubic-bezier(.23,1.25,.48,1.4)'
s.transform = 'scale(1)'
s.zIndex = '889'

/**
 * 
 * @param {Element} element 
 * @param {{}} dataTransfer 
 */
export const add_drag_event = (element, dataTransfer, check, on_click) => {
    let timeout
    let lastX, lastY
    let delta_element_x, delta_element_y

    let parent_element_scrollable

    const on_drag_move = (e) => {
        s.left = `${e.clientX + delta_element_x}px`
        s.top = `${e.clientY + delta_element_y}px`
    }

    const drag = () => {
        document.body.appendChild(drag_element)
        const { x, y } = element.getBoundingClientRect()
        delta_element_x = x - lastX
        delta_element_y = y - lastY
        s.left = `${lastX + delta_element_x}px`
        s.top = `${lastY + delta_element_y}px`
        drag_element.innerHTML = ''
        s.transform = 'scale(1.2)'
        drag_element.appendChild(element.cloneNode(true))

        element.onpointermove = on_drag_move
    }

    let dist_x = 0
    let dist_y = 0
    let is_scroll_free = false
    const scroll = (e) => {
        const delta_x = e.clientX - lastX
        const delta_y = e.clientY - lastY
        lastX = e.clientX
        lastY = e.clientY
        if (is_scroll_free === false) {
            dist_x += delta_x
            dist_y += delta_y
            if (Math.abs(dist_x) > FREE_SCROLL_DIST
                || Math.abs(dist_y) > FREE_SCROLL_DIST) {
                clearTimeout(timeout)
                is_scroll_free = true
            }
        }
        if (parent_element_scrollable !== undefined)
            parent_element_scrollable.scrollTop -= delta_y
    }

    element.addEventListener('touchstart', (e) => {
        e.preventDefault()
    })

    element.addEventListener('pointerdown', (e) => {
        e.stopPropagation()
        element.setPointerCapture(e.pointerId)
        lastX = e.clientX
        lastY = e.clientY
        clearTimeout(timeout)
        dist_x = 0
        dist_y = 0
        is_scroll_free = false

        timeout = setTimeout(() => {
            if (check() === true) {
                drag()
            }
        }, TIME_BEFORE_DRAG)

        element.onpointermove = scroll
        {
            let parent = element.parentElement
            while (parent !== null && parent_element_scrollable === undefined) {
                const s = parent.style
                if (
                    (s.overflow !== '' && s.overflow !== 'hidden')
                    || (s.overflowX !== '' && s.overflowX !== 'hidden')
                    || (s.overflowY !== '' && s.overflowY !== 'hidden')
                ) {
                    parent_element_scrollable = parent
                }
                parent = parent.parentElement
            }
        }
    })

    element.addEventListener('lostpointercapture', (e) => {
        element.onpointermove = null
        clearTimeout(timeout)
        if (drag_element.parentElement !== null) {
            const x = e.clientX
            const y = e.clientY
            for (let i = 0; i < element_droppable.length; i++) {
                const ele = element_droppable[i]
                const { top, right, bottom, left } = ele.getBoundingClientRect()
                if (x < right && x > left && y > top && y < bottom) {
                    element_droppable_cb[i](dataTransfer)
                    break
                }
            }
            s.transform = 'scale(1)'
            drag_element.remove()
        } else if (dist_x < FREE_SCROLL_DIST && dist_y < FREE_SCROLL_DIST) {
            if (on_click !== undefined) on_click()
        }
    })
}




