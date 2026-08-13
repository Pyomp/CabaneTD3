import { Upgrade_System } from '../../../../../../common/systems/Upgrade_System.js' 
import { equation_design } from '../../../../../../game_design/balance/equation_design.js'
import { hold_click_event } from '../../../../utils/hold_click_event.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { rubyIMG } from '../../../../utils/icons/icons.js'
import { pretty_print_number } from '../../../../utils/pretty_print_number.js'



const button_style = {
    color: 'red',
    backgroundColor: 'hsl(0, 0%, 20%)',
    width: 'fit-content',
    height: '90%'
}
const icon_size = 16

const line_style = {
    gap: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30%',
}

const sep_style = {
    width: '80%',
    margin: '0 auto',
    height: '1px',
    background: 'black',
}

export class Mult_View {
    /**
    * @param {String} hero_name  
    * @param {Hero_Data | Student_Data} hero_data 
    * @param {Upgrade_System} upgrade_system 
    */
    constructor(
        hero_name,
        hero_data,
        upgrade_system,
    ) {
        this.container = createHTMLElement('div', {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
        })

        { // line power
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', {}, container, 'power')

            const span = createHTMLElement('span', {}, container)

            let cost_number = 0

            const button = createHTMLElement('button', button_style, container)
            hold_click_event(button, () => {
                upgrade_system.add_power_mult(hero_name)
            })
            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                span.innerHTML = hero_data.power_mult
                cost_number = equation_design.power_mult_cost(hero_data.power_mult)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            hero_data.on_power_mult.add(update_view)
            button.appendChild(rubyIMG(icon_size, icon_size))
        }
        createHTMLElement('div', sep_style, this.container)
        { // line cc
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', {}, container, 'cc')

            const span = createHTMLElement('span', {}, container)

            let cost_number = 0

            const button = createHTMLElement('button', button_style, container)
            hold_click_event(button, () => {
                upgrade_system.add_cc_mult(hero_name)
            })
            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                span.innerHTML = hero_data.cc_mult
                cost_number = equation_design.cc_mult_cost(hero_data.cc_mult)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            hero_data.on_cc_mult.add(update_view)
            button.appendChild(rubyIMG(icon_size, icon_size))
        }
        createHTMLElement('div', sep_style, this.container)
        { // line dcc
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', {}, container, 'dcc')

            const span = createHTMLElement('span', {}, container)

            let cost_number = 0

            const button = createHTMLElement('button', button_style, container)
            hold_click_event(button, () => {
                upgrade_system.add_dcc_mult(hero_name)
            })
            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                span.innerHTML = hero_data.dcc_mult
                cost_number = equation_design.dcc_mult_cost(hero_data.dcc_mult)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            hero_data.on_dcc_mult.add(update_view)
            button.appendChild(rubyIMG(icon_size, icon_size))
        }
    }
}
