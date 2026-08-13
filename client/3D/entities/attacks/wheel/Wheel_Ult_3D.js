import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { PI05 } from '../../../../../utils/math/math_utils.js'
import { HTMLElement_Effect } from '../../../../html/utils/HTMLElement_Effect.js'
import { Object3D, Scene } from '../../../modules/three.module.js'
import { Scene_Shaker } from '../../../utils/Scene_Shaker.js'
import { destroy_wheel_3D, init_wheel_3D } from './init_wheel_3D.js'


let model_3D
export class Wheel_Ult_3D {
    static init = () => {
        model_3D = init_wheel_3D()
    }
    static destroy = () => {
        model_3D = undefined
        destroy_wheel_3D()
    }
    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     * @param {HTMLElement_Effect} htmlelement_effect 
     * @param {Scene_Shaker} scene_shaker 
     */
    constructor(
        scene,
        loop_manager,
        htmlelement_effect,
        scene_shaker,
    ) {
        const obj3D = new Object3D()
        const wheel = model_3D.clone()
        obj3D.add(wheel)

        obj3D.position.set(0, 15, 0)
        obj3D.rotateZ(PI05)
        obj3D.scale.set(20, 20, 20)

        htmlelement_effect.set_brightness(this, 1.5)

        let phase = 0
        let age = 0
        const animations = [
            (dt) => {
                age += dt * .5
                if (age > 1) {
                    age = 0
                    phase++
                }
                wheel.rotateX(dt * 5)

            },
            (dt) => {
                age += dt
                if (age > 1) {
                    obj3D.position.y = 3.5
                    age = 0
                    phase++
                    return
                }
                wheel.rotateX(dt * 5)
                obj3D.position.y = 15 - age * 11.5
            },
            (dt) => {
                age += dt
                if (age > 3) {
                    htmlelement_effect.unset_brightness(this)
                    scene_shaker.unset_shake(this)
                    dispose()
                }
                scene_shaker.set_shake(this, (3 - age) * .05)
            }
        ]

        const update = (dt) => {
            animations[phase](dt)
        }

        loop_manager.frame_updates.add(update)
        scene.add(obj3D)
        const dispose = () => {
            obj3D.dispose?.()
            scene.remove(obj3D)
            loop_manager.frame_updates.delete(update)
        }
    }
}