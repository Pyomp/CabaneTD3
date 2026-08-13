
import {
    Group,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    TextureLoader
} from '../../3D/modules/three.module.js'
import { THR } from '../../3D/Three_Context.js'
import { EQ } from '../../systems/equations_system.js'

const recup = []
let texture
const init = () => {
    texture = new TextureLoader().load('./shockwave.svg')
}

export class Shockwave {
    static init = init
    static planeGeometry = new PlaneGeometry(0.1, 0.1);
    constructor(color = 0xff0000, maxRadius = 400) {
        this.wave = 2
        this.obj3D = recup.pop()
        if (this.obj3D === undefined) {
            this.obj3D = new Group()
            for (let i = 0; i < 3; i++) {
                this.obj3D.add(new Mesh(
                    Shockwave.planeGeometry,
                    new MeshBasicMaterial({ map: texture, transparent: true, color: color, depthWrite: false })))
                this.obj3D.children[i].visible = false
            }
            this.obj3D.rotateX(-Math.PI / 2)
            this.obj3D.translateY(0.1)
        }
        for (let i = 0; i < 3; i++) {
            this.obj3D.children[i].material.color.setHex(color)
        }
        this.obj3D.children[0].visible = true

        this.nextWave = EQ.waitTime(0.2)
        this.update = () => {
            if (this.wave > 0 && this.nextWave < THR.time) {
                this.wave--
                this.nextWave = EQ.waitTime(0.2)
                this.obj3D.children[2 - this.wave].visible = true
            }
            let nbNotVisible = 0
            for (let i = 0; i < this.obj3D.children.length; i++) {
                if (this.obj3D.children[i].visible === false) {
                    nbNotVisible++
                    continue
                }
                const ratio = (this.obj3D.children[i].material.opacity + 0.5) * maxRadius / 2
                this.obj3D.children[i].scale.addScalar(THR.deltaTimeIngame * ratio)
                this.obj3D.children[i].material.opacity = 1 - (this.obj3D.children[i].scale.x / maxRadius)
                if (this.obj3D.children[i].material.opacity <= 0) {
                    this.obj3D.children[i].visible = false
                    this.obj3D.children[i].material.opacity = 1
                    this.obj3D.children[i].scale.set(1, 1, 1)
                }
            }
            if (nbNotVisible === 3) {
                THR.scene.remove(this.obj3D)
                recup.push(this.obj3D)
                return true
            }
        }
        THR.scene.add(this.obj3D)
        THR.updates.add(this.update)
    }
}