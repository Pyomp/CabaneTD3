import { _keyCode } from '../../appData/_keyCode.js'
import { PLAYER } from '../../entities/player/PLAYER.js'
import { keycode } from '../../management/Input_Manager.js'

import { THR } from '../Three_Context.js'
import { Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from '../modules/three.module.js'

import { interactionCANVAS } from './tex/bundle_svg.js'

import { KEYCODE_INTERACT } from '../../appData/constants.js.js'

const geo = new PlaneGeometry()
geo.rotateX(-Math.PI / 2)
geo.translate(0, 0.01, 0)
geo.scale(3, 1, 3)

const tex = new Texture()
interactionCANVAS().then((canvas) => {
    tex.image = canvas
    tex.needsUpdate = true
})
const mat = new MeshBasicMaterial({ transparent: true, map: tex })

const plane_mesh = new Mesh(geo, mat)

const objs = []
const cbs = []
let next_update = 0
let current_obj
const update = () => {
    if (next_update < THR.timestamp) {
        next_update = THR.timestamp + 0.1
        const p = PLAYER.p

        let min_dist = 16
        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i]

            const obj_p = obj.position
            const dist = (obj_p.x - p.x) ** 2 + (obj_p.z - p.z) ** 2
            if (dist < min_dist) {
                obj.add(plane_mesh)
                min_dist = dist
                current_obj = obj
                keycode.dispatcher.down[KEYCODE_INTERACT] = cbs[i]
            }
        }
    }
}

PLAYER.updates.add(update)

export const INTERACTION = {
    add_interaction: (obj3D, cb) => {
        objs.push(obj3D)
        cbs.push(cb)
    },
    delete_interaction: (obj3D) => {
        const index = objs.indexOf(obj3D)
        if (index !== -1) {
            objs.splice(index, 1)
            cbs.splice(index, 1)
        }
    }
}










