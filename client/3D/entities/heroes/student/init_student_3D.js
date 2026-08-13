





export const init_students_3D = async (loader) => {
    const gltf = await loader.gltf_load_async(new URL('./student.glb', import.meta.url).href)
    const model = gltf.scene.getObjectByName('student')
    return model
}








