














import { Bonus_System } from '../../../../common/systems/Bonus_System.js'
import { Bonus_Data } from '../../../../common/user_data/models/Bonus_Data.js'
import { createHTMLElement } from '../../utils/htmlElement.js'
import { diamondIMG } from '../../utils/icons/icons.js'

export class Bonus_View {

    /**
     * @param {Bonus_Data} bonus_data 
     * @param {Bonus_System} bonus_system 
     */
    constructor(
        bonus_data,
        bonus_system,
    ) {
        this.container = createHTMLElement('div')
        for (const key of bonus_data.keys()) {
            new Line(this.container, bonus_data, key, bonus_system[key])
        }
    }
}

class Line {
    constructor(
        parent,
        obj,
        prop,
        cb,
    ) {
        const container = createHTMLElement('div', {
            display: 'flex', alignItems: 'center',
            padding: '0 5px', gap: '5px',
        }, parent)
        createHTMLElement('span', {
            marginRight: 'auto'
        }, container, `bonus_${prop}`)

        //
        const end_time_container = createHTMLElement('div', {
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
        }, container)
        createHTMLElement('span', {}, end_time_container, 'remaining_waves')
        const end_time = createHTMLElement('span', {}, end_time_container)

        const end_time_update = () => {
            end_time.innerHTML = obj[prop].toFixed(0)
        }
        end_time_update()
        obj[`on_${prop}`].add(end_time_update)

        //
        const inner_button = createHTMLElement('div', {
            display: 'flex', alignItems: 'center',
            gap: '5px',
        })
        inner_button.innerHTML = '1'
        inner_button.appendChild(diamondIMG(16, 16))

        const button = createHTMLElement('button', {
            padding: '5px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            '--padding-button': '5px',
        }, container, inner_button)

        button.addEventListener('click', cb)
    }
}




