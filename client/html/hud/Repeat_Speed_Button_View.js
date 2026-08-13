import { Game_Settings_System } from '../../../common/systems/Game_Settings_System.js'
import { Game_Data } from '../../../common/user_data/models/Game_Data.js'
import { progress_interface_design } from '../../../game_design/progress_design.js'
import { Lv_Progress_View_Effect } from '../models/Lv_Progress_View_Effect.js'
import { createHTMLElement, setStyle } from '../utils/htmlElement.js'
import { repeatIMG, speedIMG } from '../utils/icons/icons.js'

export class Repeat_Speed_Button_View {

    /**
     * 
     * @param {HTMLElement} parent 
     * @param {Game_Data} game_data 
     * @param {Game_Settings_System} game_settings_system 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect 
     */
    constructor(
        parent,
        icon_style,
        game_data,
        game_settings_system,
        lv_progress_view_effect,
    ) {
        const container = createHTMLElement('div', {
            display: 'flex',
        }, parent)

        const speed_button = speedIMG(32, 32)
        container.appendChild(speed_button)
        setStyle(speed_button, icon_style)

        const speed_button_style = speed_button.style
        const update_speed_button = () => {
            if (game_data.speed < 1.1)
                speed_button_style.filter = "hue-rotate(0deg)"
            else if (game_data.speed < 1.6)
                speed_button_style.filter = "hue-rotate(180deg) saturate(5)"
            else if (game_data.speed < 2.1)
                speed_button_style.filter = "hue-rotate(150deg) saturate(10)"
        }
        update_speed_button()
        game_data.on_speed.add(update_speed_button)
        lv_progress_view_effect.add(
            speed_button,
            progress_interface_design.speed,
            () => {
                speed_button.addEventListener('click', game_settings_system.speed_toggle)
            }
        )

        const repeat_button = repeatIMG(32, 32)
        setStyle(repeat_button, icon_style)
        container.appendChild(repeat_button)
        {
            lv_progress_view_effect.add(
                repeat_button,
                progress_interface_design.repeat,
                () => {
                    repeat_button.addEventListener('click', game_settings_system.repeat_toggle)
                }
            )
            const repeat_button_style = repeat_button.style
            const update_repeat_button = () => {
                if (game_data.repeat === 1)
                    repeat_button_style.background = "radial-gradient(hsl(120, 100%, 70%) 49%, rgba(0,0,0,0) 49% )"
                else
                    repeat_button_style.background = "radial-gradient(grey 49%, rgba(0,0,0,0) 49%)"
            }
            update_repeat_button()
            game_data.on_repeat.add(update_repeat_button)
        }
    }
}











