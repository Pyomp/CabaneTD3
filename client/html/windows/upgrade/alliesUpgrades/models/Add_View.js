


import { Upgrade_System } from '../../../../../../common/systems/Upgrade_System.js' 
import { Hero_Data } from '../../../../../../common/user_data/models/Hero_Data.js'
import { Student_Data } from '../../../../../../common/user_data/models/Student_Data.js'
import { equation_design } from '../../../../../../game_design/balance/equation_design.js'
import { hold_click_event } from '../../../../utils/hold_click_event.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { goldIMG } from '../../../../utils/icons/icons.js'
import { pretty_print_number } from '../../../../utils/pretty_print_number.js'

const button_style = {
    color: 'yellow',
    backgroundColor: 'hsl(0, 0%, 20%)',
    width: 'fit-content',
    height: '95%',
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

export class Add_View {
    /**
     * @param {String} hero_name 
     * @param {Hero_Data | Student_Data} hero_data 
     * @param {Upgrade_System} upgrade_system 
     */
    constructor(
        hero_name,
        hero_data,
        upgrade_system
    ) {
        const inits = []
        this.init = () => {
            for (const f of inits) f()
            inits.length = 0
        }

        this.container = createHTMLElement('div', {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
        })

        { // line power
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', {}, container, 'power') // title

            const span = createHTMLElement('span', {}, container)

            let cost_number = 0
            const button = createHTMLElement('button', button_style, container)
            inits.push(() => {
                hold_click_event(button, () => {
                    upgrade_system.add_power_add(hero_name)
                })
            })

            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                span.innerHTML = hero_data.power_add
                cost_number = equation_design.power_add_cost(hero_data.power_add)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            hero_data.on_power_add.add(update_view)
            button.appendChild(goldIMG(icon_size, icon_size))
        }
        createHTMLElement('div', sep_style, this.container)
        { // line cc
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', {}, container, 'cc')

            const span = createHTMLElement('span', {}, container)

            let cost_number = 0

            const button = createHTMLElement('button', button_style, container)
            inits.push(() => {
                hold_click_event(button, () => {
                    upgrade_system.add_cc_add(hero_name)
                })
            })
            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                span.innerHTML = hero_data.cc_add
                cost_number = equation_design.cc_add_cost(hero_data.cc_add)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            hero_data.on_cc_add.add(update_view)
            button.appendChild(goldIMG(icon_size, icon_size))
        }
        createHTMLElement('div', sep_style, this.container)
        { // line dcc
            const container = createHTMLElement('div', line_style, this.container)
            createHTMLElement('span', {}, container, 'dcc')

            const span = createHTMLElement('span', {}, container)

            let cost_number = 0

            const button = createHTMLElement('button', button_style, container)
            inits.push(() => {
                hold_click_event(button, () => {
                    upgrade_system.add_dcc_add(hero_name)
                })
            })
            const cost = createHTMLElement('span', { marginRight: '5px' }, button)
            const update_view = () => {
                span.innerHTML = hero_data.dcc_add
                cost_number = equation_design.dcc_add_cost(hero_data.dcc_add)
                cost.innerHTML = pretty_print_number(cost_number)
            }
            update_view()
            hero_data.on_dcc_add.add(update_view)
            button.appendChild(goldIMG(icon_size, icon_size))
        }
    }
}
