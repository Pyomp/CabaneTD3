








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Frisbee } from '../attacks/Frisbee.js'
import { Hero_Abstract } from './models/Hero_Abstract.js'

export class Papa extends Hero_Abstract {
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
        const user = user_data.heroes.papa
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x + 0
            vec3.y = this.position.y + .5
            vec3.z = this.position.z - .3
            return vec3
        }
        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'papa', target)
        }

        const attack = () => {
            new Frisbee(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
            )
        }

        const ult = () => {
            let nb = 0
            let age = 0
            loop_system.updates_physics.add((dt) => {
                age += dt
                while (nb < age * 5) {
                    nb++
                    attack()
                    if (nb === 20) return true
                }
            })
        }

        super(
            pos,
            loop_system,
            attack,
            ult,
            game_state,
        )

        Papa.on_create?.(this)
    }
}