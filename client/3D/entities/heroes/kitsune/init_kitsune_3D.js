import { Action_3D } from '../../../components/Action_3D.js'
import { AnimationMixer, MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'

export const init_kitsunes_3D = async (loader) => {
    const models = {}

    const [gltf, texture_fire, texture_water, texture_thunder] = await Promise.all([
        loader.gltf_load_async(new URL('./kitsune.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./kitsune_fire.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./kitsune_water.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./kitsune_thunder.svg', import.meta.url).href)
    ])

    gltf.scene.children.forEach((child) => {
        if (child.name === 'fireKitsune') {
            const mixer = new AnimationMixer(child)
            models['kitsune_fire'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('fireKitsuneMesh')

            texture_fire.magFilter = texture_fire.minFilter = NearestFilter
            mesh.material.dispose()
            mesh.material = new MeshLambertMaterial({ map: texture_fire })

        } else if (child.name === 'waterKitsune') {
            const mixer = new AnimationMixer(child)
            models['kitsune_water'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('waterKitsuneMesh')

            texture_water.magFilter = texture_water.minFilter = NearestFilter
            mesh.material.dispose()
            mesh.material = new MeshLambertMaterial({ map: texture_water })


        } else if (child.name === 'thunderKitsune') {
            const mixer = new AnimationMixer(child)
            models['kitsune_thunder'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('thunderKitsuneMesh')

            texture_thunder.magFilter = texture_thunder.minFilter = NearestFilter
            mesh.material.dispose()
            mesh.material = new MeshLambertMaterial({ map: texture_thunder })
        } else {
            child.traverse((c) => { if (c.dispose) c.dispose() })
        }
    })
    return models
}
