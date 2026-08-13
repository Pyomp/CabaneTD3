import { BufferAttribute, BufferGeometry, Points, PointsMaterial, Texture } from '../../../modules/three.module.js'




export const init_paw_3D = () => {

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

    return {
        red: createParticle('red'),
        black: createParticle('black'),
        white: createParticle('white'),
    }
}