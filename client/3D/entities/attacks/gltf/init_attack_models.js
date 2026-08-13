







import { Loader_Manager } from '../../../modules/Loader_Manager.js'
import { MeshBasicMaterial } from '../../../modules/three.module.js'

/**
 * 
 * @param {Loader_Manager} loader 
 */
export let init_attacks_3D = async (loader) => {
    const init_attacks_gltf_3D = {}

    const [gltf, texture] = await Promise.all([
        loader.gltf_load_async(new URL('./attacks.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./attacks.svg', import.meta.url).href),
    ])
    const mat = new MeshBasicMaterial({ map: texture })

    gltf.scene.children.forEach((child) => {
        init_attacks_gltf_3D[child.name] = child
        child.material.dispose()
        child.material = mat
    })

    return init_attacks_gltf_3D
}











