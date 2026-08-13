







import { Vector3 } from '../../../../client/3D/modules/three.module.js'
import { Math_random } from '../../../../utils/math/math_utils.js'
import { cbH } from '../../../../utils/utils.js'
import { Game_State } from '../../../State.js'
import { Loop_Manager } from '../../../systems/Loop_Manager.js'

// import { Game_State } from '../../../State.js'
import { User_Data } from '../../../user_data/User_Data.js'

export class Hero_Abstract {
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
     */
    constructor(
        pos,
        loop_system,
        attack,
        ult,
        game_state,
    ) {

        const delta_next_attack = 1
        const attack_trigger = 1
        const attack_duration = 1.5
        const ult_trigger = 1
        const ult_duration = 3

        this.position = new Vector3(pos.x, pos.y, pos.z)

        this.attack_speed = 1
        this.ultimate_request = 0

        const update = (dt) => {
            behaviors[this.state](dt)
        }

        let needs_attack = true
        let age = 0
        const behaviors_init = {
            idle: () => { age = 0 },
            attack: () => { needs_attack = true; age = 0 },
            ult: () => { needs_attack = true; age = 0 },
        }

        this.on_state.add(() => {
            behaviors_init[this.state]()
        })


        let next_attack = (delta_next_attack + attack_duration) * Math_random()
        const behaviors = {
            idle: (dt) => {
                if (game_state.value !== Game_State.WAVE) return

                age += dt * this.attack_speed
                if (next_attack < age) {
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

                age += dt * this.attack_speed
                if (needs_attack === true && age > attack_trigger) {
                    needs_attack = false
                    attack()
                } else if (age > attack_duration) {
                    next_attack = delta_next_attack + Math_random() - .5
                    this.state = 'idle'
                }
            },
            ult: (dt) => {
                if (game_state.value !== Game_State.WAVE) { this.state = 'idle'; return }

                age += dt * this.attack_speed
                if (needs_attack === true && age > ult_trigger) {
                    needs_attack = false
                    ult()
                } else if (age > ult_duration) {
                    next_attack = delta_next_attack + Math_random() - .5
                    this.state = 'idle'
                }
            },
        }

        loop_system.updates_physics.add(update)
        this.dispose = () => {
            loop_system.updates_physics.delete(update)
            this.on_dispose?.()
        }

    }
}









