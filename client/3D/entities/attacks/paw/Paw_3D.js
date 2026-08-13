import { Paw } from '../../../../../common/entities/attacks/Paw.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import {
    Scene,
} from '../../../modules/three.module.js'
import { init_paw_3D } from './init_paw_3D.js'

let models
export class Paw_3D {
    static init = () => {
        models = init_paw_3D()
    }
    static destroy = () => {
        models = undefined
    }

    /**
     * 
     * @param {Scene} scene 
     * @param {Paw} model 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        model,
        loop_manager,
    ) {
        const obj3D = models[model.color].clone()
        const position = obj3D.position

        const update = () => {
            const dt_physics_raf = loop_manager.dt_physics_raf

            position.copy(model.position)

            const velo_x = model.velocity.x * dt_physics_raf
            const velo_y = model.velocity.y * dt_physics_raf
            const velo_z = model.velocity.z * dt_physics_raf

            position.x += velo_x
            position.y += velo_y
            position.z += velo_z
        }

        loop_manager.frame_updates.add(update)
        scene.add(obj3D)
        const dispose = () => {
            scene.remove(obj3D)
            loop_manager.frame_updates.delete(update)
            model.on_dispose = undefined
        }
        model.on_dispose = dispose
    }
}
