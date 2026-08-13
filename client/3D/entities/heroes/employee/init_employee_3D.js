import { Action_3D } from '../../../components/Action_3D.js'
import {
    AnimationMixer,
    Mesh,
    MeshLambertMaterial,
    NearestFilter
} from '../../../modules/three.module.js'


export const init_employee_3D = async (loader) => {

    const [gltf, texture] = await Promise.all([
        loader.gltf_load_async(new URL('./employee.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./employee.svg', import.meta.url).href),
    ])

    const mesh = gltf.scene.getObjectByName('employee')
    const mixer = new AnimationMixer(mesh)


    const employee_model = [mesh, mixer, new Action_3D(mixer, gltf.animations)]

    texture.magFilter = texture.minFilter = NearestFilter
    const mat = new MeshLambertMaterial({ map: texture })
    mesh.traverse((c) => {
        if (c.material) {
            c.material.dispose()
            c.material = mat
        }
    })

    return { 'employee': employee_model }
}
