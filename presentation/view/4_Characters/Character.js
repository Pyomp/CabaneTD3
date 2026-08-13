import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene } from '../../../client/3D/modules/three.module.js'
import { OpacityAnimation } from '../../utils/animations/opacityAnimation.js'
import { createHTMLElement } from '../../utils/htmlElement.js'
import { Description } from './Description.js'






export class Character {
    constructor(
        w, h, offset_margin,
        mesh,
        description_parent,
        description,
        canvas_parent,
    ) {
        this.camera = new PerspectiveCamera(45, 1, 0.1, 50)
        this.camera.position.set(0, 1.8, 3)
        this.camera.lookAt(0, 1.2, 0)

        this.canvas = document.createElement("canvas")
        this.canvas.style.transformOrigin = 'center center'

        this.canvas.width = w
        this.canvas.height = h
        this.canvas.style.width = `${w}px`
        this.canvas.style.height = `${h}px`
        this.canvas.style.marginLeft = `-${offset_margin}px`
        canvas_parent?.appendChild(this.canvas)

        this.ctx = this.canvas.getContext('2d')

        this.scene = new Scene()
        this.scene.add(mesh)

        this.mesh = mesh

        const directional_light = new DirectionalLight(0xffffff, .8)
        directional_light.position.set(20, 7, 10)
        this.scene.add(directional_light)
        const ambient = new AmbientLight(0xffffff, .5)
        this.scene.add(ambient)

        const description_container = createHTMLElement('div', {
            position: 'absolute',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
        })

        new Description(description_container, description)

        const { display, close } = OpacityAnimation(description_container, description_parent, .5)
        this.description_display = display
        this.description_close = close
    }
}








