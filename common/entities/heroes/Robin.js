








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Team_Bonus_Manager } from '../../systems/Team_Bonus_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Paw } from '../attacks/Paw.js'
import { Paw_Ult } from '../attacks/Paw_Ult.js'
import { Hero_Abstract } from './models/Hero_Abstract.js'

export class Robin extends Hero_Abstract {
    /**
     * 
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
        const user = user_data.heroes.robin
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x - .3
            vec3.y = this.position.y + .5
            vec3.z = this.position.z - .3
            return vec3
        }
        
        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'robin', target)
        }

        const attack = () => {
            new Paw(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
                'red'
            )
        }

        const from_ult = () => {
            vec3.x = this.position.x + 0
            vec3.y = this.position.y + .5
            vec3.z = this.position.z - .3
            return vec3
        }

        const ult = () => {
            new Paw_Ult(
                this.position,
                from_ult(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
                'red'
            )
        }

        super(
            pos,
            loop_system,
            attack,
            ult,
            game_state,
            'red'
        )

        const on_speed_change = () => {
            this.attack_speed = team_bonus_manager.animals_speed
        }

        const dispose = this.dispose
        team_bonus_manager.on_animals_speed.add(on_speed_change)
        this.dispose = () => {
            dispose()
            team_bonus_manager.on_animals_speed.delete(on_speed_change)
        }

        Robin.on_create?.(this)
    }
}

