import { Game_State } from '../../../common/State.js'
import { Wave_System } from '../../../common/systems/Wave_System.js'
import { setStyle } from '../utils/htmlElement.js'
import { nextWaveIMG } from '../utils/icons/icons.js'








export class Wave_Button {
    /**
     * 
     * @param {HTMLElement} parent 
     * @param {{}} icon_style 
     * @param {Game_State} game_state 
     * @param {Wave_System} wave_system 
     */
    constructor(
        parent,
        icon_style,
        game_state,
        wave_system,
    ) {
        this.container = nextWaveIMG(32, 32)
        parent.appendChild(this.container)
        setStyle(this.container, icon_style)

        const s = this.container.style

        this.container.addEventListener('click', wave_system.wave_start)

        game_state.on_change.add(() => {
            s.display = (game_state.value === Game_State.IDLE) ? 'inline' : 'none'
        })
    }
}







