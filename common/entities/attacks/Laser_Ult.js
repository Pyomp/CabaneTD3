







import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Enemy_Manager } from '../../systems/Enemy_Manager.js'
import { Instant_Attack } from './models/Instant_Attack.js'

export class Laser_Ult extends Instant_Attack {

    /**
     * @param {Vector3} pos 
     * @param {()=>{}} get_power 
     * @param {()=>{}} get_target 
     * @param {Loop_Manager} loop_system 
     * @param {Enemy_Manager} enemy_manager 
     */
    constructor(
        pos,
        on_collision,
        loop_system,
        game_state,
        color,
    ) {
        const get_target = () => { return { x: 0, y: 0, z: 0 } }

        super(
            pos,
            get_target,
            on_collision,
            loop_system,
            1,
            game_state,
        )
        this.color = color
        Laser_Ult.on_create?.(this)
    }
}




