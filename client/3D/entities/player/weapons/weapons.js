import { Static_Init_Manager } from '../../../../../utils/Static_Init_Manager.js'
import { Loader_Manager } from '../../../modules/Loader_Manager.js'
import { MeshLambertMaterial } from '../../../modules/three.module.js'

export const weapon_models = {
    baseball_bat: undefined
}

const { init, destroy } = new Static_Init_Manager(
    /** @param {Loader_Manager} loader */
    async (loader) => {
        const tex = loader.texture_load(new URL('./weapons.svg', import.meta.url).href)
        const mat = new MeshLambertMaterial({ map: tex })

        const gltf = await loader.gltf_load_async(new URL('./weapons.glb', import.meta.url).href)

        const init_dispatcher = {
            'baseball_bat': () => {
                const obj = gltf.scene.children.find(a => a.name === 'baseball_bat')
                obj.material.dispose()
                obj.material = mat
                weapon_models.baseball_bat = obj
            }
        }

        for (const child of gltf.scene.children) {
            init_dispatcher[child.name]?.()
        }
    },
    () => {
        weapon_models.baseball_bat = undefined
    }
)

export const Weapon_3D = {
    models: weapon_models,
    init: init,
    destroy: destroy
}








