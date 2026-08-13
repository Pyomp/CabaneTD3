import { PI05 } from '../../../../../utils/math/math_utils.js'
import {
    LatheGeometry,
    SphereGeometry,
    Vector2
} from '../../../modules/three.module.js'

let init_nb = 0
let data
export const init_orb_3D = async (loader) => {
    init_nb++
    if (data) return data

    const points = []
    for (let i = 0; i < 1; i += 0.01) {
        points.push(new Vector2(i ** .38 / 2, i))
    }
    const energy_geo = new LatheGeometry(points)
    energy_geo.rotateX(-PI05)
    const sphere_geo = new SphereGeometry(0.2, 20, 16)
    data = [sphere_geo, energy_geo]
    return data
}


export const destroy_orb_3D = () => {
    init_nb--
    if (init_nb === 0) {
        data = undefined
    }
}
