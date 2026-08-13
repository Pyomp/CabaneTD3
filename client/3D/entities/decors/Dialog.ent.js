



import { Vector3 } from '../../3D/modules/three.module.js'
import { THR } from '../../3D/Three_Context.js'
import { strHTMLsafe } from '../../html/outils/htmlElement.js'
import { STYLE } from '../../html/outils/style/STYLE.js'
import { getTarget } from '../../systems/target_system.js'

export class AutoDialog {
    constructor(container = []) {
        this.display = () => {
            if (container.length > 0) {
                const ent = getTarget(container, "random")
                if (ent) dialogDiv(ent, str[Math.floor(Math.random() * str.length)])
                this.timeTemp = THR.time + 7
                this.updateCb = this.wait
            }
        }
        this.updateCb = this.display
        THR.updates.add(this.update)
    }
    update = () => { return this.updateCb() }
    timeTemp = 0
    wait = () => {
        if (this.timeTemp > THR.time) {
        } else { this.updateCb = this.display }
    }
}

const str = [
    `Hello!`,
    `blblblblbl`,
    `KEKW`,
    `PogU`,
    `Pepega`,
    `Ayaya`,
    `POGGERS`,
    `LUL`,
    `OMEGALUL`,
]



const recupDialogDivElem = []
const recupDialogDivText = []
/** 
 * @example
 * if (isDialogDisplayed === false) {  
 *     isDialogDisplayed = true  
 *     dialogDiv(this, "LOL").then(  
 *         () => {  
 *             isDialogDisplayed = false  
 *         }  
 *     )  
 * }
 */
const vec3 = new Vector3()
export function dialogDiv(obj3D, offset_y, txt) {
    let elem = recupDialogDivElem.shift()
    if (elem === undefined) {
        elem = document.createElement('div')
        elem.style.position = "fixed"
        elem.style.bottom = "0"
        elem.style.left = "0"
        elem.style.fontSize = "14px"
        elem.style.backgroundColor = STYLE.var.colorBackground
        elem.style.color = STYLE.var.colorText
        elem.style.borderRadius = "5px"
        elem.style.padding = "2px"
        elem.style.pointerEvents = 'none'
    }
    if (typeof txt === 'string') elem.innerHTML = strHTMLsafe(txt)
    else if (txt) elem.innerHTML = strHTMLsafe(txt[Math.floor(Math.random() * txt.length)])
    else elem.innerHTML = strHTMLsafe(str[Math.floor(Math.random() * str.length)])

    document.body.appendChild(elem)

    let life_time = THR.timestamp_s + 5
    return new Promise(
        (resolve, reject) => {
            const update = () => {
                if (life_time > THR.timestamp_s) {
                    obj3D.getWorldPosition(vec3)
                    vec3.y += offset_y                    
                    vec3.project(THR.camera)
                    const x = (vec3.x * .5 + .5) * THR.canvas.clientWidth - 9
                    const y = -(vec3.y * .5 + .5) * THR.canvas.clientHeight
                    elem.style.transform = `translate(${x}px, ${y}px)`
                } else {
                    elem.remove()
                    recupDialogDivElem.push(elem)
                    resolve()
                    return true
                }
            }
            THR.updates.add(update)
        })
}