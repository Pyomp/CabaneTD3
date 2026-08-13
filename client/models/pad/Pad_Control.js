







import { Circle } from '../../../utils/math/Circle.js'
import { Vec2 } from '../../../utils/math/Vec2.js'
import { pointerMove } from '../../html/utils/input_utils.js'

export class Pad_Control {

    constructor(
        baseXY = 80,
        bgEdgeFollow = 60,
    ) {
        this.on_change = () => { }
        this.vec2 = new Vec2()
        this.circle = new Circle()

        let posX = baseXY
        let posY = baseXY

        const background_img = new Image(baseXY * 2, baseXY * 2)
        background_img.src = new URL('./padBase.svg', import.meta.url).href

        const background_style = background_img.style
        background_style.width = `${baseXY * 2}px`
        background_style.height = `${baseXY * 2}px`
        background_style.position = 'fixed'
        background_style.transform = 'translate(-50%, -50%)'
        background_style.top = `${innerHeight - posY}px`
        background_style.left = `${posX}px`
        document.body.appendChild(background_img)


        const pad_img = new Image(baseXY, baseXY)
        // background_img.height = background_img.width = baseXY
        pad_img.src = new URL('./pad.svg', import.meta.url).href

        const pad_style = pad_img.style
        pad_style.width = `${baseXY}px`
        pad_style.height = `${baseXY}px`
        pad_style.position = 'fixed'
        pad_style.transform = 'translate(-50%, -50%)'
        pad_style.top = `${innerHeight - posY}px`
        pad_style.left = `${posX}px`
        pad_style.pointerEvents = 'none'
        document.body.appendChild(pad_img)

        const onMove = (e) => {
            this.vec2.x = e.x - posX
            this.vec2.y = -e.y + posY

            const distPx = this.vec2.length()
            this.vec2.divideScalar(distPx)

            this.circle.angle = Math.atan2(this.vec2.y, this.vec2.x)

            if (distPx > bgEdgeFollow) {
                const r = distPx - bgEdgeFollow
                posX += this.vec2.x * r
                posY -= this.vec2.y * r
                background_style.top = `${posY}px`
                background_style.left = `${posX}px`
                this.circle.radius = 1
            } else {
                this.circle.radius = distPx / bgEdgeFollow
            }
            pad_style.top = `${e.y}px`
            pad_style.left = `${e.x}px`
            this.on_change()
        }

        pointerMove(background_img,
            onMove,
            (e) => {
                posX = e.x
                posY = e.y
                background_style.top = `${posY}px`
                background_style.left = `${posX}px`
                pad_style.top = `${posY}px`
                pad_style.left = `${posX}px`
                this.on_change()
            },
            () => {
                this.circle.radius = 0
                posX = baseXY
                posY = baseXY
                background_style.top = `${window.innerHeight - posY}px`
                background_style.left = `${posX}px`
                pad_style.top = `${window.innerHeight - posY}px`
                pad_style.left = `${posX}px`
                this.on_change()
            }
        )

        addEventListener("resize", () => {
            background_style.top = `${innerHeight - posY}px`
            background_style.left = `${posX}px`
            pad_style.top = `${innerHeight - posY}px`
            pad_style.left = `${posX}px`
        })
    }
}







