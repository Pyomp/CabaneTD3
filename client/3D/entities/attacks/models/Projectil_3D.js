import { Guided_Projectile } from '../../../../../common/entities/attacks/models/Guided_Projectile.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Object3D, Scene, Vector3 } from '../../../modules/three.module.js'




const front_vector3 = new Vector3(0, 0, 1)

export class Projectil_3D {
    /**
     * 
     * @param {Scene} scene 
     * @param {Guided_Projectile} model 
     * @param {Object3D} obj3D 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        model,
        obj3D,
        loop_manager,
    ) {

        const position = obj3D.position

        const update = () => {
            const dt_physics_raf = loop_manager.dt_physics_raf

            position.copy(model.position)

            const velo_x = model.velocity.x * dt_physics_raf
            const velo_y = model.velocity.y * dt_physics_raf
            const velo_z = model.velocity.z * dt_physics_raf

            obj3D.lookAt(
                position.x + velo_x,
                position.y + velo_y,
                position.z + velo_z,
            )

            position.x += velo_x
            position.y += velo_y
            position.z += velo_z
        }

        loop_manager.frame_updates.add(update)
        scene.add(obj3D)
        const dispose = () => {
            obj3D.dispose?.()
            scene.remove(obj3D)
            loop_manager.frame_updates.delete(update)
            model.on_dispose = undefined
        }
        model.on_dispose = dispose
    }
}












