import { MeshToonMaterial, Skeleton, SkinnedMesh } from "../../../modules/three.module.js"








let tex, geometry, material, bones, animations
const init_puwu_3D = async (loader_manager) => {
    tex = loader_manager.texture_load(new URL('./puwu.svg', import.meta.url).href)
    tex.flipY = true
    material = new MeshToonMaterial({ map: tex })
    const gltf = await loader_manager.gltf_load_async(new URL('./puwu.glb', import.meta.url).href)
    animations = gltf.animations
        .filter(a => a.name.substring(0, 4) === 'puwu')

    animations.forEach(a => { a.name = a.name.substring(4) })

    const group = gltf.scene.getObjectByName('puwu')
    bones = group.children[0]
    geometry = group.children[1].geometry
}

export class Puwu {
    static init = init_puwu_3D
    static destroy = () => {
        tex = undefined
        geometry = undefined
        material = undefined
        bones = undefined
    }

    mesh = new SkinnedMesh(geometry, material)
    animations = animations

    constructor() {
        const bones_array = []
        bones_array.push(bones)
        const rec = (bone) => {
            for (const child of bone.children) {
                bones_array.push(child)
                if (child.children.length !== 0) rec(child)
            }
        }
        rec(bones)
        
        const skeleton = new Skeleton(bones_array)

        const rootBone = skeleton.bones[0]
        this.mesh.add(rootBone)
        
        this.mesh.bind(skeleton)

        this.set_weapon = (weapon_mesh) => {
            const weapon_bone = this.mesh.getObjectByName('weapon')
            weapon_bone.clear()
            weapon_bone.add(weapon_mesh)
        }
    }
}

