








import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { Math_random } from '../../../utils/math/math_utils.js'
import { cbH } from '../../../utils/utils.js'
import { Game_State } from '../../State.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Plant_Bonus_Manager } from '../../systems/Plant_Bonus_Manager.js'
import { Stats_Manager } from '../../systems/Stats_Manager.js'
import { User_Data } from '../../user_data/User_Data.js'
import { Bee } from '../attacks/Bee.js'

export class Carna {

    on_start_ult
    on_end_ult



    on_state = new Set()
    #state = 'idle'
    get state() { return this.#state }
    set state(a) {
        this.#state = a
        cbH(this.on_state)
    }

    /**
     * 
     * @param {Vector3} pos
     * @param {Loop_Manager} loop_manager 
     * @param {User_Data} user_data
     * @param {Enemy_Manager} enemy_manager 
     * @param {Plant_Bonus_Manager} plant_bonus_manager 
     */
    constructor(
        pos,
        loop_manager,
        damage_system,
        user_data,
        enemy_manager,
        game_state,
        plant_bonus_manager,
    ) {
        this.position = new Vector3(pos.x, pos.y, pos.z)
        this.attack_speed = 1
        this.ultimate_request = 0

        const user = user_data.heroes.carna
        const target = enemy_manager.target
        const get_target = () => target[user.target]()

        // from attack
        const vec3 = new Vector3()
        const from_attack = () => {
            vec3.x = this.position.x
            vec3.y = this.position.y + 1.5
            vec3.z = this.position.z - 1
            return vec3
        }
        const on_attack_collision = (target) => {
            damage_system.hero_damage(user, 'carna', target)
        }

        const attack = () => {
            new Bee(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_manager,
                game_state,
            )
        }

        const update = (dt) => {
            behaviors[this.state](dt)
        }

        let needs_attack = true
        let t = Math_random()
        const behaviors_init = {
            idle: () => { t = 1 },
            attack: () => { needs_attack = true; t = 0 },
            ult: () => {
                plant_bonus_manager.speed = 1.1
                t = 10
            },
        }

        this.on_state.add(() => {
            behaviors_init[this.state]()
        })

        const behaviors = {
            idle: (dt) => {
                if (game_state.value !== Game_State.WAVE) return

                t -= dt * this.attack_speed
                if (t <= 0) {
                    if (this.ultimate_request > 0) {
                        this.ultimate_request--
                        this.state = 'ult'
                    } else {
                        this.state = 'attack'
                    }
                }
            },
            attack: (dt) => {
                if (game_state.value !== Game_State.WAVE) { this.state = 'idle'; return }

                t += dt * this.attack_speed
                if (needs_attack === true && t > 1) {
                    needs_attack = false
                    attack()
                } else if (t > 1.5) {
                    this.state = 'idle'
                }
            },
            ult: (dt) => {
                if (game_state.value !== Game_State.WAVE) {
                    this.state = 'idle'
                    return
                }
                t -= dt
                if (t <= 0) {
                    plant_bonus_manager.speed = 1
                    this.state = 'idle'
                }
            },
        }

        loop_manager.updates_physics.add(update)
        this.dispose = () => {
            loop_manager.updates_physics.delete(update)
            this.on_dispose?.()
        }

        Carna.on_create?.(this)
    }
}