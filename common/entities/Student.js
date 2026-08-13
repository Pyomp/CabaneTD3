import { Vector3 } from "../../client/3D/modules/three.module.js"
import { equation_design } from "../../game_design/balance/equation_design.js"
import { cbH } from '../../utils/utils.js'
import { Enemy_Manager } from "../systems/Enemy_Manager.js"
import { Game_State } from "../State.js"
import { User_Data } from "../user_data/User_Data.js"
import { Spark } from "./attacks/Spark.js"
import { Stats_Manager } from '../systems/Stats_Manager.js'
import { Math_random } from '../../utils/math/math_utils.js'
import { Loop_Manager } from '../systems/Loop_Manager.js'

export class Student {
    static on_create = null
    on_dispose = null

    on_state = new Set()
    #state = 'idle'
    get state() { return this.#state }
    set state(a) {
        this.#state = a
        cbH(this.on_state)
    }

    /**
     * @param {Vector3} pos 
     * @param {Loop_Manager} loop_system 
     * @param {Game_State} game_state 
     * @param {User_Data} user_data
     * @param {Enemy_Manager} enemy_manager
     */
    constructor(
        pos,
        loop_system,
        /** @type {Stats_Manager} */ stats_manager,
        game_state,
        user_data,
        enemy_manager,
    ) {
        
        this.position = new Vector3(pos.x, pos.y, pos.z)

        this.attack_speed = 1
        this.delta_next_attack = 1

        const update = (dt) => {
            behaviors[this.state](dt)
        }

        let needs_attack = true
        let age = 0
        const behaviors_init = {
            idle: () => { age = 0 },
            attack: () => { needs_attack = true; age = 0 },
        }

        this.on_state.add(() => {
            behaviors_init[this.state]()
        })

        let next_attack = (this.delta_next_attack + 2) * Math_random()
        const behaviors = {
            idle: (dt) => {
                if (game_state.value !== Game_State.WAVE) return

                age += dt * this.attack_speed
                if (next_attack < age) {
                    this.state = 'attack'
                }
            },
            attack: (dt) => {
                if (game_state.value !== Game_State.WAVE) { this.state = 'idle'; return }

                age += dt * this.attack_speed
                if (needs_attack === true && age > 1) {
                    needs_attack = false
                    attack()
                } else if (age > 2) {
                    next_attack = this.delta_next_attack
                    this.state = 'idle'
                }
            },
        }

        const user = user_data.student
        const target = enemy_manager.target
        const get_target = () => {
            return target[user.target]()
        }

        const get_power = () => {
            return equation_design.hero_damage(
                .1,// base attack
                user.power_add,
                user.power_mult,
                user.cc_add,
                user.cc_mult,
                user.dcc_add,
                user.dcc_mult,
                user_data.bonus.damage,
            )
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
            const power = get_power()
            target.hp -= power
            stats_manager.add_students_damage(power)
        }

        const attack = () => {
            new Spark(
                from_attack(),
                get_target,
                on_attack_collision,
                loop_system,
                game_state,
            )
        }
        
        loop_system.updates_physics.add(update)
        this.dispose = () => {
            loop_system.updates_physics.delete(update)
            this.on_dispose?.()
        }
        Student.on_create?.(this)
    }
}












