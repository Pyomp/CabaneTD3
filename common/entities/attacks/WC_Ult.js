import { Math_random } from '../../../utils/math/math_utils.js'
import { DT_PHYSICS } from '../../constants.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Game_State } from '../../State.js'
import { Wave_System } from '../../systems/Wave_System.js'

export class WC_Ult {
    static on_create

    /**
     * 
     * @param {Loop_Manager} loop_manager 
     * @param {Wave_System} wave_system 
     * @param {Game_State} game_state 
     */
    constructor(
        loop_manager,
        wave_system,
    ) {
        let age = 0
        const update = (dt) => {
            age += dt
            if (age > 3) {
                if (Math_random() < .05) wave_system.wave_skip()
                return true
            }
        }

        loop_manager.frame_updates.add(update)
        
        WC_Ult.on_create?.(this)
    }
}





