import { Action_3D } from '../../../components/Action_3D.js'
import { AnimationMixer, MeshBasicMaterial, MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'



export const init_magicians_3D = async (loader) => {

    const [gltf, texture_johan, texture_nuraty, texture_susiku] = await Promise.all([
        loader.gltf_load_async(new URL('./magician.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./johan.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./nuraty.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./susiku.svg', import.meta.url).href),
    ])

    const models = {}
    for (const child of gltf.scene.children) {
        if (child.name === 'johan') {
            const mixer = new AnimationMixer(child)
            models['johan'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('johanMesh')

            texture_johan.magFilter = texture_johan.minFilter = NearestFilter
            const children = mesh.children
            children[0].material.dispose()
            children[0].material = new MeshBasicMaterial({ map: texture_johan })
            children[1].material.dispose()
            children[1].material = new MeshLambertMaterial({ map: texture_johan })

        } else if (child.name === 'nuraty') {
            const mixer = new AnimationMixer(child)
            models['nuraty'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('nuratyMesh')

            texture_nuraty.magFilter = texture_nuraty.minFilter = NearestFilter
            const children = mesh.children
            children[0].material.dispose()
            children[0].material = new MeshBasicMaterial({ map: texture_nuraty })
            children[1].material.dispose()
            children[1].material = new MeshLambertMaterial({ map: texture_nuraty })

        } else if (child.name === 'susiku') {
            const mixer = new AnimationMixer(child)
            models['susiku'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('susikuMesh')

            texture_susiku.magFilter = texture_susiku.minFilter = NearestFilter
            const children = mesh.children
            children[0].material.dispose()
            children[0].material = new MeshBasicMaterial({ map: texture_susiku })
            children[1].material.dispose()
            children[1].material = new MeshLambertMaterial({ map: texture_susiku })

        } else {
            child.traverse((c) => { if (c.dispose) c.dispose() })
        }
    }
    return models
}



