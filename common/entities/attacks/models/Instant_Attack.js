import { Vector3 } from '../../../../client/3D/modules/three.module.js'

import { Game_State } from '../../../State.js'
import { Loop_Manager } from '../../../systems/Loop_Manager.js'


export class Instant_Attack {
    static on_create = null
    on_dispose = null

    /**
     * 
     * @param {Vector3} pos 
     * @param {()=>{}} get_target 
     * @param {()=>{}} on_collision 
     * @param {Loop_Manager} loop_system 
     * @param {number} delay 
     */
    constructor(
        pos,
        get_target,
        on_collision,
        loop_system,
        delay = 0,
        game_state,
    ) {
        this.position = pos
        this.target = get_target()

        let age = 0
        const update = (dt) => {
            age += dt
            if (delay <= age) {
                if (this.target === undefined
                    || this.target.hp <= 0
                    || game_state.value !== Game_State.WAVE
                ) {
                    dispose()
                    return
                }
                on_collision(this.target)
                dispose()
            }
        }

        loop_system.frame_updates.add(update)
        const dispose = () => {
            loop_system.frame_updates.delete(update)
            this.on_dispose?.()
        }

    }
}












