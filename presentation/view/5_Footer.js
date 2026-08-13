import { createHTMLElement } from '../utils/htmlElement.js'


export class Footer {
    constructor(
        parent, section_style,
        data = {
            copyright: 'Pyompy Studio © 2022',
            info_legale_url: '',
            cgu_url: '',
            privacy_policy_url: '',
        }
    ) {
        // this.container = createHTMLElement('footer', section_style, parent)
        this.container = createHTMLElement('footer', {
            ...section_style,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'relative',
        }, parent)

        createHTMLElement('div', {
            backgroundImage: `url(${new URL('../Capture.PNG', import.meta.url).href})`,
            width: '5000px',
            height: '100%',
            filter: 'blur(1px) brightness(0.2)',
            position: 'absolute',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundClip: 'border-box',
            backgroundPosition: 'center',
            zIndex: '-1',
        }, this.container)

        createHTMLElement('p', {}, this.container, data.copyright)

    }
}














