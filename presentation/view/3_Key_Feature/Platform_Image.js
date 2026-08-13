import { createHTMLElement } from '../../utils/htmlElement.js'






export class Platform_Image {
    constructor(
        parent
    ) {
        this.container = createHTMLElement('div', {
            height: '100%',
            overflow: 'hidden',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: '20px',
        }, parent)

        const phone = createHTMLElement('img', {
            height: '250px',
            borderRadius: '10px'
        }, this.container, undefined, {
            src: new URL('./smartphone.svg', import.meta.url).href,
            // width: 256
        })

        const pc = createHTMLElement('img', {
            height: '250px',
            borderRadius: '5px'
        }, this.container, undefined, {
            src: new URL('./pc.svg', import.meta.url).href,
            // width: 256
        })


    }
}










