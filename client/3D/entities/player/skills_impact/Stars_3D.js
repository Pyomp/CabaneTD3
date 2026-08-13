import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { easing } from '../../../../../utils/easing.js'
import { Scene, Vector3 } from '../../../modules/three.module.js'
import { Impact_Effect_3D_Manager } from './init_effect_models.js'






export class Stars_3D {

    static init = Impact_Effect_3D_Manager.init
    static destroy = Impact_Effect_3D_Manager.destroy

    /**
     * 
     * @param {Scene} scene 
     * @param {Vector3} pos 
     * @param {Loop_Manager} loop_manager
     */
    constructor(
        scene,
        pos,
        loop_manager,
    ) {
        const obj3D = Impact_Effect_3D_Manager.models.stars.clone()
        obj3D.position.copy(pos)
        obj3D.scale.set(0, 0, 0)

        let age = 0
        const s = obj3D.scale
        const ease = easing.cubic.out
        const update = (dt) => {
            age += dt * 3
            if (age > 1) {
                dispose()
                return
            }
            const s_ratio = ease(age)
            s.set(s_ratio, s_ratio, s_ratio)
        }

        scene.add(obj3D)
        loop_manager.frame_updates.add(update)
        const dispose = () => {
            loop_manager.frame_updates.delete(update)
            scene.remove(obj3D)
        }
    }
}












