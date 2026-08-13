


import { createHTMLElement } from '../../utils/htmlElement.js'
import { Avatars_Manager } from './Character_Manager.js'



export class Characters {
    constructor(
        parent,
        section_style,
    ) {
        this.container = createHTMLElement('section', section_style, parent)

        createHTMLElement('h1', {
            padding: '20px',
        }, this.container, 'characters')

        new Avatars_Manager(this.container)

    }
}







