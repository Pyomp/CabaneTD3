







import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Enemy_Manager } from '../../systems/Enemy_Manager.js'
import { Instant_Attack } from './models/Instant_Attack.js'

export class Orb_Ult extends Instant_Attack {

    /**
     * @param {Vector3} pos 
     * @param {()=>{}} get_power 
     * @param {()=>{}} get_target 
     * @param {Loop_Manager} loop_system 
     */
    constructor(
        on_collision,
        loop_system,
        game_state,
        color
    ) {
        const get_target = () => { return { x: 0, y: 0, z: 0 } }

        const pos = { x: 0, y: 10, z: 5 }

        super(
            pos,
            get_target,
            on_collision,
            loop_system,
            2,
            game_state,
        )
        this.color = color
        Orb_Ult.on_create?.(this)
    }
}




