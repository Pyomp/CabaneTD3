import {
    PointsMaterial,
    BufferGeometry,
    Points,
    Texture,
    BufferAttribute,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Color,
    AdditiveBlending,
    MultiplyBlending
} from '../../3D/modules/three.module.js'

import { STATE, STATE_WAVE } from "../../appData/gameData/state.js"
import { EQ } from '../../systems/equations_system.js'

import { THR } from '../../3D/Three_Context.js'

import { _heroes } from '../../appData/_heroes.js'
import { heroes_ent } from '../heroes/allies_manager.js'
import { stats_system } from '../../systems/stats_system.js'
import { apply_effect_from_hero } from '../../systems/effects_system.js'

export class Paw {
    constructor(id, pos, target, color) {
        if (!target) { return }

        const obj3D = createParticle(color)
        obj3D.position.copy(pos)

        this.beforeAutoRemove = 0
        let velocity = 8

        const p = obj3D.position
        const t_p = target.position
        const t_half_height = target.model_data.half_height
        const update = () => {
            if (STATE.value !== STATE_WAVE) {
                setTimeout(dispose, 500 + 500 * Math.random())
                return true
            }
            if (!target) { dispose(); return true }

            // movation
            velocity += velocity * THR.dt_speed_factor

            obj3D.lookAt(t_p.x, t_p.y + t_half_height, t_p.z)
            obj3D.translateZ(velocity * THR.dt_speed_factor)

            // reach the enemy
            if (p.z < t_p.z) {
                const damage = EQ.damage(1, _heroes[id])
                target.hp -= damage
                stats_system.add_heroes_damage(id, damage)
                apply_effect_from_hero(id, target)
                dispose()
                return true
            }
        }

        THR.scene.add(obj3D)
        THR.updates.add(update)
        const dispose = () => {
            THR.updates.delete(update)
            THR.scene.remove(obj3D)
        }
    }
}

const createCircleFadeTexture = (size = 20) => {
    let matCanvas = document.createElement('canvas')
    matCanvas.width = matCanvas.height = size
    let ctx = matCanvas.getContext('2d')
    let texture = new Texture(matCanvas)
    const center = size / 2
    let gradient = ctx.createRadialGradient(center, center, 0, center, center, center - 1)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)")
    gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.4)")
    gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.8)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.arc(center, center, center, 0, 2 * Math.PI)
    ctx.fillStyle = gradient
    ctx.fill()

    texture.needsUpdate = true
    return texture
}
const particleTexture = createCircleFadeTexture()
//mat
const particleMaterial1Red = new PointsMaterial({ size: 1, color: 0xff0000, depthWrite: false, map: particleTexture, transparent: true, })
const particleMaterial2Red = new PointsMaterial({ size: 0.5, color: 0xff0000, depthWrite: false, map: particleTexture, transparent: true, })
const particleMaterial1Black = new PointsMaterial({ size: 1, color: 0x000000, depthWrite: false, map: particleTexture, transparent: true, })
const particleMaterial2Black = new PointsMaterial({ size: 0.5, color: 0x000000, depthWrite: false, map: particleTexture, transparent: true, })
const particleMaterial1White = new PointsMaterial({ size: 1, color: 0xffffff, depthWrite: false, map: particleTexture, transparent: true, })
const particleMaterial2White = new PointsMaterial({ size: 0.5, color: 0xffffff, depthWrite: false, map: particleTexture, transparent: true, })
// geo
const particleGeometry1 = new BufferGeometry()
particleGeometry1.setAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0]), 3))
const particleGeometry2 = new BufferGeometry()
particleGeometry2.setAttribute('position', new BufferAttribute(
    new Float32Array([
        0, 0.23, 0,
        0.15, 0.16, 0,
        -0.15, 0.16, 0,
        -0.22, -0.05, -0.05,
    ]), 3))

const createParticle = (color = 0) => {
    let point1, point2
    if (color === "white") {
        point1 = new Points(particleGeometry1, particleMaterial1White)
        point2 = new Points(particleGeometry2, particleMaterial2White)
    } else if (color === "black") {
        point1 = new Points(particleGeometry1, particleMaterial1Black)
        point2 = new Points(particleGeometry2, particleMaterial2Black)
    } else {
        point1 = new Points(particleGeometry1, particleMaterial1Red)
        point2 = new Points(particleGeometry2, particleMaterial2Red)
    }
    point1.add(point2)
    return point1
}


export class Ult_Paw {
    constructor(ent_id, pos, target, color = 0xffffff) {

        let nb = 0
        const send = () => {
            nb++
            new Paw(ent_id, pos, target(), color)
            if (nb < 20) {
                THR.setTimeout(send, .2)
            } else {
                dispose()
            }
        }
        send()

        const power_effect = new Power_Effect(heroes_ent[ent_id].position)
        const dispose = () => {
            power_effect.dispose()
        }
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


const matPowerEffect = new MeshBasicMaterial({ depthWrite: false, vertexColors: true, side: DoubleSide, map: createGradientTex(), transparent: true })

class Power_Effect {
    constructor(pos) {
        const roof = 50, r = 10, h = 20, nbParticles = 100
        const mesh = new Mesh(createEffect(roof / h, r, h, nbParticles), matPowerEffect)
        mesh.scale.multiplyScalar(0.03)
        mesh.position.copy(pos)

        const speedUp = 20

        const update = () => {
            const pos = mesh.geometry.attributes.position.array
            const uv = mesh.geometry.attributes.uv.array
            const dt = THR.dt_speed_factor
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

        THR.updates.add(update)
        THR.scene.add(mesh)
        this.dispose = () => {
            THR.updates.delete(update)
            THR.scene.remove(mesh)
            mesh.geometry.dispose()
        }
    }
}

