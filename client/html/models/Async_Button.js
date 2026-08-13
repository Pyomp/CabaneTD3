import { createTimeoutRefresh } from '../../../utils/utils.js'
import { createHTMLElement } from '../utils/htmlElement.js'
import { i18nH } from '../utils/i18n.js'
import { nokIMG, okIMG, progressIMG } from '../utils/icons/icons.js'


export class Async_Button {
    /** @param {CSSStyleDeclaration} style */
    constructor(text, style, parent) {
        const ok = okIMG(20, 20)
        const nok = nokIMG(20, 20)
        const progress = progressIMG(20, 20)
        progress.style.animation = `1s linear spin infinite `

        const button = createHTMLElement('button', {
            // display: 'block',
            // position: 'relative',
            marginRight: '30px',
            // height: 'fit-content',
            ...style
        }, parent, text)

        const hint = createHTMLElement('div', {
            display: 'flex', alignItems: 'center',
            position: 'absolute',
            top: '0',
            left: 'calc(100% + 5px)',
            width: '30px',
            height: '100%',
        }, button)

        const error = createHTMLElement('span', {
            fontSize: 'smaller',
            position: 'absolute',
            top: '100%',
            left: '0',
            width: 'calc(100% + 35px)',
            wordBreak: 'break-all',
            textAlign: 'start',
        })

        const close_error_timeout = createTimeoutRefresh(() => {
            error.remove()
            button.style.marginBottom = '0'
        }, 10_000)

        this.container = button
        let timeout
        const clear_hint = () => { hint.innerHTML = '' }
        this.display_ok = () => {
            clearTimeout(timeout)
            clear_hint()
            hint.appendChild(ok)
            timeout = setTimeout(clear_hint, 3000)
        }
        this.display_nok = () => {
            clearTimeout(timeout)
            clear_hint()
            hint.appendChild(nok)
            timeout = setTimeout(clear_hint, 3000)
        }
        this.display_progress = () => {
            clearTimeout(timeout)
            clear_hint()
            hint.appendChild(progress)
        }
        this.remove_hint = clear_hint

        this.error = (str = 'success', color = 'hsl(0, 100%, 60%)') => {
            button.appendChild(error)
            error.style.color = color
            i18nH(error, str)
            const { height } = error.getBoundingClientRect()
            button.style.marginBottom = `${height}px`
            close_error_timeout()
        }
    }
}







