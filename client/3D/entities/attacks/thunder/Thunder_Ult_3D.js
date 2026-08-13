import { Thunder_Ult } from '../../../../../common/entities/attacks/Thunder_Ult.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { planeGeometry } from '../../../modules/primitive.js'
import { DoubleSide, Mesh, MeshBasicMaterial } from '../../../modules/three.module.js'


let texture

export class Thunder_Ult_3D {
    static init = (loader) => {
        texture = loader.texture_load(new URL('./pentacle.svg', import.meta.url).href)
    }
    static destroy = () => { texture = undefined }

    /**
     * 
     * @param {Scene} scene 
     * @param {Thunder_Ult} model 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        model,
        loop_manager,
    ) {
        // pentacle
        const mat = new MeshBasicMaterial({
            map: texture,
            color: model.color,
            side: DoubleSide,
            transparent: true,
        })
        const pentacle = new Mesh(planeGeometry, mat)
        pentacle.scale.set(3, 3, 3)
        pentacle.position.set(model.position.x, model.position.y + 0.7, model.position.z - 1)
        pentacle.lookAt(0, 1, 0)

        const update = (dt) => {
            pentacle.rotateZ(dt)
        }
        //

        scene.add(pentacle)
        loop_manager.frame_updates.add(update)
        const dispose = () => {
            scene.remove(pentacle)
            loop_manager.frame_updates.delete(update)
            mat.dispose()
        }
        model.on_dispose = dispose
    };
}



