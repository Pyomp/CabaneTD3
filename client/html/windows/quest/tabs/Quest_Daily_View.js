



import { QUEST_DAILY_DUCKY_GOAL, QUEST_DAILY_MP_GOAL, QUEST_DAILY_REBIRTH_GOAL, QUEST_DAILY_ULT_GOAL, QUEST_DAILY_WAVE_GOAL } from '../../../../../common/constants.js'
import { Quest_System } from '../../../../../common/systems/Quest_System.js'
import { Quest_Data } from '../../../../../common/user_data/models/Quest_Data.js'
import { createHTMLElement } from '../../../utils/htmlElement.js'
import { Quest_Line_View } from "./Quest_Line_View.js"

export class Quest_Daily_View {
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
            quest_data.daily, 'ducky',
            'ducky', 'say_hello_to_ducky',
            'bonus_boutique_spawn_+30_waves', QUEST_DAILY_DUCKY_GOAL,
            quest_system.recolt_ducky,
        )

        new Quest_Line_View(
            this.container,
            quest_data.daily, 'mp',
            'MP', 'use_100_mp',
            'bonus_boutique_loot_+30_waves', QUEST_DAILY_MP_GOAL,
            quest_system.recolt_mp,
        )

        new Quest_Line_View(
            this.container,
            quest_data.daily, 'rebirth',
            'rebirth', 'rebirth_1_time',
            'bonus_boutique_gold_+30_waves', QUEST_DAILY_REBIRTH_GOAL,
            quest_system.recolt_rebirth,
        )

        new Quest_Line_View(
            this.container,
            quest_data.daily, 'ult',
            'ult', 'perform_2_ultimates',
            'bonus_boutique_speed_+30_waves', QUEST_DAILY_ULT_GOAL,
            quest_system.recolt_ult,
        )

        new Quest_Line_View(
            this.container,
            quest_data.daily, 'wave',
            'wave', 'win_10_waves',
            'bonus_boutique_damage_+30_waves', QUEST_DAILY_WAVE_GOAL,
            quest_system.recolt_daily_wave,
        )

    }
}

























