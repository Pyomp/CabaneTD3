





import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { HTMLElement_Effect } from '../../../../html/utils/HTMLElement_Effect.js'
import { TextureAnimator } from '../../../modules/TextureAnimator.js'
import { DoubleSide, Mesh, MeshBasicMaterial, MeshLambertMaterial, Scene } from '../../../modules/three.module.js'
import { Scene_Shaker } from '../../../utils/Scene_Shaker.js'
import { init_orb_3D } from './init_orb_3D.js'
import { Particle_Comet } from './particles/Particle_Comet.js'


let sphere_geo
export class Orb_Ult_3D {
    static init = async (loader) => {
        [sphere_geo] = await init_orb_3D(loader)
    }
    static destroy = () => {
        destroy_orb_3D()
        sphere_geo = undefined
        energy_geo = undefined
        tex = undefined
    }

    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     * @param {HTMLElement_Effect} htmlelement_effect 
     * @param {Scene_Shaker} scene_shaker 
     * @param {number} color 
     */
    constructor(
        scene,
        loop_manager,
        htmlelement_effect,
        scene_shaker,
        color = 0x000000,
    ) {

        const obj3D = new Mesh(sphere_geo, new MeshBasicMaterial({ color: color }))

        const particle_color_dispatcher = {
            [0xff4444]: [
                0, 1, .8, .8, .5,
                0.5, 1, 0, 0, .5,
                1, 1, 1, 1, 0,
            ],
            [0x44ff44]: [
                0, .7, 1, 1, .5,
                0.5, 0, 1, 0, .5,
                1, 1, 1, 1, 0,
            ],
            [0x44ffff]: [
                0, .7, 1, 1, .5,
                0.5, 0, 1, 1, .5,
                1, 1, 1, 1, 0,
            ],

        }
        const particles = new Particle_Comet(
            obj3D,
            loop_manager,
            {
                color: particle_color_dispatcher[color]
            }
        )
        obj3D.children[0].position.z = 0.20
        obj3D.children[0].rotation.x = -Math.PI / 2
        obj3D.position.set(0, 30, 15)
        obj3D.lookAt(0, 0, 0)
        obj3D.scale.set(20, 20, 20)

        const mat1 = obj3D.material
        const mat2 = obj3D.children[0].material
        mat1.opacity = 1
        mat2.opacity = 1

        const fadeout_update = (dt) => {
            mat1.opacity -= dt
            mat2.opacity = mat1.opacity
            if (obj3D.material.opacity <= 0) {
                dispose()
                return true
            }
        }

        const fall_update = (dt) => {
            obj3D.translateZ(dt * 3)
            const dist = obj3D.position.y - 0.21 // use later
            if (dist <= 0) {

                obj3D.position.y = 0.21
                // const shockwave = new Shockwave(color)
                // for (const enemy of target) {
                //     enemy.hp -= power
                // }
                // shockwave.obj3D.position.x = obj3D.position.x
                // shockwave.obj3D.position.y = 0.5
                // shockwave.obj3D.position.z = obj3D.position.z

                htmlelement_effect.unset_brightness(this)
                scene_shaker.unset_shake(this)
                htmlelement_effect.unset_blur(this)

                loop_manager.frame_updates.add(fadeout_update)
                return true
            }
            scene_shaker.set_shake(this, Math.max(0, 0.2 - dist / 5))
            htmlelement_effect.set_blur(this, Math.max(0, 1.8 - dist))
            htmlelement_effect.set_brightness(this, Math.max(1, 1.5 - dist / 2))

        }

        scene.add(obj3D)
        loop_manager.frame_updates.add(fall_update)
        particles.start()
        const dispose = () => {
            particles.dispose()
            scene.remove(obj3D)
            loop_manager.frame_updates.delete(fall_update)
            loop_manager.frame_updates.delete(fadeout_update)
            obj3D.material.dispose()
        }
    }
}