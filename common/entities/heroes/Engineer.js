








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Wheel } from '../attacks/Wheel.js'
import { Wheel_Ult } from '../attacks/Wheel_Ult.js'
import { Hero_Abstract } from './models/Hero_Abstract.js'

export class Engineer extends Hero_Abstract {
    /**
     * 
     * @param {Vector3} pos
     * @param {Loop_Manager} loop_system 
     * @param {User_Data} user_data
     * @param {Enemy_Manager} enemy_manager 
     */
    constructor(
        pos,
        loop_system,
        damage_system,
        user_data,
        enemy_manager,
        game_state,
    ) {
        const user = user_data.heroes.engineer
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'engineer', target)
        }

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x + 0
            vec3.y = this.position.y + .5
            vec3.z = this.position.z - .3
            return vec3
        }

        const attack = () => {
            new Wheel(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
            )
        }

        const on_ult_collision = () => {
            damage_system.hero_damage_all(user, 'engineer')
        }
        
        const ult = () => {
            new Wheel_Ult(
                loop_system,
                on_ult_collision,
                enemy_manager,
                game_state
            )
        }

        super(
            pos,
            loop_system,
            attack,
            ult,
            game_state,
        )

        Engineer.on_create?.(this)
    }
}