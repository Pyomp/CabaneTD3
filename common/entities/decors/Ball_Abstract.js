






import { Vector3 } from '../../../client/3D/modules/three.module.js'
import {
    Math_acos,
    Math_cos,
    Math_random,
    Math_sin,
    PI2,
} from '../../../utils/math/math_utils.js'
import { DT_PHYSICS } from '../../constants.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Entity_Abstract } from '../models/Entity_Abstract.js'

export class Ball_Abstract extends Entity_Abstract {
    /**
     * 
     * @param {Vector3} pos 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        pos,
        loop_manager,
    ) {
        super()
        this.position.x = pos.x
        this.position.y = pos.y
        this.position.z = pos.z

        const phi = Math_random() * PI2
        const costheta = Math_random() * 2 - 1
        const theta = Math_acos(costheta)

        const s_theta = Math_sin(theta)
        this.velocity.x = s_theta * Math_cos(phi)
        this.velocity.y = s_theta * Math_sin(phi)
        this.velocity.z = Math_cos(theta)
        this.velocity.multiplyScalar(0.8)

        let age = 0
        const update = () => {
            const dt = DT_PHYSICS/5
            age = (age + dt) % 2
            if (age < 1) {
                this.position.x += this.velocity.x * dt
                this.position.y += this.velocity.y * dt
                this.position.z += this.velocity.z * dt
            } else {
                this.position.x -= this.velocity.x * dt
                this.position.y -= this.velocity.y * dt
                this.position.z -= this.velocity.z * dt
            }
        }
        loop_manager.updates_physics.add(update)
        this.dispose = () => {
            loop_manager.updates_physics.delete(update)
            this.state = 'dispose'
        }
    }
}










