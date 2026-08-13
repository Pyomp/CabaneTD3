






import { Upgrade_System } from '../../../../../common/systems/Upgrade_System.js'
import { Game_Data } from '../../../../../common/user_data/models/Game_Data.js'
import { Wallet_Data } from '../../../../../common/user_data/models/Wallet_Data.js'
import { equation_design } from '../../../../../game_design/balance/equation_design.js'
import { hold_click_event } from '../../../utils/hold_click_event.js'
import { createHTMLElement } from '../../../utils/htmlElement.js'
import { goldIMG } from '../../../utils/icons/icons.js'
import { pretty_print_number } from '../../../utils/pretty_print_number.js'
import { create_separation_bar_no_marge } from '../../../utils/views/separationBar.js'


export class Cabane_Upgrade_View {

    /**
     * 
     * @param {Game_Data} game_data 
     * @param {Wallet_Data} wallet_data 
     * @param {Upgrade_System} upgrade_system 
     */
    constructor(
        game_data,
        wallet_data,
        upgrade_system,
    ) {
        this.container = createHTMLElement('div', {
            padding: '0 0 0 5px',
            width: '350px',
        })

        const button_style = {
            color: 'yellow',
            backgroundColor: 'hsl(0, 0%, 20%)',
            '--padding-button': '3px 5px',
            padding: '5px',
            marginLeft: 'auto',
        }
        const icon_size = 16

        const title_style = {
            width: '130px'
        }

        const cost_span_style = {
            width: '120px',
            textAlign: 'center',
        }

        const line_style = {
            gap: '1px',
            display: 'flex',
            alignItems: 'center',
            height: '30%',
        }

        { // line hp
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', title_style, container, 'hp') // title

            const cost_span = createHTMLElement('span', cost_span_style, container)

            let cost_number = 0

            const button = createHTMLElement('button', button_style, container)

            hold_click_event(button, upgrade_system.add_hp)

            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                cost_span.innerHTML = game_data.max_hp
                cost_number = equation_design.hp_cost(game_data.max_hp)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            game_data.on_max_hp.add(update_view)
            button.appendChild(goldIMG(icon_size, icon_size))
        }
        create_separation_bar_no_marge(this.container)
        { // line mp
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', title_style, container, 'mp') // title

            const cost_span = createHTMLElement('span', cost_span_style, container)

            let cost_number = 0
            const button = createHTMLElement('button', button_style, container)

            hold_click_event(button, upgrade_system.add_mp)

            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                cost_span.innerHTML = game_data.max_mp
                cost_number = equation_design.mp_cost(game_data.max_mp)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            game_data.on_max_mp.add(update_view)
            button.appendChild(goldIMG(icon_size, icon_size))
        }
        // create_separation_bar_no_marge(this.container)
        // { // line hp_regen
        //     const container = createHTMLElement('div', line_style, this.container)
        //     createHTMLElement('span', title_style, container, 'hp_regen') // title

        //     const cost_span = createHTMLElement('span', cost_span_style, container)

        //     let cost_number = 0
        //     const button = createHTMLElement('button', button_style, container)

        //     hold_click_event(button, upgrade_system.add_hp_regen)

        //     const cost = createHTMLElement('span', { marginRight: '5px' }, button)
        //     const update_view = () => {
        //         cost_span.innerHTML = game_data.hp_regen
        //         cost_number = equation_design.hp_regen_cost(game_data.hp_regen)
        //         cost.innerHTML = pretty_print_number(cost_number)
        //     }
        //     update_view()
        //     game_data.on_hp_regen.add(update_view)
        //     button.appendChild(goldIMG(icon_size, icon_size))
        // }
        // create_separation_bar_no_marge(this.container)
        // { // line mp_regen
        //     const container = createHTMLElement('div', line_style, this.container)
        //     createHTMLElement('span', title_style, container, 'mp_regen') // title

        //     const cost_span = createHTMLElement('span', cost_span_style, container)

        //     let cost_number = 0
        //     const button = createHTMLElement('button', button_style, container)

        //     hold_click_event(button, upgrade_system.add_mp_regen)

        //     const cost = createHTMLElement('span', { marginRight: '5px' }, button)
        //     const update_view = () => {
        //         cost_span.innerHTML = game_data.mp_regen
        //         cost_number = equation_design.mp_regen_cost(game_data.mp_regen)
        //         cost.innerHTML = pretty_print_number(cost_number)
        //     }
        //     update_view()
        //     game_data.on_mp_regen.add(update_view)
        //     button.appendChild(goldIMG(icon_size, icon_size))
        // }
    }
}









