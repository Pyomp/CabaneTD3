import { DoubleSide, Mesh, MeshBasicMaterial, Object3D } from '../../../modules/three.module.js'
import { destroy_orb_3D, init_orb_3D } from './init_orb_3D.js'

let sphere_geo, energy_geo
const orb_recup = {}
export class Orb_3D extends Mesh {
    static init = async(loader) => {
        [sphere_geo, energy_geo] = await init_orb_3D(loader)
    }

    static destroy = () => {
        destroy_orb_3D()
        sphere_geo = undefined
        energy_geo = undefined
    }

    constructor(color = 0xff4444) {
        const obj3D = orb_recup[color]?.pop()
        if (obj3D !== undefined) return obj3D

        super(
            energy_geo,
            new MeshBasicMaterial({
                side: DoubleSide,
                transparent: true,
                opacity: .6,
                color: color,
            })
        )

        const ball = new Mesh(sphere_geo, new MeshBasicMaterial({ color: color }))
        this.add(ball)
        ball.position.z = -0.26

        this.dispose = () => {
            if (orb_recup[color] === undefined) orb_recup[color] = []
            orb_recup[color].push(obj3D)
        }
    }
}

