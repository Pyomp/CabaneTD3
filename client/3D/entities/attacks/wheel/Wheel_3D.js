import { Object3D } from '../../../modules/three.module.js'
import { destroy_wheel_3D, init_wheel_3D } from './init_wheel_3D.js'



let model_3D
export class Wheel_3D {
    static init = () => {
        model_3D = init_wheel_3D()
    }
    static destroy = () => {
        model_3D = undefined
        destroy_wheel_3D()
    }
    constructor(
        scene,
        model,
        loop_manager,
    ) {
        const obj3D = new Object3D()
        const wheel = model_3D.clone()
        obj3D.add(wheel)

        const position = obj3D.position

        const update = (dt) => {
            wheel.rotateX(dt * 5)
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
