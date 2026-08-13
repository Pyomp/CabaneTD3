






import { DoubleSide, Mesh, MeshBasicMaterial, RepeatWrapping, SphereGeometry } from '../../3D/modules/three.module.js'
import { THR } from '../../3D/Three_Context.js'

export class Shield {
    constructor(pos, offsetY) {
        const mat = mat_model.clone()
        const obj3D = new Mesh(geo, mat)
        THR.scene.add(obj3D)
        obj3D.visible = false
        obj3D.scale.multiplyScalar(offsetY)

        let endTime = 10
        let positif = false
        const update = () => {
            if (obj3D.visible) {
                if (endTime > THR.timestamp_s) {
                    obj3D.position.set(
                        pos.x,
                        pos.y + offsetY,
                        pos.z)
                    obj3D.rotateY(THR.dt_speed_factor / 2)
                    if (positif) { mat.opacity += THR.dt_speed_factor / 2 }
                    else { mat.opacity -= THR.dt_speed_factor / 2 }
                    if (positif && mat.opacity >= 1) {
                        positif = false
                        mat.opacity = 1
                    } else if (!positif && mat.opacity <= 0.3) {
                        positif = true
                        mat.opacity = 0.3
                    }
                } else {
                    obj3D.visible = false
                    resolve()
                    return true
                }
            }
        }

        let resolve = () => { }
        this.setTime = (time) => {
            let resolve_buffer
            const promise = new Promise((resolve_p) => {
                endTime = THR.timestamp_s + time
                obj3D.visible = true
                THR.updates.add(update)
                resolve_buffer = resolve_p
            })
            resolve(promise)
            resolve = resolve_buffer
            return promise
        }
    }
}

const geo = new SphereGeometry(1, 16, 12)
const tex = THR.texture_load("../../../assets/textures/svg_opti/shield.svg")
tex.wrapS = tex.wrapT = RepeatWrapping
tex.repeat.set(3, 2)
const mat_model = new MeshBasicMaterial({
    map: tex,
    depthWrite: false,
    transparent: true,
    opacity: 1,
    side: DoubleSide,
})