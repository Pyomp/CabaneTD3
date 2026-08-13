import { Loop_Manager } from '../../../../common/systems/Loop_Manager.js'
import { PI } from '../../../../utils/math/math_utils.js'
import { Mesh, Scene } from '../../modules/three.module.js'

export class WC_Ult_3D {

    /**
     * @param {Scene} scene 
     * @param {Mesh} wc_mesh 
     * @param {Mesh} tel_mesh 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        wc_mesh,
        tel_mesh,
        loop_manager,
    ) {
        wc_mesh.rotation.y = PI

        tel_mesh.position.set(0, 10, 0)
        tel_mesh.scale.set(3, 3, 3)
        tel_mesh.rotation.x = -1
        let age = 0
        const update = (dt) => {
            age += dt
            if (age < 2) {
                // nothing
            } else if (tel_mesh.position.y > 1) {
                tel_mesh.position.y = 10 - (age - 2) * 9
                tel_mesh.rotation.x = -15 * (age - 3)
            } else {
                dispose()
            }
        }

        scene.add(wc_mesh)
        scene.add(tel_mesh)
        loop_manager.frame_updates.add(update)
        const dispose = () => {
            scene.remove(wc_mesh)
            scene.remove(tel_mesh)
            loop_manager.frame_updates.delete(update)
        }
    }
}




