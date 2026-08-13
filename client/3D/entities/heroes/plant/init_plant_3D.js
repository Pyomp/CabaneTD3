import { Action_3D } from '../../../components/Action_3D.js'
import { AnimationMixer, MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'





export const init_plant_3D = async (loader) => {
    const [gltf, texture_carna, texture_flavo] = await Promise.all([
        loader.gltf_load_async(new URL('./plants.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./carna.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./flavo.svg', import.meta.url).href),
    ])

    const models = {}

    gltf.scene.children.forEach((child) => {
        if (child.name === 'carna') {
            const mixer = new AnimationMixer(child)
            models['carna'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('carnaMesh')

            texture_carna.magFilter = texture_carna.minFilter = NearestFilter
            mesh.material.dispose()
            mesh.material = new MeshLambertMaterial({ map: texture_carna })

        } else if (child.name === 'flavo') {
            const mixer = new AnimationMixer(child)
            models['flavo'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('flavoMesh')

            texture_flavo.magFilter = texture_flavo.minFilter = NearestFilter
            mesh.material.dispose()
            mesh.material = new MeshLambertMaterial({ map: texture_flavo })

        } else {
            child.traverse((c) => { if (c.dispose) c.dispose() })
        }
    })
    return models
}





