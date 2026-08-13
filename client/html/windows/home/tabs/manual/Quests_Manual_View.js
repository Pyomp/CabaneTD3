






import { quests_design } from '../../../../../../game_design/quests_design.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { Manual_Desc } from './Manual_Desc.js'

export class Quests_Manual_View {
    constructor() {
        this.container = createHTMLElement('div')

        new Manual_Desc(this.container, 'daily', 'manual_daily')
        new Manual_Desc(this.container, 'weekly', 'manual_weekly')

        for (const key in quests_design.daily) {
            const design = quests_design.daily[key]
            new Manual_Desc(this.container, design.title, [design.desc, design.reward])
        }

        for (const key in quests_design.weekly) {
            const design = quests_design.weekly[key]
            new Manual_Desc(this.container, design.title, [design.desc, design.reward])
        }
    }
}
