
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Enemy_Manager } from '../../systems/Enemy_Manager.js'
import { Game_State } from '../../State.js'









export class Wheel_Ult {
    static on_create = null
    on_dispose = null

    /**
     * 
     * @param {Loop_Manager} loop_manager 
     * @param {Enemy_Manager} enemy_manager 
     * @param {Game_State} game_state 
     */
    constructor(
        loop_manager,
        on_collision,
        enemy_manager,
        game_state,
    ) {
        let age = 0
        const update = (dt) => {
            age += dt
            if (3 < age) {
                if (game_state.value === Game_State.WAVE)
                    on_collision()
                dispose()
            }
        }

        loop_manager.updates_physics.add(update)
        const dispose = () => {
            loop_manager.updates_physics.delete(update)
            this.on_dispose?.()
        }

        Wheel_Ult.on_create?.(this)
    }
}












