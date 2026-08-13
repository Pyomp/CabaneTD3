



import { Quest_System } from '../../../../common/systems/Quest_System.js'
import { Quest_Data } from '../../../../common/user_data/models/Quest_Data.js'
import { LOCALSTORAGE_WINDOW_QUEST } from '../../../../constants/localStorage.js'
import { quests_design } from '../../../../game_design/quests_design.js'
import { createHTMLElement, setStyle } from '../../utils/htmlElement.js'
import { questIMG } from '../../utils/icons/icons.js'
import { DefaultHTMLWindow } from '../../utils/views/DefaultWindow.js'
import { Quest_Daily_View } from "./tabs/Quest_Daily_View.js"
import { Quest_Weekly_View } from './tabs/Quest_Weekly_View.js'

export class Quest_View {

    /**
     * 
     * @param {Quest_Data} quest_data 
     * @param {Quest_System} quest_system 
     */
    constructor(
        quest_data,
        quest_system,
    ) {
        const quest_daily_view = new Quest_Daily_View(quest_data, quest_system)
        const quest_weekly_view = new Quest_Weekly_View(quest_data, quest_system)

        this.icon = createHTMLElement('div', {
            position: 'relative',
        })
        {
            const icon = questIMG(32, 32)
            setStyle(icon, { width: '100%', height: '100%' })
            this.icon.appendChild(icon)
        }

        const red_dot = createHTMLElement('div', {
            position: 'absolute',
            bottom: '0',
            right: '0',
            margin: '4px',
            width: '12px',
            height: '12px',
            borderRadius: '6px',
            background: 'hsl(0, 100%, 60%)',
        })
        const quest_watcher = () => {
            if (
                quest_data.daily.ducky === quests_design.daily.ducky.goal
                || quest_data.daily.mp === quests_design.daily.mp.goal
                || quest_data.daily.rebirth === quests_design.daily.rebirth.goal
                || quest_data.daily.ult === quests_design.daily.ult.goal
                || quest_data.daily.wave === quests_design.daily.wave.goal
                || quest_data.weekly.wave === quests_design.weekly.wave.goal
            ) this.icon.appendChild(red_dot)
            else red_dot.remove()
        }
        quest_watcher()
        quest_data.daily.on_ducky.add(quest_watcher)
        quest_data.daily.on_mp.add(quest_watcher)
        quest_data.daily.on_rebirth.add(quest_watcher)
        quest_data.daily.on_ult.add(quest_watcher)
        quest_data.daily.on_wave.add(quest_watcher)
        quest_data.weekly.on_wave.add(quest_watcher)
        //

        const w = new DefaultHTMLWindow(LOCALSTORAGE_WINDOW_QUEST)
        w.addTab('daily', quest_daily_view.container)
        w.addTab('weekly', quest_weekly_view.container)

        this.icon.addEventListener('click', w.toggle)
    }
}










