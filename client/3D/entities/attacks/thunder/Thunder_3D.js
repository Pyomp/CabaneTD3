








import { Thunder } from '../../../../../common/entities/attacks/Thunder.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Mesh, MeshBasicMaterial, Scene, Vector3 } from '../../../modules/three.module.js'

const front_vector3 = new Vector3(0, 0, 1)
const vec3 = new Vector3()


const geos = []
export class Thunder_3D {
    static init = (models) => {
        geos.push(models['thunder_1'].geometry)
        geos.push(models['thunder_2'].geometry)
        geos.push(models['thunder_3'].geometry)
    }
    static destroy = () => { geos.length = 0 }

    /**
     * 
     * @param {Scene} scene 
     * @param {Thunder} model 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        model,
        loop_manager,
    ) {
        if (model.target === undefined) return
        const material = new MeshBasicMaterial({ color: model.color, transparent: true })
        const obj3D = new Mesh(geos[Math.random() * 3 | 0], material)

        const update = (dt) => {
            material.opacity -= dt * 2
            if (material.opacity < 0) { dispose(); return true }
        }

        obj3D.position.copy(model.position)
        vec3.copy(model.target.position).sub(model.position)

        const l = vec3.length()
        obj3D.scale.z = l / 10
        vec3.divideScalar(l)

        obj3D.quaternion.setFromUnitVectors(front_vector3, vec3)

        scene.add(obj3D)
        loop_manager.frame_updates.add(update)
        const dispose = () => {
            loop_manager.frame_updates.delete(update)
            scene.remove(obj3D)
            material.dispose()
        }
    }
}



