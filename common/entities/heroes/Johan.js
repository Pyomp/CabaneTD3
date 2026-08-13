








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { Enemy_Manager } from '../../systems/Enemy_Manager.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Team_Bonus_Manager } from '../../systems/Team_Bonus_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Thunder } from '../attacks/Thunder.js'
import { Thunder_Ult } from '../attacks/Thunder_Ult.js'
import { Hero_Abstract } from './models/Hero_Abstract.js'

export class Johan extends Hero_Abstract {

    /**
     * @param {Vector3} pos
     * @param {Loop_Manager} loop_system 
     * @param {User_Data} user_data
     * @param {Enemy_Manager} enemy_manager 
     * @param {Team_Bonus_Manager} team_bonus_manager
     */
    constructor(
        pos,
        loop_system,
        damage_system,
        user_data,
        enemy_manager,
        game_state,
        team_bonus_manager,
    ) {

        const user = user_data.heroes.johan
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x - .3
            vec3.y = this.position.y + .6
            vec3.z = this.position.z - .3
            return vec3
        }
        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'johan', target)
        }

        const attack = () => {
            new Thunder(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
                0xaaaaaa
            )
        }
        const from_ult = () => {
            vec3.x = this.position.x + 0
            vec3.y = this.position.y 
            vec3.z = this.position.z - .3
            return vec3
        }
        const ult = () => {
            new Thunder_Ult(
                from_ult(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
                0xaaaaaa
            )
        }

        super(
            pos,
            loop_system,
            attack,
            ult,
            game_state,
        )

        const on_speed_change = () => {
            this.attack_speed = team_bonus_manager.magicians_speed
        }

        const dispose = this.dispose
        team_bonus_manager.on_magicians_speed.add(on_speed_change)
        this.dispose = () => {
            dispose()
            team_bonus_manager.on_magicians_speed.delete(on_speed_change)
        }

        Johan.on_create?.(this)
    }
}

