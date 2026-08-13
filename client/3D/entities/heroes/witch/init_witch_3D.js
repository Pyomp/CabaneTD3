import { Action_3D } from '../../../components/Action_3D.js'
import { AnimationMixer, MeshBasicMaterial, MeshLambertMaterial, NearestFilter } from '../../../modules/three.module.js'


export const init_witch_3D = async (loader) => {
    const [gltf, texture_cyan, texture_red, texture_green] = await Promise.all([
        loader.gltf_load_async(new URL('./witch.glb', import.meta.url).href),
        loader.texture_load_async(new URL('./cyan.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./red.svg', import.meta.url).href),
        loader.texture_load_async(new URL('./green.svg', import.meta.url).href),
    ])
    const models = {}
    gltf.scene.children.forEach((child) => {
        if (child.name === 'cyan') {
            const mixer = new AnimationMixer(child)
            models['cyan'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('cyanMesh')

            texture_cyan.magFilter = texture_cyan.minFilter = NearestFilter
            const children = mesh.children
            children[0].material.dispose()
            children[0].material = new MeshBasicMaterial({ map: texture_cyan })
            children[1].material.dispose()
            children[1].material = new MeshLambertMaterial({ map: texture_cyan })

        } else if (child.name === 'green') {
            const mixer = new AnimationMixer(child)
            models['green'] = [child, mixer, new Action_3D(mixer, gltf.animations)]
            const mesh = child.getObjectByName('greenMesh')

            texture_green.magFilter = texture_green.minFilter = NearestFilter
            const children = mesh.children
            children[0].material.dispose()
            children[0].material = new MeshBasicMaterial({ map: texture_green })
            children[1].material.dispose()
            children[1].material = new MeshLambertMaterial({ map: texture_green })

        } else if (child.name === 'red') {
            const mixer = new AnimationMixer(child)
            models['red'] = [child, mixer, new Action_3D(mixer, gltf.animations)]

            const mesh = child.getObjectByName('redMesh')

            texture_red.magFilter = texture_red.minFilter = NearestFilter
            const children = mesh.children
            children[0].material.dispose()
            children[0].material = new MeshBasicMaterial({ map: texture_red })
            children[1].material.dispose()
            children[1].material = new MeshLambertMaterial({ map: texture_red })
        } else {
            child.traverse((c) => { if (c.dispose) c.dispose() })
        }

    })
    return models
}

