import { Paw_Ult } from '../../../../../common/entities/attacks/Paw_Ult.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    Texture,
    Vector3
} from '../../../modules/three.module.js'

let matPowerEffect
const init = () => {
    const createGradientTex = (size = 100) => {
        let matCanvas = document.createElement('canvas')
        matCanvas.width = size
        matCanvas.height = 1
        let ctx = matCanvas.getContext('2d')
        let texture = new Texture(matCanvas)
        // Create gradient
        var grd = ctx.createLinearGradient(0, 0, size, 0)
        grd.addColorStop(0, "rgba(255,255,255,1)")
        grd.addColorStop(0.4, "rgba(255,255,255,1)")
        grd.addColorStop(1, "rgba(255,255,255,0)")

        // Fill with gradient
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, size, 1)
        texture.needsUpdate = true
        return texture
    }
    matPowerEffect = new MeshBasicMaterial({
        depthWrite: false,
        vertexColors: true,
        side: DoubleSide,
        map: createGradientTex(),
        transparent: true
    })
}

export class Paw_Ult_3D {

    static init = init
    static destroy = () => { matPowerEffect = undefined }

    /**
     * 
     * @param {Scene} scene 
     * @param {Paw_Ult} model 
     * @param {Loop_Manager} loop_manager 
     * @param {Vector3} pos 
     */
    constructor(
        scene,
        model,
        loop_manager,
    ) {

        const power_effect = new Power_Effect(scene, model.position)

        loop_manager.frame_updates.add(power_effect.update)

        const dispose = () => {
            loop_manager.frame_updates.delete(power_effect.update)
            power_effect.dispose()
        }
        model.on_dispose = dispose

    }
}

const createFireParticle = (x = 0, y = 0, z = 0) => {
    const v = [
        Math.random() - 1 + x, Math.random() - 1 + y, Math.random() * 4 - 2 + z,
        Math.random() + 1 + x, Math.random() - 1 + y, Math.random() * 4 - 2 + z,

        Math.random() - 1.5 + x, Math.random() + y, Math.random() * 5 - 2.5 + z,
        Math.random() + 1.5 + x, Math.random() + y, Math.random() * 5 - 2.5 + z,

        Math.random() - 1 + x, Math.random() + 1 + y, Math.random() * 4 - 2 + z,
        Math.random() + 1 + x, Math.random() + 1 + y, Math.random() * 4 - 2 + z,
    ]

    return [
        v[0], v[1], v[2],
        v[3], v[4], v[5],
        v[6], v[7], v[8],

        v[3], v[4], v[5],
        v[6], v[7], v[8],
        v[9], v[10], v[11],

        v[6], v[7], v[8],
        v[9], v[10], v[11],
        v[12], v[13], v[14],

        v[9], v[10], v[11],
        v[12], v[13], v[14],
        v[15], v[16], v[17],
    ]
}

const createEffect = (margin = 15, r_p = 10, h_p = 20, nb = 1000) => {
    const color = new Color()

    let verticesTab = []
    let colorsTab = []
    let uvTab = []

    for (let i = 0; i < nb; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.sqrt(Math.random()) * r_p
        const h = Math.random() * h_p

        verticesTab = verticesTab.concat(
            createFireParticle(
                r * Math.sin(angle) * margin,
                h * margin,
                r * Math.cos(angle) * margin))

        color.setHSL(Math.random() * 0.1, 1, 0.6)
        for (let i = 0; i < 12; i++) {
            colorsTab = colorsTab.concat([color.r, color.g, color.b])
            uvTab.push(1); uvTab.push(1)
        }
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(verticesTab), 3))
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colorsTab), 3))
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvTab), 2))
    return geometry
}

const roof = 50, r = 10, h = 20, nbParticles = 100
class Power_Effect {
    constructor(
        scene,
        pos,
    ) {

        const mesh = new Mesh(createEffect(roof / h, r, h, nbParticles), matPowerEffect)
        mesh.scale.multiplyScalar(0.03)
        mesh.position.copy(pos)

        const speedUp = 20

        this.update = (dt) => {
            const pos = mesh.geometry.attributes.position.array
            const uv = mesh.geometry.attributes.uv.array
            mesh.rotateY(dt)
            for (let i = 0; i < pos.length / 36; i++) {
                pos[i * 36 + 34] = (pos[i * 36 + 34] + dt * speedUp)
                pos[i * 36 + 31] = (pos[i * 36 + 31] + dt * speedUp)
                if (pos[i * 36 + 31] > roof || pos[i * 36 + 34] > roof) {
                    pos[i * 36 + 34] -= roof
                    pos[i * 36 + 31] -= roof
                    for (let j = 0; j < 10; j++) {
                        pos[i * 36 + (j * 3 + 1)] = (pos[i * 36 + (j * 3 + 1)] + dt * speedUp) - roof
                    }
                } else {
                    for (let j = 0; j < 10; j++) {
                        pos[i * 36 + (j * 3 + 1)] = (pos[i * 36 + (j * 3 + 1)] + dt * speedUp)
                    }
                }
                const opacity = pos[i * 36 + 34] / roof
                for (let j = 0; j < 24; j++) {
                    uv[i * 24 + j] = opacity
                }
            }
            mesh.geometry.attributes.uv.needsUpdate = true
            mesh.geometry.attributes.position.needsUpdate = true
        }

        scene.add(mesh)
        this.dispose = () => {
            scene.remove(mesh)
            mesh.geometry.dispose()
        }
    }
}

