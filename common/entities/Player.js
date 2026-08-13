







import { Box3, Sphere, Vector3 } from '../../client/3D/modules/three.module.js'
import { cbH } from '../../utils/utils.js'
import { ERROR_MP_TO_LOW, SUCCESS } from '../constants.js'

import { Loop_Manager } from '../systems/Loop_Manager.js'
import { Enemy_Manager } from '../systems/Enemy_Manager.js'
import { Event_State_Manager } from '../systems/Event_State_Manager.js'
import { Physics } from '../Physics.js'
import { Game_Data } from '../user_data/models/Game_Data.js'
import { Event_Dispatcher } from '../../utils/Event_Dispatcher.js'
import { PI } from '../../utils/math/math_utils.js'

const vec3_1 = new Vector3()
const vec3_2 = new Vector3()
const vec3_up = new Vector3(0, 1, 0)

const bounding_box = new Box3(new Vector3(-1, 0, -1), new Vector3(1, 2, 1))
const bounding_sphere = new Sphere(new Vector3(0, 1, 0), 1)

export class Player extends Event_Dispatcher {

    static IDLE = 'idle'
    static JUMP = 'jump'
    static KNOCK = 'knock'
    static LEFT = 'left'
    static RIGHT = 'right'
    static RUN =  'run'
    static SLIDE = 'slide'

    on_state = new Set()
    #state = 'idle'
    get state() { return this.#state }
    set state(a) {
        this.#state = a
        cbH(this.on_state)
    }

    bounding_box = bounding_box
    bounding_sphere = bounding_sphere
    velocity = new Vector3(0, 0, 0)
    position = new Vector3(0, 0, 5)
    rotation = PI
    move_speed = 0

    /**
     * @param {Loop_Manager} loop_system 
     * @param {Physics} physics 
     * @param {Game_Data} game_data
     * @param {Enemy_Manager} enemy_manager
     * @param {Event_State_Manager} event_state_manager
     */
    constructor(
        loop_system,
        physics,
        game_data,
        enemy_manager,
        event_state_manager,
    ) {
        super()
        physics.add(this)

        const move = event_state_manager.move

        const update = (dt) => {
            if (this.state === 'idle'
                || this.state === 'run'
                || this.state === 'jump'
            ) {
                if (move.radius > 0) {
                    if (this.state === 'idle') { this.state = 'run' }
                    this.rotation = move.angle
                    this.velocity.z = Math.cos(this.rotation) * move.radius
                    this.velocity.x = Math.sin(this.rotation) * move.radius
                } else {
                    if (this.state === 'run') this.state = 'idle'
                }
            }
        }

        const frame_update = (dt) => {
            behaviors[this.state](dt)
        }

        let anim_step = 0
        let age = 0
        const behaviors_init = {
            idle: () => { },
            jump: () => { },
            knock: () => { anim_step = 0; age = 0 },
            left: () => { anim_step = 0; age = 0 },
            right: () => { anim_step = 0; age = 0 },
            run: () => { },
            slide: () => { age = 0 },
        }

        this.on_state.add(() => {
            behaviors_init[this.state]()
        })

        const behaviors = {
            idle: () => { },
            run: () => { },
            jump: () => {
                if (this.position.y === 0) this.state = 'idle'
            },
            left: (dt) => {
                age += dt
                if (anim_step === 0 && age > .25) {
                    anim_step++; attack()
                } else if (age > .5) {
                    this.state = 'idle'
                }
            },
            right: (dt) => {
                age += dt
                if (anim_step === 0 && age > .25) {
                    anim_step++; attack()
                } else if (age > .5) {
                    this.state = 'idle'
                }
            },
            knock: (dt) => {
                age += dt
                if (anim_step === 0 && age > 0.875) {
                    anim_step++; attack({ x: 0, y: 0, z: 1.5 })
                } else if (age > 1.33) {
                    this.state = 'idle'
                }
            },
            slide: (dt) => {
                age += dt
                if (age > .4) {
                    this.state = 'idle'
                }
            },
        }

        loop_system.frame_updates.add(frame_update)
        loop_system.updates_physics.add(update)
        this.dispose = () => {
            loop_system.frame_updates.delete(frame_update)
            loop_system.updates_physics.delete(update)
            physics.delete(this)
        }

        this.left = () => {
            if (game_data.mp < 2) {
                return ERROR_MP_TO_LOW
            } else {
                game_data.mp -= 2
                this.state = 'left'
                return SUCCESS
            }
        }

        this.right = () => {
            if (game_data.mp < 2) {
                return ERROR_MP_TO_LOW
            } else {
                game_data.mp -= 2
                this.state = 'right'
                return SUCCESS
            }
        }

        this.knock = () => {
            if (game_data.mp < 2) {
                return ERROR_MP_TO_LOW
            } else {
                game_data.mp -= 2
                this.state = 'knock'
                return SUCCESS
            }
        }

        this.slide = () => {
            this.velocity.z = Math.cos(this.rotation) * 40
            this.velocity.x = Math.sin(this.rotation) * 40
            this.state = 'slide'
        }

        this.jump = (power = 20) => {
            if (this.position.y !== 0) return
            this.velocity.y += power
            this.state = 'jump'
        }

        const attack = (pos = { x: 0, y: .7, z: 1 }) => {
            vec3_1.x = pos.x
            vec3_1.y = pos.y
            vec3_1.z = pos.z
            vec3_1.applyAxisAngle(vec3_up, this.rotation)
            vec3_1.x += this.position.x
            vec3_1.y += this.position.y
            vec3_1.z += this.position.z

            this.emit('skill_impact', vec3_1)

            for (const enemy of enemy_manager.instances) {
                vec3_2.copy(enemy.position)
                    .add(enemy.bounding_sphere.center)
                if (vec3_2.sub(vec3_1).lengthSq() < (1 + enemy.bounding_sphere.radius)) {
                    enemy.bump()
                }
            }
        }
    }
}









