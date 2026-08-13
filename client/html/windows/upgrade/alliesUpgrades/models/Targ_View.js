import { TARGET_MODE_HIGHEST_HP, TARGET_MODE_LOWEST_HP, TARGET_MODE_NEAREST, TARGET_MODE_RANDOM, TARGET_MODE_STRONGEST } from '../../../../../../common/constants.js'
import { Upgrade_System } from '../../../../../../common/systems/Upgrade_System.js'
import { Hero_Data } from '../../../../../../common/user_data/models/Hero_Data.js'
import { equation_design } from '../../../../../../game_design/balance/equation_design.js'
import { heroes_design } from '../../../../../../game_design/entities/heroes_design.js'
import { progress_interface_design } from '../../../../../../game_design/progress_design.js'
import { Lv_Progress_View_Effect } from '../../../../models/Lv_Progress_View_Effect.js'
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

export class Targ_View {
    /**
     * @param {Hero_Data | Student_Data} hero_data 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect
     */
    constructor(
        hero_data,
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

        const base_style = {
            border: 'solid 2px black',
            borderRadius: '5px',
            padding: '5px',
        }
        
        const nearest = createHTMLElement('span', base_style, this.container, 'nearest')
        const strongest = createHTMLElement('span', base_style, this.container, 'strongest')
        const lowest_hp = createHTMLElement('span', base_style, this.container, 'lowest_hp')
        const highest_hp = createHTMLElement('span', base_style, this.container, 'highest_hp')
        const random = createHTMLElement('span', base_style, this.container, 'random')

        const border_dispatcher = [
            () => { nearest.style.borderColor = 'red' },
            () => { strongest.style.borderColor = 'red' },
            () => { lowest_hp.style.borderColor = 'red' },
            () => { highest_hp.style.borderColor = 'red' },
            () => { random.style.borderColor = 'red' },
        ]

        const update_view = () => {
            nearest.style.borderColor = 'black'
            strongest.style.borderColor = 'black'
            lowest_hp.style.borderColor = 'black'
            highest_hp.style.borderColor = 'black'
            random.style.borderColor = 'black'
            border_dispatcher[hero_data.target]()
        }
        update_view()
        hero_data.on_target.add(update_view)

        const init = () => {
            {
                const on_click = () => { hero_data.target = TARGET_MODE_NEAREST }
                nearest.addEventListener('click', on_click)
            } {
                const on_click = () => { hero_data.target = TARGET_MODE_STRONGEST }
                strongest.addEventListener('click', on_click)
            } {
                const on_click = () => { hero_data.target = TARGET_MODE_LOWEST_HP }
                lowest_hp.addEventListener('click', on_click)
            } {
                const on_click = () => { hero_data.target = TARGET_MODE_HIGHEST_HP }
                highest_hp.addEventListener('click', on_click)
            } {
                const on_click = () => { hero_data.target = TARGET_MODE_RANDOM }
                random.addEventListener('click', on_click)
            }
        }
        lv_progress_view_effect.add(
            this.container,
            progress_interface_design.targ,
            init
        )
    }
}







