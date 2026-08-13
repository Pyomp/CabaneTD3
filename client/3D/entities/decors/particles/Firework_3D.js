import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    Points,
    PointsMaterial,
    Scene,
    Texture,
    Vector3,
} from '../../../modules/three.module.js'




const params = {
    launchPos: { x: 0, y: 0, z: 0 },
    launchArea: { x: 10, y: 0, z: 10 },// random pos of launch
    launchSpeed: 5,
    nbParticles: 1000,

    // height where firework explode with random "explodeHeightArea"
    explodeHeight: 7,
    explodeHeightArea: 2,
    explodeDistance: 7,
    explodeSpeed: .5,
    explodeFadeOut: 1,// in multiplication with explodeSpeed

    particleSize: 0.7,
}

export class Firework_3D {
    static state = { launch1: 0, launch: 1, explode1: 2, explode: 3 };

    launchPoint = null;
    explodePoints = null;
    geometry = null;

    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     * @param {params} params_p 
     */
    constructor(scene, loop_manager, params_p = params) {

        this.params = params_p
        this.scene = scene
        this.materialCenter = new PointsMaterial({
            size: params_p.particleSize / 1.5,
            color: 0xffffff,
            map: tex,
            transparent: true,
            depthTest: false,
        })
        this.material = new PointsMaterial({
            size: params_p.particleSize,
            color: 0xffffff, // tenter de l'enlever
            opacity: 1,
            vertexColors: true,
            map: tex,
            transparent: true,
            depthTest: false,
        })
        this.destLaunch = new Vector3(params_p.launchPos.x + (Math.random() - 0.5) * this.params.launchArea.x,
            params_p.launchPos.y + (Math.random() - 0.5) * params_p.explodeHeightArea,
            params_p.launchPos.z + (Math.random() - 0.5) * this.params.launchArea.z)
        this.destExplode = new Float32Array(params_p.nbParticles * 3)

        this.state = Firework_3D.state.launch1

        const launch1 = () => {
            this.geometry = new BufferGeometry()
            this.geometry.setAttribute('position', new BufferAttribute(
                new Float32Array([this.destLaunch.x, this.destLaunch.y, this.destLaunch.z,]), 3))
            this.geometry.setAttribute('color', new BufferAttribute(new Float32Array([1, 1, 1]), 3))

            this.launchPoint = new Points(this.geometry, this.material)
            let whitePoints = new Points(this.geometry, this.materialCenter)
            this.launchPoint.add(whitePoints)

            this.scene.add(this.launchPoint)
            this.state = Firework_3D.state.launch
        }
        const launch = (dt) => {
            const pos = this.geometry.attributes.position.array
            pos[1] += this.params.launchSpeed * dt
            this.geometry.attributes.position.needsUpdate = true
            if (pos[1] >= params.launchPos.y + params.explodeHeight) {
                this.state = Firework_3D.state.explode1
            }
        }
        const explode1 = () => {
            this.scene.remove(this.launchPoint)
            this.launchPoint.children[0].geometry.dispose()
            this.launchPoint.geometry.dispose()

            const positions = new Float32Array(this.params.nbParticles * 3)
            const colors = new Float32Array(this.params.nbParticles * 3)
            const from = new Vector3(this.destLaunch.x, this.destLaunch.y + this.params.explodeHeight, this.destLaunch.z)
            const to = new Vector3()
            const color = new Color()

            for (var i = 0; i < this.params.nbParticles; i++) {
                from.toArray(positions, i * 3)

                const phi = (Math.random() - 0.5) * Math.PI
                const theta = (Math.random() - 0.5) * 2 * Math.PI
                const r = this.params.explodeDistance * (0.7 + 0.3 * Math.random())
                to.x = r * Math.cos(theta) * Math.cos(phi) + from.x
                to.y = r * Math.cos(theta) * Math.sin(phi) + from.y
                to.z = r * Math.sin(theta) + from.z

                to.toArray(this.destExplode, i * 3)

                color.setHSL(.1 + Math.random() * .8, 0.5, 0.5)
                color.toArray(colors, i * 3)
            }
            this.geometry = new BufferGeometry()
            this.geometry.setAttribute('position', new BufferAttribute(positions, 3))
            this.geometry.setAttribute('color', new BufferAttribute(colors, 3))

            this.explodePoints = new Points(this.geometry, this.material)
            let whitePoints = new Points(this.geometry, this.materialCenter)
            this.explodePoints.add(whitePoints)

            this.scene.add(this.explodePoints)
            this.state = Firework_3D.state.explode
        }

        const explode = (dt) => {
            const pos = this.geometry.attributes.position.array
            for (var i = 0; i < this.params.nbParticles; i++) {
                pos[i * 3] += (this.destExplode[i * 3] - pos[i * 3]) * this.params.explodeSpeed * dt
                pos[i * 3 + 1] += (this.destExplode[i * 3 + 1] - pos[i * 3 + 1]) * this.params.explodeSpeed * dt
                pos[i * 3 + 2] += (this.destExplode[i * 3 + 2] - pos[i * 3 + 2]) * this.params.explodeSpeed * dt
            }
            this.geometry.attributes.position.needsUpdate = true
            this.materialCenter.opacity -= this.params.explodeSpeed * this.params.explodeFadeOut / 2 * dt
            this.material.opacity -= this.params.explodeSpeed * this.params.explodeFadeOut * dt

            if (this.material.opacity <= 0) {
                loop_manager.frame_updates.delete(update)
                this.scene.remove(this.explodePoints)
                this.explodePoints.children[0].geometry.dispose()
                this.explodePoints.geometry.dispose()
                return true
            }
        }

        const behaviors = [launch1, launch, explode1, explode]

        const update = (dt) => {
            behaviors[this.state](dt)
        }

        loop_manager.frame_updates.add(update)
    }
}


function createCircleFadeTexture(size) {
    let matCanvas = document.createElement('canvas')
    matCanvas.width = matCanvas.height = size
    let ctx = matCanvas.getContext('2d')
    // create texture object from canvas.
    let texture = new Texture(matCanvas)
    // Draw a circle
    const center = size / 2
    let gradient = ctx.createRadialGradient(center, center, 0, center, center, center - 1)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.arc(center, center, center, 0, 2 * Math.PI)
    ctx.fillStyle = gradient
    ctx.fill()

    texture.needsUpdate = true
    return texture
}

const tex = createCircleFadeTexture(32)