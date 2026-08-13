
import { createHTMLElement } from '../../utils/htmlElement.js' 

export class Stats_Line_View {
    constructor(img_url) {
        this.container = createHTMLElement('div', {
            display: 'flex', alignItems: 'center',
        })
        createHTMLElement('img', {
            height: '50px',
            width: '50px',
        }, this.container, undefined, {
            src: img_url
        })
        this.damage = createHTMLElement('span', {
            textAlign: 'center',
            margin: 'auto',
            width: '130px',
        }, this.container)
        this.percent = createHTMLElement('span', {
            width: '70px',
            marginLeft: 'auto 0 auto auto',
        }, this.container)
    }
}









