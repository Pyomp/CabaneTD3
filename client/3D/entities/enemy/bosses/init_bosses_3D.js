import { bosses_design } from '../../../../../game_design/entities/bosses_design.js'
import { Static_Init_Manager } from '../../../../../utils/Static_Init_Manager.js'
import { Loader_Manager } from '../../../modules/Loader_Manager.js'
import { Mesh, MeshLambertMaterial } from '../../../modules/three.module.js'













const bosses_meshes = {
    cerbere: undefined,
    titan: undefined,
    mino: undefined,
}
const { init, destroy } =
    new Static_Init_Manager(
        /**
         * 
         * @param {Loader_Manager} loader 
         * @returns 
         */
        async (loader) => {
            const default_tex = loader.texture_load(new URL('./bosses.svg', import.meta.url).href)
            const default_mat = new MeshLambertMaterial({ map: default_tex })
            // default_tex.flipY = true
            const dispatcher = {
                [bosses_design.titan.name]: (model) => {
                    bosses_meshes.titan = new Mesh(model.geometry, default_mat)
                    model.material.dispose()
                },
                [bosses_design.mino.name]: (model) => {
                    bosses_meshes.mino = new Mesh(model.geometry, default_mat)
                    model.material.dispose()
                },
                [bosses_design.cerbere.name]: (model) => {
                    bosses_meshes.cerbere = new Mesh(model.geometry, default_mat)
                    model.material.dispose()
                },
            }

            const gltf = await loader.gltf_load_async(new URL('./bosses.glb', import.meta.url).href)
            gltf.scene.children.forEach((child) => {
                const cb = dispatcher[child.name]
                if (cb) cb(child)
                else child.traverse((c) => { if (c.dispose) c.dispose() })
            })
        },
        () => {
            bosses_meshes = {
                cerbere: undefined,
                titan: undefined,
                mino: undefined,
            }
        }
    )


export const Bosses_3D_Init = {
    models: bosses_meshes,
    init: init,
    destroy: destroy,
}
