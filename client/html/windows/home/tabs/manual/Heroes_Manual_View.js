







import { heroes_design } from '../../../../../../game_design/entities/heroes_design.js'
import { Heroes_Image } from '../../../../../ressources/heroes_image/Heroes_Image.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { Manual_Desc } from './Manual_Desc.js'


export class Heroes_Manual_View {
    constructor(
      /** @type {Heroes_Image} */  heroes_images
    ) {
        this.container = createHTMLElement('div', {})

        for (const name in heroes_design) {
            new Manual_Desc(this.container,
                name,
                `manual_hero_${name}_desc`,
                heroes_images[name])
        }
    }
}