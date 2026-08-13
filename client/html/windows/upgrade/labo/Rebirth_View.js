

import { equation_design } from '../../../../../game_design/balance/equation_design.js'
import { progress_interface_design, PROGRESS_INTERFACE_REBIRTH } from '../../../../../game_design/progress_design.js'
import { Lv_Progress_View_Effect } from '../../../models/Lv_Progress_View_Effect.js'
import { Game_Data } from '../../../../../common/user_data/models/Game_Data.js'
import { Evo_Bonus_Manager } from '../../../../../common/systems/Evo_Bonus_Managers.js'
import { createHTMLElement } from '../../../utils/htmlElement.js'
import { pretty_print_number } from '../../../utils/pretty_print_number.js'
import { Rebirth_System } from '../../../../../common/systems/Rebirth_System.js' 
import { REBIRTH_MIN_WAVE } from '../../../../../common/constants.js'

export class Rebirth_View {

    /**
     * @param {Game_Data} game_data 
     * @param {Evo_Bonus_Manager} evo_bonus_manager  
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect
     * @param {Rebirth_System} rebirth_system
     */
    constructor(
        game_data,
        evo_bonus_manager,
        lv_progress_view_effect,
        rebirth_system,
    ) {
        this.container = createHTMLElement('div', {
            padding: '5px',
        })

        const rebirth_button = createHTMLElement('button', {
            '--padding-button': '5px',
            margin: 'auto',
            padding: '5px 10px',
        }, this.container, 'rebirth')

        const update_button = () => {
            if (game_data.wave < REBIRTH_MIN_WAVE) {
                if (rebirth_button.disabled !== true) {
                    rebirth_button.disabled = true
                    rebirth_button.style.backgroundColor = 'grey'
                }
            } else {
                if (rebirth_button.disabled !== false) {
                    rebirth_button.disabled = false
                    rebirth_button.style.backgroundColor = 'hsl(0, 70%, 70%)'
                }
            }
        }
        update_button()
        game_data.on_wave.add(update_button)

        lv_progress_view_effect.add(
            this.container,
            progress_interface_design.rebirth,
            () => {
                rebirth_button.addEventListener('click', rebirth_system.rebirth)
            })
        {
            const container = createHTMLElement('div', {
                display: 'flex',
                justifyContent: 'space-between',
            }, this.container)
            createHTMLElement('span', {}, container, 'current_vague')
            const value = createHTMLElement('span', {
                textAlign: 'center',
                width: '100px',
            }, container)
            const update_value = () => {
                value.innerHTML = pretty_print_number(game_data.wave)
            }
            update_value()
            game_data.on_wave.add(update_value)
        }

        {
            const container = createHTMLElement('div', {
                display: 'flex',
                justifyContent: 'space-between',
                margin: '5px 0'
            }, this.container)
            createHTMLElement('span', {}, container, 'multiplicator_bonus')
            const value = createHTMLElement('span', {
                textAlign: 'center',
                width: '100px',
            }, container)
            const update_value = () => {
                value.innerHTML = pretty_print_number(evo_bonus_manager.ruby)
            }
            update_value()
            evo_bonus_manager.on_ruby.add(update_value)
        }

        {
            createHTMLElement('div', {
                margin: 'auto',
                width: 'fit-content',
            }, this.container, 'ruby_after_rebirth')
            const value = createHTMLElement('div', {
                textAlign: 'center',
                margin: 'auto',
                width: 'fit-content',
            }, this.container)
            const update_value = () => {
                value.innerHTML = pretty_print_number(equation_design.ruby_revive(evo_bonus_manager.ruby, game_data.wave))
            }
            update_value()
            evo_bonus_manager.on_ruby.add(update_value)
            game_data.on_wave.add(update_value)
        }
    }
}


