





import { bonus_design } from '../../../../../../game_design/bonus/bonus_design_data.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { Manual_Desc } from './Manual_Desc.js'

export class Bonus_Manual_View {
    constructor(parent) {
        this.container = createHTMLElement('div', {}, parent)

        for (const key in bonus_design) {
            new Manual_Desc(this.container, `bonus_${key}`, `bonus_${key}_desc`)
        }
    }
}



