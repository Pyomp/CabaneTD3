








import { createHTMLElement } from '../../../../utils/htmlElement.js' 
import { Manual_Desc } from './Manual_Desc.js'


export class Upgrade_Manual_View {
    constructor() {
        this.container = createHTMLElement('div')

        new Manual_Desc(this.container, 'Add', 'manual_add')
        new Manual_Desc(this.container, 'Mult', 'manual_mult')
        new Manual_Desc(this.container, 'Stuff', 'manual_stuff')
        new Manual_Desc(this.container, 'Evo', 'manual_evo')

        new Manual_Desc(this.container, 'rebirth', 'manual_rebirth')
    }
}
