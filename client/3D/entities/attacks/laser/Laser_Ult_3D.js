

import { AdditiveBlending, DoubleSide, Mesh, MeshBasicMaterial, Scene, Vector3 } from '../../../modules/three.module.js'
import { destroy_laser_3D, init_laser_3D } from './init_laser_3D.js'
import { Laser_Ult } from '../../../../../common/entities/attacks/Laser_Ult.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { HTMLElement_Effect } from '../../../../html/utils/HTMLElement_Effect.js'
import { Scene_Shaker } from '../../../utils/Scene_Shaker.js'


let geometry, texture

const init = () => {
    [geometry, texture] = init_laser_3D()
}

export class Laser_Ult_3D {
    static init = init
    static destroy = destroy_laser_3D

    /**
     * 
     * @param {Scene} scene 
     * @param {Laser_Ult} model 
     * @param {Loop_Manager} loop_manager 
     * @param {HTMLElement_Effect} htmlelement_effect 
     * @param {Scene_Shaker} scene_shaker 
     */
    constructor(
        scene,
        model,
        loop_manager,
        htmlelement_effect,
        scene_shaker,
    ) {
        const material = new MeshBasicMaterial({
            map: texture,
            blending: AdditiveBlending,
            color: model.color,
            side: DoubleSide,
            depthWrite: false
        })
        const obj3D = new Mesh(geometry, material)

        obj3D.position.copy(model.position)
        obj3D.scale.set(10, 10, 100)
        let look_at_z = 10
        obj3D.lookAt(0, 0, look_at_z)

        let age = 0
        const update = (dt) => {
            age += dt

            if (age < 0.5) {
                material.opacity = age * 2
            } else if (age < 1.5) {
                material.opacity = 1
            } else if (age < 2) {
                material.opacity = 1 - (age - 1.5) * 2
            } else {
                dispose()
                return
            }

            look_at_z = 15 - age * 15
            obj3D.lookAt(0, 0, look_at_z)

            scene_shaker.set_shake(this, age < 1 ? age / 20 : (2 - age) / 20)
            htmlelement_effect.set_brightness(this, age < 1 ? age * 2 + 1 : (2 - age) * 2 + 1)
            htmlelement_effect.set_blur(this, age < 1 ? age : (2 - age))

            material.opacity -= dt * 2
            if (material.opacity < 0) { dispose(); return true }
        }

        scene.add(obj3D)
        loop_manager.frame_updates.add(update)
        const dispose = () => {
            scene_shaker.unset_shake(this)
            htmlelement_effect.unset_brightness(this)
            htmlelement_effect.unset_blur(this)
            loop_manager.frame_updates.delete(update)
            scene.remove(obj3D)
            material.dispose()
        }
    }
}


