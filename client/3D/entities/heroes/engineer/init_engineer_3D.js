




import { MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'

export const init_engineer_3D = async (loader) => {
    const [gltf, tex] = await Promise.all([
        loader.gltf_load_async(new URL('./engineer.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./engineer.svg', import.meta.url).href),
    ])
    const model = gltf.scene.getObjectByName('engineer')

    tex.magFilter = tex.minFilter = NearestFilter
    const mat = new MeshLambertMaterial({ map: tex })
    model.traverse((c) => {
        if (c.material) {
            c.material.dispose()
            c.material = mat
        }
    })
    return { engineer: model }
}
