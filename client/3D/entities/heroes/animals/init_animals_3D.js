import { Action_3D } from '../../../components/Action_3D.js'
import { AnimationMixer, Mesh, MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'

export const init_animals_3D = async (loader) => {
    /** @type {Object.<string, [Mesh, AnimationMixer, Action_3D]>} */
    const models = {}

    const [gltf, robin_texture, hama_texture, claudette_texture] = await Promise.all([
        loader.gltf_load_async(new URL('./animals.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./robin.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./hama.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./claudette.svg', import.meta.url).href),
    ])

    gltf.scene.children.forEach((child) => {
        if (child.name === 'robin') {
            const mixer = new AnimationMixer(child)
            models['robin'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('robinMesh')
            mesh.material.dispose()
            robin_texture.magFilter = robin_texture.minFilter = NearestFilter
            mesh.material = new MeshLambertMaterial({ map: robin_texture })
        }
        else if (child.name === 'hama') {
            const mixer = new AnimationMixer(child)
            models['hama'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('hamaMesh')
            mesh.material.dispose()
            hama_texture.magFilter = hama_texture.minFilter = NearestFilter
            mesh.material = new MeshLambertMaterial({ map: hama_texture })
        }
        else if (child.name === 'claudette') {
            const mixer = new AnimationMixer(child)
            models['claudette'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('claudetteMesh')
            mesh.material.dispose()
            claudette_texture.magFilter = claudette_texture.minFilter = NearestFilter
            mesh.material = new MeshLambertMaterial({ map: claudette_texture })
        }
        else {
            child.traverse((c) => { if (c.dispose) c.dispose() })
        }
    })
    return models
}