
import { createHTMLElement } from '../utils/htmlElement.js'

export class Head {
    constructor(
        parent,
    ) {
        this.container = createHTMLElement('section', {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative',
        }, parent)

        createHTMLElement('div', {
            backgroundImage: `url(${new URL('../Capture.PNG', import.meta.url).href})`,
            width: '100%',
            height: '100%',
            filter: 'blur(1px) brightness(0.4)',
            position: 'absolute',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundClip: 'border-box',
            backgroundPosition: 'center',
            zIndex: '-1',
        }, this.container)

        createHTMLElement('h1', {
            fontSize: '50px',
        }, this.container, 'Cabane TD')
        const button = createHTMLElement('button', {
            fontSize: '40px',
            backgroundColor: 'hsla(30, 100%, 60%, 0.8)',
            padding: '0px 60px',
        }, this.container, 'play')

        const on_click = () => {
            open(`${location.origin}/game`, "_self")
        }
        button.addEventListener('click', on_click)
    }
}



