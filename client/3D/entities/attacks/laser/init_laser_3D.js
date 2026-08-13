import { mergeBufferGeometries } from '../../../modules/BufferGeometryUtils.js'
import { PlaneGeometry, Texture } from '../../../modules/three.module.js'





let init_nb = 0
let data
export const init_laser_3D = () => {
    init_nb++
    if (data) return data

    /**
     * @returns {HTMLCanvasElement}
     */
    function generateLaserBodyCanvas() {
        // init canvas
        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        canvas.width = 1
        canvas.height = 64
        // set gradient
        var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(  0,  0,  0,0.1)')
        gradient.addColorStop(0.1, 'rgba(160,160,160,0.3)')
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)')
        gradient.addColorStop(0.9, 'rgba(160,160,160,0.3)')
        gradient.addColorStop(1.0, 'rgba(  0,  0,  0,0.1)')
        // fill the rectangle
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
        // return the just built canvas 
        return canvas
    }

    const texture = new Texture(generateLaserBodyCanvas())
    texture.needsUpdate = true
    const geos = []
    const nPlanes = 12
    for (let i = 0; i < nPlanes; i++) {
        const geo = new PlaneGeometry(1, 1)
        geo.rotateY(Math.PI / 2)
        geo.rotateZ(i / nPlanes * Math.PI)
        geos.push(geo)
    }
    const geometry = mergeBufferGeometries(geos)

    geometry.translate(0, 0, 0.5)
    data = [geometry, texture]
    return data

}

export const destroy_laser_3D = () => {
    init_nb--
    if (init_nb === 0) {
        data = undefined
    }
}



