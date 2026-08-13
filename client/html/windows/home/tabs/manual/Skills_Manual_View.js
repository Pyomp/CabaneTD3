






import { SKILL_LENGTH } from '../../../../../../game_design/skills/skills_design_data.js'
import { skills_design_view } from '../../../../../../game_design/skills/skills_design_view.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js' 
import { Manual_Desc } from './Manual_Desc.js'

export class Skills_Manual_View {
    constructor(skill_image) {
        this.container = createHTMLElement('div')

        for (let i = 0; i < SKILL_LENGTH; i++) {
            const design = skills_design_view[i]
            new Manual_Desc(
                this.container,
                design.name,
                design.desc,
                skill_image[design.name],
                50
            )
        }
    }
}