import { AdditiveBlending, DoubleSide, Mesh, MeshBasicMaterial, Vector3 } from '../../../modules/three.module.js'
import { destroy_laser_3D, init_laser_3D } from './init_laser_3D.js'


let geometry, texture

const init = () => {
    [geometry, texture] = init_laser_3D()
}

const vec3 = new Vector3()
export class Laser_3D {
    static init = init
    static destroy = destroy_laser_3D

    constructor(
        scene,
        model,
        loop_manager,
    ) {
        if (model.target === undefined) return
        const material = new MeshBasicMaterial({
            map: texture,
            blending: AdditiveBlending,
            color: model.color,
            side: DoubleSide,
            depthWrite: false
        })
        const obj3D = new Mesh(geometry, material)

        // obj3D.rotation.y = -Math.PI / 2

        const update = (dt) => {
            material.opacity -= dt * 2
            if (material.opacity < 0) { dispose(); return true }
        }



        obj3D.position.copy(model.position)
        vec3.copy(model.target.position).sub(model.position)

        obj3D.lookAt(
            model.target.position.x,
            model.target.position.y,
            model.target.position.z
        )

        const l = vec3.length()
        obj3D.scale.y = .2
        obj3D.scale.x = .2
        obj3D.scale.z = l
        vec3.divideScalar(l)

        scene.add(obj3D)
        loop_manager.frame_updates.add(update)
        const dispose = () => {
            loop_manager.frame_updates.delete(update)
            scene.remove(obj3D)
            material.dispose()
        }
    }
}
