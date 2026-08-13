







import { Box3, Sphere, Vector3 } from '../../../../client/3D/modules/three.module.js'
import { equation_design } from '../../../../game_design/balance/equation_design.js'
import { EnemyBaseData } from '../../../../game_design/entities/mobs_design.js'

import { Loop_Manager } from '../../../systems/Loop_Manager.js'
import { Enemy_Manager } from '../../../systems/Enemy_Manager.js'
import { Evo_Bonus_Manager } from '../../../systems/Evo_Bonus_Managers.js'
import { Physics } from '../../../Physics.js'
import { User_Data } from '../../../user_data/User_Data.js'
import { cbH } from '../../../../utils/utils.js'
import { topo_basic } from '../../../../game_design/topo.js'
import { Event_Dispatcher } from '../../../../utils/Event_Dispatcher.js'
// import { Conditions } from './components/Conditions.js'


const bounding_box = new Box3(new Vector3(-1, 0, -1), new Vector3(1, 2, 1))
const bounding_sphere = new Sphere(new Vector3(0, 1, 0), 1)
export class Enemy_Abstract extends Event_Dispatcher {
    static on_create

    max_hp = 1

    on_hp = new Set()
    #hp = 1
    get hp() { return this.#hp }
    set hp(a) {
        const clamped = (a < 0) ? 0
            : (a > this.max_hp) ? this.max_hp : a

        if (this.#hp === 0) return
        else if (clamped === 0) {
            this.die()
        }
        this.#hp = clamped

        cbH(this.on_hp)
    }

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
     * @param {EnemyBaseData} name 
     * @param {number} max_hp 
     * @param {Loop_Manager} loop_system 
     * @param {Physics} physics 
     * @param {User_Data} user_data 
     * @param {Enemy_Manager} enemy_manager 
     * @param {Evo_Bonus_Manager} evo_bonus_manager 
     */
    constructor(
        pos,
        design,
        max_hp,
        loop_system,
        physics,
        user_data,
        enemy_manager,
        evo_bonus_manager,
    ) {
        super()
        this.max_hp = max_hp
        this.hp = max_hp
        this.def = 1

        this.bounding_box = bounding_box
        this.bounding_sphere = bounding_sphere
        this.velocity = new Vector3(0, 0, 0)
        this.position = new Vector3(pos.x, 0, pos.z)
        physics.add(this)

        const target = topo_basic.field.schoolEntry.z - 1 + Math.random()

        // this.conditions = new Conditions(this)

        this.move_speed = 1
        this.attack_speed = 1

        const update = (dt) => {
            behaviors[this.state](dt)
        }

        loop_system.updates_physics.add(update)
        enemy_manager.add(this)
        this.dispose = () => {
            loop_system.updates_physics.delete(update)
            enemy_manager.delete(this)
            physics.delete(this)
            this.on_dispose?.()
        }

        let next_attack = 0
        let needs_attack = true
        let age = 0
        const behaviors_init = {
            idle: () => { age = 0 },
            bump: () => { },
            knockback: () => { },
            walk: () => { },
            attack: () => { needs_attack = true; age = 0 },
            win: () => { },
            die: () => { },
        }
        this.on_state.add(() => {
            behaviors_init[this.state]()
        })

        const behaviors = {
            walk: () => {
                if (this.position.z < target) {
                    const acc = Math.max(0,
                        this.velocity.z < 1 ? this.move_speed :
                            this.move_speed - (this.velocity.z - 1))
                    this.velocity.z += acc
                } else {
                    this.state = 'idle'
                }
            },
            idle: (dt) => {
                age += dt
                if (this.position.z < target) {
                    this.state = 'walk'
                } else if (next_attack < age) {
                    this.state = 'attack'
                }
            },
            attack: (dt) => {
                age += dt * 2
                if (needs_attack === true && age > 1) {
                    needs_attack = false
                    attack()
                } else if (age > 2) {
                    next_attack = 1
                    this.state = 'idle'
                }
            },
            bump: () => {
                if (this.position.y === 0) {
                    this.state = 'idle'
                }
            },
            knockback: () => {
                if (this.position.y === 0) {
                    this.state = 'idle'
                }
            },
        }

        this.knockback = (power = 1) => {
            this.velocity.z -= power
            this.velocity.y += 1
            this.state = 'knockback'
        }

        this.bump = (power = 20) => {
            this.state
            this.velocity.y += power
            this.state = 'bump'
        }
        this.die = () => {
            const gold_amount = equation_design.gold(
                design.gold,
                user_data.game.wave,
                evo_bonus_manager.gold)
            // TODO stats gold
            user_data.wallet.gold += gold_amount
            user_data.game.xp += design.xp
            this.state = 'die'
            this.dispose()
        }
        this.win = () => { this.state = 'win', this.dispose() }

        const attack = () => {
            user_data.game.hp -= design.power
        }
    }
}









