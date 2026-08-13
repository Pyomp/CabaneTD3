import { strH } from '../management/i18n.js'
import { OpacityAnimation } from './outils/animations/opacityAnimation.js'
import { createHTMLElement } from './outils/htmlElement.js'

const container = createHTMLElement('div', {
    position: 'fixed',
    bottom: '80%',
    left: '50%',
    maxWidth: '300px',
    zIndex: '888',
    transform: 'translateX(-50%)',
    wordBreak: 'break-all',
    pointerEvents: 'none',
}, document.body)

const spans = []
const displays = []
const closes = []

for (let i = 0; i < 5; i++) {
    const span = createHTMLElement('div', {
        color: 'hsl(10, 100%, 60%)',
        fontWeight: '900',
        fontSize: 'larger',
        // background: 'rgba(0,0,0,.5)',
        // borderRadius: '5px',
        // WebkitTextStroke: '1px black',
        textShadow: `
        -1px -1px 2px #000,
         0   -1px 2px #000,
         1px -1px 2px #000,
         1px  0   2px #000,
         1px  1px 2px #000,
         0    1px 2px #000,
        -1px  1px 2px #000,
        -1px  0   2px #000`
    })
    spans.push(span)
    const { display, close } = OpacityAnimation(span, container, 2)
    displays.push(display)
    closes.push(close)
}


const timeouts = []
let i = 4
export const display_info = (info_str) => {
    i = (i + 1) % 5
    const span = spans[i]
    container.appendChild(span)
    strH(span, info_str)

    clearTimeout(timeouts[i])
    displays[i]()    
    timeouts[i] = setTimeout(closes[i], 5_000)
}













