



import { QUEST_WEEKLY_WAVE_GOAL } from '../../../../../common/constants.js'
import { Quest_System } from '../../../../../common/systems/Quest_System.js'
import { Quest_Data } from '../../../../../common/user_data/models/Quest_Data.js'
import { createHTMLElement } from '../../../utils/htmlElement.js' 
import { Quest_Line_View } from "./Quest_Line_View.js"

export class Quest_Weekly_View {
    /**
     * @param {Quest_Data} quest_data 
     */
    constructor(
        quest_data,
        /** @type {Quest_System} */ quest_system,
    ) {
        this.container = createHTMLElement('div', {})

        new Quest_Line_View(
            this.container,
            quest_data.weekly, 'wave',
            'wave', 'win_10_000_waves',
            'bonus_boutique_speed_+300_waves', QUEST_WEEKLY_WAVE_GOAL,
            quest_system.recolt_weekly_wave,
        )

    }
}




























