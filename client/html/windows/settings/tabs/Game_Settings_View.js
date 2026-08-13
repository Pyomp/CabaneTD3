import { createHTMLElement } from '../../../utils/htmlElement.js'
import { createSeparationBar } from '../../../utils/views/separationBar.js'




class CheckBox {
    constructor(parent, obj, prop) {
        const div = createHTMLElement('div', {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px',
            padding: '5px 0'
        }, parent)
        createHTMLElement('span', {}, div, prop)
        const checkbox = createHTMLElement('input', {
            pointerEvents: 'none', justifySelf: 'center', margin: '0 20px',
        }, div, undefined, { type: 'checkbox' })
        const update_checkbox = () => {
            checkbox.checked = obj[prop] == true ? true : false
        }
        update_checkbox()
        obj[`on_${prop}`].add(update_checkbox)
        div.addEventListener('click', () => {
            obj[prop] = !obj[prop]
        })
    }
}

class Bar {
    constructor(parent, obj, prop, min, max, step) {
        const div = createHTMLElement('div', {
            display: 'flex',
            alignItems: 'center',
        }, parent)
        createHTMLElement('span', {
            marginRight: 'auto',
        }, div, prop)

        const range = createHTMLElement('input', { width: '100px', marginLeft: '5px' }, div)
        range.type = 'range'
        range.min = min
        range.max = max
        range.step = step
        const hint = createHTMLElement('span', {
            marginLeft: '2px',
            textAlign: 'end',
            width: '30px',
        }, div)
        const update_view = () => {
            range.value = obj[prop]
            hint.innerHTML = range.value
        }
        update_view()
        obj[`on_${prop}`].add(update_view)

        range.addEventListener('input', () => {
            obj[prop] = +range.value || 0
        })
    }
}

export class Game_Settings_View {

    /**
     * @param {HTMLElement} parent 
     * @param {Third_Controls} third_controls 
     * @param {HTMLElement_Effect} htmlelement_effect 
     * @param {Scene_Shaker} scene_shaker 
     */
    constructor(
        third_controls,
        htmlelement_effect,
        scene_shaker,
    ) {

        this.container = createHTMLElement('div', { padding: '5px' })

        new Bar(this.container, third_controls, 'offset_y', -5, 15, 0.1)
        new Bar(this.container, third_controls, 'sensitivity', 1, 15, 0.1)

        createSeparationBar(this.container)

        new CheckBox(this.container, htmlelement_effect, 'brightness_disabled')
        new CheckBox(this.container, htmlelement_effect, 'blur_disabled')
        new CheckBox(this.container, scene_shaker, 'shaker_disabled')


    }
}