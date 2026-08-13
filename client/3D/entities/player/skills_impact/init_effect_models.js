import { Static_Init_Manager } from '../../../../../utils/Static_Init_Manager.js'
import { Loader_Manager } from '../../../modules/Loader_Manager.js'
import { DoubleSide, Mesh, MeshBasicMaterial } from '../../../modules/three.module.js'


const models = {
    /** @type {Mesh} */
    stars: undefined,
    /** @type {Mesh} */
    wind: undefined,
}

const { init, destroy } = new Static_Init_Manager(
    /** @param {Loader_Manager} loader */
    async (loader) => {
        const gltf = await loader.gltf_load_async(new URL('./impacts_effect.glb', import.meta.url).href)
        gltf.scene.children.forEach((child) => {
            child.material.dispose()
            if (child.name === 'wind_impact') {
                models.wind = child
                child.material = new MeshBasicMaterial({
                    transparent: true,
                    opacity: 0.7,
                    color: 0xffffff,
                    side: DoubleSide,
                })
            } else if (child.name === 'stars_impact') {
                models.stars = child
                child.material = new MeshBasicMaterial({
                    transparent: true,
                    opacity: 0.7,
                    color: 0xffff44,
                    side: DoubleSide,
                })
            }
        })
    },
    () => {
        models.stars = undefined
        models.wind = undefined
    }
)



export const Impact_Effect_3D_Manager = {
    models: models,
    init: init,
    destroy: destroy,
}




