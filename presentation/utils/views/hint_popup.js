import { createHTMLElement, setStyle } from '../htmlElement.js'
import { i18nH } from '../i18n.js' 
import { STYLE } from '../style/Style.js' 
import { OpacityAnimation } from '../animations/opacityAnimation.js'

const container = createHTMLElement('div', {
    position: 'fixed',
    backdropFilter: 'blur(2px)',
    background: STYLE.var.colorBackgroundPopup,
    borderRadius: '5px',
    padding: '5px',
    zIndex: '15',
    width: 'fit-content',
    maxWidth: '200px',
    pointerEvents: 'none',
}, undefined)
const { display, close } = OpacityAnimation(container, document.body)
const s = container.style

/**
 * 
 * @param {HTMLElement} htmlElement 
 * @param {string | Function} text 
 */
export const hint_popup = (htmlElement, hint = container) => {
    const is_string = typeof hint === 'string'

    let interval
    const on_close = () => {
        clearInterval(interval)
        close()
    }

    const on_enter = (e) => {
        container.innerHTML = ''
        if (is_string) i18nH(container, hint)
        else container.appendChild(hint)

        display()

        // const x = e.clientX
        // const y = e.clientY
        const { top, right, bottom, left } = htmlElement.getBoundingClientRect()
        const { height, width } = container.getBoundingClientRect()

        if (top > height) s.top = `${top - height}px`
        else s.top = `${bottom}px`

        // s.top = `${(height < y ? 0 : height)}px`
        const middle_x = (right + left - width) / 2
        if (middle_x < 0) {
            s.left = '0'
        } else {
            if ((middle_x + width) > innerWidth) s.left = `${innerWidth - width}px`
            else s.left = `${middle_x}px`
        }
        clearInterval(interval)
        interval = setInterval(() => { if (!htmlElement.offsetParent) on_close() }, 500)
    }
    htmlElement.addEventListener('pointerenter', on_enter)
    htmlElement.addEventListener('pointerleave', on_close)
    htmlElement.addEventListener('pointercancel', on_close)

    return () => {
        htmlElement.removeEventListener('pointerenter', on_enter)
        htmlElement.removeEventListener('pointerleave', on_close)
        htmlElement.removeEventListener('pointercancel', on_close)
        on_close()
    }
}