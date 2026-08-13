import { AdditiveBlending, SpriteMaterial, Texture } from '../../../modules/three.module.js'








export const init_spark_3D = () => {
    const createCircleFadeTexture = (color = [255, 0, 0], size = 5) => {
        let matCanvas = document.createElement('canvas')
        matCanvas.width = matCanvas.height = size
        let ctx = matCanvas.getContext('2d')
        let texture = new Texture(matCanvas)
        const center = size / 2
        let gradient = ctx.createRadialGradient(center, center, 0, center, center, center - 1)
        gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`)
        gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)
        ctx.arc(center, center, center, 0, 2 * Math.PI)
        ctx.fillStyle = gradient
        ctx.fill()

        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0)")
        ctx.arc(center, center, center, 0, 2 * Math.PI)
        ctx.fillStyle = gradient
        ctx.fill()

        texture.needsUpdate = true
        return texture
    }

    const plasma_mats = {
        red: new SpriteMaterial({ transparent: true, depthWrite: false, blending: AdditiveBlending, side: 0.5, map: createCircleFadeTexture(), }), //map: new THREE.TextureLoader().load(sparkRedSVG), }),
        blue: new SpriteMaterial({ transparent: true, depthWrite: false, blending: AdditiveBlending, side: 0.5, map: createCircleFadeTexture([0, 0, 255]), }),
        green: new SpriteMaterial({ transparent: true, depthWrite: false, blending: AdditiveBlending, side: 0.5, map: createCircleFadeTexture([0, 255, 0]), }),
        violet: new SpriteMaterial({ transparent: true, depthWrite: false, blending: AdditiveBlending, side: 0.5, map: createCircleFadeTexture([255, 0, 255]), }),
        yellow: new SpriteMaterial({ transparent: true, depthWrite: false, blending: AdditiveBlending, side: 0.5, map: createCircleFadeTexture([255, 255, 0]), }),
    }

    return plasma_mats
}



