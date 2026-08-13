




import { Vector3 } from '../../../../client/3D/modules/three.module.js'
import { DT_PHYSICS } from '../../../constants.js'
import { Loop_Manager } from '../../../systems/Loop_Manager.js'
import { Game_State } from '../../../State.js'


// target
// guided projectile
// projectile

const vec3 = new Vector3()
export class Guided_Projectile {
    static on_create = null
    on_dispose = null

    /**
     * 
     * @param {Vector3} pos 
     * @param {()=>{}} get_target 
     * @param {boolean} is_changing_target 
     * @param {number} base_speed
     * @param {()=>{}} on_collision 
     * @param {Loop_Manager} loop_system 
     */
    constructor(
        pos,
        get_target,
        is_changing_target = true,
        base_speed,
        on_collision,
        loop_system,
        game_state,
        base_velocity,
    ) {

        let target = get_target()
        this.position = new Vector3(pos.x, pos.y, pos.z)
        this.velocity = new Vector3(base_velocity?.x, base_velocity?.y, base_velocity?.z)

        const update = () => {

            if (target === undefined || target.hp <= 0 || game_state.value !== Game_State.WAVE) {
                if (is_changing_target === true) {
                    target = get_target()
                    if (target === undefined) dispose()
                } else {
                    dispose()
                }
                return
            }

            const length_sq = vec3.copy(target.position)
                .sub(this.position)
                .lengthSq()

            // collision
            if (length_sq < .2) { on_collision(target); dispose(); return }

            const length = length_sq ** .5

            vec3.divideScalar(length)
                .multiplyScalar(base_speed)

            this.velocity.add(vec3)

            this.velocity.divideScalar(1.1)

            this.position.x += this.velocity.x * DT_PHYSICS
            this.position.y += this.velocity.y * DT_PHYSICS
            this.position.z += this.velocity.z * DT_PHYSICS
        }

        loop_system.updates_physics.add(update)

        const dispose = () => {
            loop_system.updates_physics.delete(update)
            this.on_dispose?.()
        }
    }
}

