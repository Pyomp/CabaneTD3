import { Upgrade_System } from '../../../../../../common/systems/Upgrade_System.js' 
import { equation_design } from '../../../../../../game_design/balance/equation_design.js'
import { heroes_design } from '../../../../../../game_design/entities/heroes_design.js'
import { progress_interface_design } from '../../../../../../game_design/progress_design.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { diamondIMG } from '../../../../utils/icons/icons.js'
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

export class Evo_View {
    /**
     * 
     * @param {String} hero_name 
     * @param {Hero_Data | Student_Data} hero_data 
     * @param {Upgrade_System} upgrade_system 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect
     */
    constructor(
        hero_name,
        hero_data,
        upgrade_system,
        lv_progress_view_effect,
    ) {
        this.container = createHTMLElement('div', {
            display: "grid",
            grid: "33.33% 33.33% 33.33% / 50% 50%",
            width: '100%',
            height: '100%',
            justifyItems: 'center',
            alignItems: 'center',
        })
        const evolutions = heroes_design[hero_name].evolutions
        const evo1 = createHTMLElement('span', {}, this.container, evolutions[0].str)
        const evo2 = createHTMLElement('span', {}, this.container, evolutions[1].str)
        const evo3 = createHTMLElement('span', {}, this.container, evolutions[2].str)
        const evo4 = createHTMLElement('span', {}, this.container, evolutions[3].str)
        const evo5 = createHTMLElement('span', {}, this.container, evolutions[4].str)

        let cost_number = 0

        const button = createHTMLElement('button', { height: '90%' }, this.container)
        const cost = createHTMLElement('span', { marginRight: '5px' }, button)
        button.appendChild(diamondIMG(icon_size, icon_size))
        const update_evo = () => {
            const evo = hero_data.evo
            cost_number = equation_design.evolution_cost(hero_data.evo)
            cost.innerHTML = pretty_print_number(cost_number)
            evo1.style.color = (evo > 0) ? 'hsl(120, 100%, 60%)' : 'grey'
            evo2.style.color = (evo > 1) ? 'hsl(180, 100%, 60%)' : 'grey'
            evo3.style.color = (evo > 2) ? 'hsl(300, 100%, 60%)' : 'grey'
            evo4.style.color = (evo > 3) ? 'hsl(60, 100%, 60%)' : 'grey'
            evo5.style.color = (evo > 4) ? 'hsl(0, 100%, 60%)' : 'grey'
        }
        update_evo()
        hero_data.on_evo.add(update_evo)

        const init = () => {
            button.addEventListener('click', () => {
                upgrade_system.add_evo(hero_name)
            })
        }
        lv_progress_view_effect.add(
            this.container,
            progress_interface_design.evo,
            init
        )
    }
}







