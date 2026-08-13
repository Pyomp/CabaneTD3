








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Phone } from '../attacks/Phone.js'
import { WC_Ult } from '../attacks/WC_Ult.js'
import { Hero_Abstract } from './models/Hero_Abstract.js'

export class Employee extends Hero_Abstract {
    /**
     * 
     * @param {Vector3} pos
     * @param {Loop_Manager} loop_manager 
     * @param {User_Data} user_data
     * @param {Enemy_Manager} enemy_manager 
     */
    constructor(
        pos,
        loop_manager,
        damage_system,
        user_data,
        enemy_manager,
        game_state,
        wave_system,
    ) {
        const user = user_data.heroes.employee
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x + .1
            vec3.y = this.position.y + 1.3
            vec3.z = this.position.z - .5
            return vec3
        }
        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'employee', target)
        }

        const attack = () => {
            new Phone(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_manager,
                game_state,
            )
        }

        const ult = () => {
            new WC_Ult(
                loop_manager,
                wave_system,
            )
        }

        super(
            pos,
            loop_manager,
            attack,
            ult,
            game_state,
        )

        Employee.on_create?.(this)
    }
}