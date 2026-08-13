
import { strHTMLsafe } from '../../../interface/outils/htmlElement.js'

export class Dialog {
    constructor(obj3D, THR, THREE) {
        const text = document.createElement('div')
        const s = text.style
        s.position = "fixed"
        s.bottom = `0`
        s.left = `0`
        s.fontSize = "40px"
        s.backgroundColor = "rgba(255, 255, 255, 0.7)"
        s.borderRadius = "5px"
        s.padding = "3px"
        s.maxWidth = "300px"
        s.overflowWrap = 'break-word'
        s.color = "black"
        s.zIndex = "10"
        s.transformOrigin = "bottom left"

        const offsetY = obj3D.userData.height ? obj3D.userData.height : 2

        const canvas = THR.canvas
        const camera = THR.camera
        const pCam = camera.position
        const pEnt = obj3D.position
        const vector3 = new THREE.Vector3()

        let scale = 1

        const update = () => {
            vector3.copy(obj3D.position)

            vector3.y += offsetY
            vector3.project(camera)

            const x = (vector3.x * .5 + .5) * canvas.clientWidth - 9
            const y = (vector3.y * -.5 + .5) * canvas.clientHeight

            s.transform = `matrix(${scale}, 0, 0, ${scale}, ${left + x - text.offsetWidth * scale / 2}, ${-(innerHeight - bottom) - (canvas.clientHeight - y)})`
        }

        let left = 0, bottom = 0

        let timeout
        this.setTextAndDisplay = (str = "") => {
            if (!obj3D.parent) return
            return new Promise((resolve) => {
                if (str.constructor === String) text.innerHTML = "" + strHTMLsafe(str)
                else {
                    text.innerHTML = ''
                    text.appendChild(str)
                }

                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    THR.updates.delete(update)
                    text.remove()
                    resolve()
                }, (3 + text.innerHTML.length / 10) * 1000);

                ({ left, bottom } = canvas.getBoundingClientRect())

                THR.updates.add(update)
                document.body.appendChild(text)
            })
        }
        this.dispose = () => {

        }
    }
}
