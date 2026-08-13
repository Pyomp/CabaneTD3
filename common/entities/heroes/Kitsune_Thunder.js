








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Team_Bonus_Manager } from '../../systems/Team_Bonus_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Laser } from '../attacks/Laser.js'
import { Laser_Ult } from '../attacks/Laser_Ult.js'
import { Hero_Abstract } from './models/Hero_Abstract.js'

export class Kitsune_Thunder extends Hero_Abstract {

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

        const user = user_data.heroes.kitsune_thunder
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x + 0
            vec3.y = this.position.y + .8
            vec3.z = this.position.z - .8
            return vec3
        }
        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'kitsune_thunder', target)
        }
        
        const attack = () => {
            new Laser(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
                0xffff22,
            )
        }
        const on_ult_collision = () => {
            damage_system.hero_damage_all(user, 'kitsune_thunder')
        }

        const from_ult = () => {
            vec3.x = this.position.x + 0
            vec3.y = this.position.y + .5
            vec3.z = this.position.z - 1
            return vec3
        }
        const ult = () => {
            new Laser_Ult(
                from_ult(),
                on_ult_collision,
                loop_system,
                game_state,
                0xffff22,
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
            this.attack_speed = team_bonus_manager.kitsune_speed
        }

        const dispose = this.dispose
        team_bonus_manager.on_kitsune_speed.add(on_speed_change)
        this.dispose = () => {
            dispose()
            team_bonus_manager.on_kitsune_speed.delete(on_speed_change)
        }

        Kitsune_Thunder.on_create?.(this)
    }
}

