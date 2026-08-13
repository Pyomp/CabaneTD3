


import { createHTMLElement, setStyle } from '../../utils/htmlElement.js'
import { createSeparationBar } from '../../utils/views/separationBar.js'
import { Platform_Image } from './Platform_Image.js'



export class Key_Features {
    constructor(
        parent,
        section_style,
        data = [
            {
                description: 'optimisation_desc',
                image: createHTMLElement('img', { border: 'solid 3px black', borderRadius: '5px', }, undefined, undefined, {
                    src: new URL('./opti.JPG', import.meta.url).href,
                })
            },
            {
                description: 'ultimate_desc',
                image: createHTMLElement('img', { border: 'solid 3px black', borderRadius: '5px', }, undefined, undefined, {
                    src: new URL('./ult.JPG', import.meta.url).href,
                })
            },
            {
                description: 'family_desc',
                image: createHTMLElement('img', { border: 'solid 3px black', borderRadius: '5px', }, undefined, undefined, {
                    src: new URL('./family.jpg', import.meta.url).href,
                })
            },
            {
                description: 'platform_desc',
                image: new Platform_Image().container
            },
        ]
    ) {
        this.container = createHTMLElement('section', {
            ...section_style,
            position: 'relative',
        }, parent)

        createHTMLElement('div', {
            backgroundImage: `url(${new URL('../../Capture.PNG', import.meta.url).href})`,
            width: '5000px',
            height: '100%',
            filter: 'blur(2px) brightness(0.2)',
            position: 'absolute',
            zIndex: '-1',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundClip: 'border-box',
            backgroundPosition: 'center',
        }, this.container)

        createHTMLElement('h1', {
            padding: '20px',
        }, this.container, 'key_features')

        const image_style = {
            width: 'auto',
            height: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
        }

        for (let i = 0; i < data.length; i++) {
            if (i > 0) createSeparationBar(this.container)
            const d = data[i]

            const content = createHTMLElement('div', {
                width: '100%',
                display: 'flex', gap: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }, this.container)

            const description = createHTMLElement('article', {

                width: '500px',
                height: '250px',
                maxWidth: '100%',
                display: 'flex',
                alignItems: 'center',

                // flex: '400px 400px 400px',
            }, undefined, d.description)

            const c_img = createHTMLElement('div', {
                width: '500px',
                height: '250px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                maxWidth: '100%',

            })
            setStyle(d.image, image_style)
            c_img.appendChild(d.image)

            if (i % 2 === 0) {
                content.appendChild(c_img)
                content.appendChild(description)
            } else {
                content.appendChild(description)
                content.appendChild(c_img)
            }
        }
    }
}
