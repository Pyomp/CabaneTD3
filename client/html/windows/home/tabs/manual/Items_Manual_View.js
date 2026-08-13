








import { ITEM_LENGTH } from '../../../../../../game_design/items/item_design_constants.js'
import { item_design_view } from '../../../../../../game_design/items/item_design_view.js'
import { create_svg_element } from '../../../../../../utils/clientUtils.js'

import { createHTMLElement } from '../../../../utils/htmlElement.js' 
import { Manual_Desc } from './Manual_Desc.js'


export class Items_Manual_View {
    constructor() {
        this.container = createHTMLElement('div')

        for (let i = 1; i < ITEM_LENGTH; i++) {
            const design = item_design_view[i]
            const svg_element = create_svg_element(design.svg, 50, 50)
            svg_element.style.backgroundImage = 'radial-gradient(#f44, #fff0 70% )'
            const img_url = "data:image/svg+xml;base64," + btoa(svg_element.outerHTML)
            new Manual_Desc(
                this.container,
                design.name,
                design.desc,
                img_url,
                50
            )
        }
    }
}

