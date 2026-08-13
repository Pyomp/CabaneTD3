import {
    Color,
    DynamicDrawUsage,
    InstancedMesh,
    MeshLambertMaterial,
} from "../../../modules/three.module.js"


export const init_mobs_3D = async (loader) => {
    const color = new Color(1, 1, 1)
    const default_tex = loader.texture_load(new URL('./mobs.svg', import.meta.url).href, 128, 128)
    const default_mat = new MeshLambertMaterial({ map: default_tex })
    const mobs_instanced_meshes = {}
    const dispatcher = {
        bonhomme: (model) => {
            const geo = model.geometry
            const instanced_mesh = new InstancedMesh(geo, default_mat, 1000)
            instanced_mesh.instanceMatrix.setUsage(DynamicDrawUsage)
            for (let i = 0; i < 1000; i++) instanced_mesh.setColorAt(i, color)

            mobs_instanced_meshes['bonhomme'] = instanced_mesh
            instanced_mesh.count = 0

            instanced_mesh.onBeforeRender = () => {
                if (instanced_mesh.count !== 0)
                    instanced_mesh.instanceMatrix.needsUpdate = true
            }
            model.material.dispose()
        },
        sheep: (model) => {
            const instanced_mesh = new InstancedMesh(model.geometry, default_mat, 1000)
            instanced_mesh.instanceMatrix.setUsage(DynamicDrawUsage)
            for (let i = 0; i < 1000; i++) instanced_mesh.setColorAt(i, color)

            mobs_instanced_meshes['sheep'] = instanced_mesh
            instanced_mesh.count = 0

            instanced_mesh.onBeforeRender = () => {
                if (instanced_mesh.count !== 0)
                    instanced_mesh.instanceMatrix.needsUpdate = true
            }
            model.material.dispose()
        },
        champ: (model) => {
            const instanced_mesh = new InstancedMesh(model.geometry, default_mat, 1000)
            instanced_mesh.instanceMatrix.setUsage(DynamicDrawUsage)
            for (let i = 0; i < 1000; i++) instanced_mesh.setColorAt(i, color)

            mobs_instanced_meshes['champ'] = instanced_mesh
            instanced_mesh.count = 0

            instanced_mesh.onBeforeRender = () => {
                if (instanced_mesh.count !== 0)
                    instanced_mesh.instanceMatrix.needsUpdate = true
            }
            model.material.dispose()
        },
        slime: (model) => {
            const instanced_mesh = new InstancedMesh(model.geometry, default_mat, 1000)
            instanced_mesh.instanceMatrix.setUsage(DynamicDrawUsage)
            for (let i = 0; i < 1000; i++) instanced_mesh.setColorAt(i, color)

            mobs_instanced_meshes['slime'] = instanced_mesh
            instanced_mesh.count = 0

            instanced_mesh.onBeforeRender = () => {
                if (instanced_mesh.count !== 0)
                    instanced_mesh.instanceMatrix.needsUpdate = true
            }
            model.material.dispose()
        },
        yombi: (model) => {
            const instanced_mesh = new InstancedMesh(model.geometry, default_mat, 1000)
            instanced_mesh.instanceMatrix.setUsage(DynamicDrawUsage)
            for (let i = 0; i < 1000; i++) instanced_mesh.setColorAt(i, color)
            mobs_instanced_meshes['yombi'] = instanced_mesh
            instanced_mesh.count = 0

            instanced_mesh.onBeforeRender = () => {
                if (instanced_mesh.count !== 0)
                    instanced_mesh.instanceMatrix.needsUpdate = true
            }
            model.material.dispose()
        },
    }

    const gltf = await loader.gltf_load_async(new URL('./mobs.glb', import.meta.url).href)
    gltf.scene.children.forEach((child) => {
        const cb = dispatcher[child.name]
        if (cb) cb(child)
        else child.traverse((c) => { if (c.dispose) c.dispose() })
    })
    return mobs_instanced_meshes
}




