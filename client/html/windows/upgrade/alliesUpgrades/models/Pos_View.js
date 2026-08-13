









import { Upgrade_System } from '../../../../../../common/systems/Upgrade_System.js' 
import { heroes_design } from '../../../../../../game_design/entities/heroes_design.js'
import { OpacityAnimation } from '../../../../utils/animations/opacityAnimation.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { STYLE } from '../../../../utils/style/Style.js'

let cb = undefined
let display_pos_view = undefined
const init = () => {
    const pos_view = createHTMLElement('div', {
        position: 'fixed',
        background: STYLE.var.colorBackground,
        zIndex: '1',
    })

    const { display, close } = OpacityAnimation(pos_view, document.body)
    display_pos_view = (x, y) => {
        pos_view.style.left = x + 'px'
        pos_view.style.top = y + 'px'
        const on_pointer_outside = (e) => {
            const path = e.composedPath()
            if (!path.includes(pos_view)) {
                removeEventListener('pointerdown', on_pointer_outside, { capture: true })
                close()
            }
        }
        addEventListener('pointerdown', on_pointer_outside, { capture: true })
        display()
    }
    const line_1 = createHTMLElement('div', { display: 'flex' }, pos_view)
    const line_2 = createHTMLElement('div', { display: 'flex' }, pos_view)
    createHTMLElement('div', {
        background: 'radial-gradient( rgba(255,0,0,0) 30%, rgba(255,0,0,1) 50%,rgba(255,0,0,0) 70%)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '40px', height: '40px',
        color: 'red'
    }, line_1, 'N').addEventListener('click', () => {
        cb(-1)
        close()
    })

    for (let i = 1; i < 13; i++) {
        const div = createHTMLElement('div', {
            background: 'radial-gradient( rgba(255,255,255,0) 30%, rgba(255,255,255,1) 50%,rgba(255,255,255,0) 70%)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '40px', height: '40px',
        }, i < 6 ? line_1 : line_2)
        div.innerHTML = i
        if (i === 9) div.id = 'tuto_1_3'
        div.addEventListener('click', () => {
            cb(i - 1)
            close()
        })
    }
}

const destroy = () => {
    cb = undefined
    display_pos_view = undefined
}

export class Pos_View {
    static init = init
    static destroy = destroy

    /**
     * 
     * @param {string} hero_name 
     * @param {Upgrade_System} upgrade_system 
     */
    constructor(
        hero_name,
        heroes_used_data,
        upgrade_system,
    ) {
        const hero_id = heroes_design[hero_name].id

        this.container = createHTMLElement('div', {
            background: 'radial-gradient( rgba(255,255,255,0) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 70%)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '40px', height: '40px',
        }, undefined)

        if (hero_name === 'johan') this.container.id = 'tuto_1_2'

        const update_container = () => {
            const pos = heroes_used_data.array.indexOf(hero_id) + 1
            if (pos === 0) {
                this.container.style.background = 'radial-gradient( rgba(255,0,0,0) 30%, rgba(255,0,0,1) 50%, rgba(255,0,0,0) 70%)'
                this.container.style.color = 'red'
                this.container.innerHTML = 'N'
            } else {
                this.container.style.background = 'radial-gradient( rgba(255,255,255,0) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 70%)'
                this.container.style.color = 'white'
                this.container.innerHTML = pos
            }
        }
        update_container()
        heroes_used_data.on_change.add(update_container)
        this.container.addEventListener('click', () => {
            const { x, y } = this.container.getBoundingClientRect()
            display_pos_view(x, y)
            cb = (pos) => {
                upgrade_system.placement(hero_name, pos)
            }
        })
    }
}








