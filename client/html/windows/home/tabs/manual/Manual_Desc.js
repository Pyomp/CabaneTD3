




import { createHTMLElement } from '../../../../utils/htmlElement.js' 
import { createSeparationBar } from '../../../../utils/views/separationBar.js' 

const DEFAULT_IMAGE_SIZE = 70
export class Manual_Desc {
    /**
     * @param {Element} parent 
     * @param {String} title 
     * @param {String} desc 
     * @param {Element} img 
     */
    constructor(parent, title, desc, img_url, img_size = DEFAULT_IMAGE_SIZE) {

        if (parent.firstElementChild)
            createSeparationBar(parent)

        createHTMLElement('div', {
            margin: '5px 0',
            textAlign: 'center',
            fontSize: 'larger'
        }, parent, title)
        if (img_url !== undefined) {
            createHTMLElement('img', {
                float: 'left',
                width: `${img_size}px`,
                height: `${img_size}px`,
                shapeOutside: `url('${img_url}')`,
                shapeImageThreshold: '0.5',
                shapeMargin: '10px',
                padding: '10px'
            }, parent, undefined, {
                src: img_url
            })
        }
        createHTMLElement('div', {
            marginLeft: '10px',
            lineHeight: '1.5',
            minHeight: `${img_url !== undefined ? 20 + img_size : 0}px`,
        }, parent, desc)
    }
}