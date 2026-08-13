import { Action_3D } from '../../../components/Action_3D.js'
import { AnimationMixer, Mesh, MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'

export const init_cactus_3D = async (loader) => {
    /** @type {Object.<string, [Mesh, AnimationMixer, Action_3D]>} */
    const models = {}

    const [gltf, texture_mama, texture_papa] = await Promise.all([
        loader.gltf_load_async(new URL('./cactus.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./mamaCactus.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./papaCactus.svg', import.meta.url).href),
    ])

    gltf.scene.children.forEach((child) => {
        if (child.name === 'mama') {
            const mixer = new AnimationMixer(child)
            models['mama'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('mamaMesh')
            mesh.material.dispose()
            texture_mama.magFilter = texture_mama.minFilter = NearestFilter
            mesh.material = new MeshLambertMaterial({ map: texture_mama })

        } else if (child.name === 'papa') {
            const mixer = new AnimationMixer(child)
            models['papa'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('papaMesh')
            mesh.material.dispose()
            texture_papa.magFilter = texture_papa.minFilter = NearestFilter
            mesh.material = new MeshLambertMaterial({ map: texture_papa })
        } else {
            child.traverse((c) => { if (c.dispose) c.dispose() })
        }
    })
    return models
}



