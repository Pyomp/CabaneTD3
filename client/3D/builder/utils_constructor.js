


import { GLTFLoader } from "../modules/GLTFLoader.js"

import {
    ObjectLoader,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    DataTexture,
    MeshToonMaterial,
    LuminanceFormat,
    NearestFilter,
    LoopPingPong,
    LoopRepeat,
    Scene,
    Texture,
    DirectionalLight,
} from '../modules/three.module.js'
import * as pako from '../../../utils/pako.js'


const a = document.createElement('a')
document.body.appendChild(a)

export const download = async (name) => {
    const data = await get_data(name)

    const merge = JSON.stringify(data)
    const compressed = pako.deflate(merge)
    console.log(compressed.length)
    const blob = new Blob([compressed], { type: 'application/octet-binary' })

    const url = URL.createObjectURL(blob)

    a.href = url
    a.download = name
    a.click()
}

// 
export const get_data = async (name) => {

    const gltf = await get_gltf(`./${name}.glb`)
    convert_material(gltf.scene)
    save_position_in_userData(gltf.scene)
    return {
        obj3D: gltf.scene.toJSON(),
        animations: animations_json(gltf.animations),

        module_js: Array.from(
            new Uint8Array(
                (await (await fetch(`./n_bundle_module.js`))
                    .arrayBuffer()))),

    }
}



export const get_gltf = (url) => {
    return new Promise((resolve) => {
        new GLTFLoader().load(
            url,
            (gltf) => {
                resolve({
                    scene: gltf.scene,
                    scenes: gltf.scenes,
                    animations: gltf.animations,
                    cameras: gltf.cameras,
                    asset: gltf.asset,
                    parser: gltf.parser,
                    userData: gltf.userData
                })
            },
            (e) => { },//onProgress, 
            (e) => { console.log(e) })//onError)
    })
}

const gradientMap = new DataTexture(new Uint8Array([100, 170, 250]), 3, 1, LuminanceFormat)
gradientMap.minFilter = NearestFilter
gradientMap.magFilter = NearestFilter
gradientMap.generateMipmaps = false

export const convert_material = (scene) => {
    scene.traverse((child) => {
        if (child.material) {
            const oldMat = child.material
            if (child.material.name === 'standard') {
                child.material = new MeshStandardMaterial({ name: child.material.name })
            } else if (child.material.name.includes('basic')) {
                child.material = new MeshBasicMaterial({ name: child.material.name })
            } else if (child.material.name.includes('phong')) {
                child.material = new MeshPhongMaterial({ name: child.material.name })
            } else if (child.material.name.includes('toon')) {
                child.material = new MeshToonMaterial({ name: child.material.name, gradientMap: gradientMap })
            } else {
                child.material = new MeshLambertMaterial({ name: child.material.name })
            }
            oldMat.dispose()
        }
    })
}

const save_position_in_userData = (scene) => {
    scene.traverse((c) => {
        if (c.position) {
            c.userData.position = c.position.toArray()
            c.position.set(0, 0, 0)
        }
    })
}

const animations_json = (animations) => {
    return animations.filter(a => a.name.includes(name))
        .map(a => {
            a.optimize()
            a.name = a.name.replace(name, '').trim().toLowerCase()
            return a.toJSON()
        })
}



