


import { Upgrade_System } from '../../../../../common/systems/Upgrade_System.js'
import { Heroes_Data } from '../../../../../common/user_data/models/Heroes_Data.js'
import { Heroes_Used_Data } from '../../../../../common/user_data/models/Heroes_Used_Data.js'
import { Hero_Data } from '../../../../../common/user_data/models/Hero_Data.js'
import { Student_Data } from '../../../../../common/user_data/models/Student_Data.js'
import { Wallet_Data } from '../../../../../common/user_data/models/Wallet_Data.js'
import { heroes_design } from '../../../../../game_design/entities/heroes_design.js'
import { progress_heroes_design } from '../../../../../game_design/progress_design.js'
import { Lv_Progress_View_Effect } from '../../../models/Lv_Progress_View_Effect.js'
import { Heroes_Image } from '../../../../ressources/heroes_image/Heroes_Image.js'
import { createHTMLElement } from '../../../utils/htmlElement.js'
import { createSeparationBar } from '../../../utils/views/separationBar.js'
import { Add_View } from './models/Add_View.js'
import { Evo_View } from './models/Evo_View.js'
import { Mult_View } from './models/Mult_View.js'
import { Pos_View } from './models/Pos_View.js'
import { Stuff_View } from './models/Stuff_View.js'
import { Targ_View } from './models/Targ_View.js'

const tab_style = {
    backgroundColor: 'hsla(0, 0%, 10%, .8)',
    height: '100%',
    borderRadius: '5px 5px 0 0',
    '--padding-button': '0',
}
export const hero_view_scroll = []
class Hero_View {

    /**
     * 
     * @param {string} hero_name 
     * @param {Hero_Data} hero_data
     * @param {Heroes_Used_Data} heroes_used_data
     * @param {string} image_url 
     * @param {Upgrade_System} upgrade_system 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect 
     */
    constructor(
        hero_name,
        hero_data,
        heroes_used_data,
        image_url,
        upgrade_system,
        lv_progress_view_effect,
    ) {
        const inits = []
        const init = () => {
            for (const f of inits) f()
            inits.length = 0
        }

        this.container = createHTMLElement('div', {
            display: 'flex', alignItems: 'center',
            position: 'relative',
        })
        if (hero_name !== 'student') {
            hero_view_scroll.push(this.container.scrollIntoView.bind(this.container))
            inits.push(() => {
                const pos = new Pos_View(
                    hero_name,
                    heroes_used_data,
                    upgrade_system
                )
                this.container.appendChild(pos.container)
                pos.container.style.position = 'absolute'
                pos.container.style.left = '0'
                pos.container.style.top = '0'
            })
        }

        createHTMLElement('img', {
            width: '100px',
            height: '100px',
        }, this.container, '', {
            src: image_url
        })

        const upgrades = createHTMLElement('div', {
            margin: '0 5px',
        }, this.container)
        const header = createHTMLElement('div', {
            height: '25px',
            fontSize: '14px',
            width: '250px',
            display: 'flex',
        }, upgrades)
        const main = createHTMLElement('div', {
            height: '100px',
            width: '250px',
            padding: '0 5px',
            background: 'hsla(0, 0%, 15%, .8)'
        }, upgrades)

        const tabs = []

        { // add
            const tab = createHTMLElement('button', tab_style, header, 'Add')
            tab.style.backgroundColor = 'hsla(0, 0%, 15%, .8)'
            tabs.push(tab)
            const content = new Add_View(hero_name, hero_data, upgrade_system)
            main.appendChild(content.container)

            inits.push(() => {
                tab.addEventListener('click', () => {
                    main.innerHTML = ''
                    main.appendChild(content.container)
                    tabs.forEach(a => a.style.background = 'hsla(0, 0%, 10%, .8)')
                    tab.style.backgroundColor = 'hsla(0, 0%, 15%, .8)'
                })
                content.init()
            })
        }
        { // mult
            const tab = createHTMLElement('button', tab_style, header, 'Mult')

            tabs.push(tab)
            const content = new Mult_View(hero_name, hero_data, upgrade_system)
            inits.push(() => {
                tab.addEventListener('click', () => {
                    main.innerHTML = ''
                    main.appendChild(content.container)
                    tabs.forEach(a => a.style.backgroundColor = 'hsla(0, 0%, 10%, .8)')
                    tab.style.backgroundColor = 'hsla(0, 0%, 15%, .8)'
                })
            })
        }
        if (hero_name !== 'student') { // stuff
            const tab = createHTMLElement('button', tab_style, header, 'Stuff')
            const content = new Stuff_View(
                hero_name,
                hero_data,
                upgrade_system,
                lv_progress_view_effect,
            )
            inits.push(() => {
                tab.addEventListener('click', () => {
                    main.innerHTML = ''
                    main.appendChild(content.container)
                    tabs.forEach(a => a.style.backgroundColor = 'hsla(0, 0%, 10%, .8)')
                    tab.style.backgroundColor = 'hsla(0, 0%, 15%, .8)'
                })
            })
            tabs.push(tab)
        }

        if (hero_name !== 'student') { // evo
            const tab = createHTMLElement('button', tab_style, header, 'Evo')
            const content = new Evo_View(
                hero_name,
                hero_data,
                upgrade_system,
                lv_progress_view_effect,
            )
            inits.push(() => {
                tab.addEventListener('click', () => {
                    main.innerHTML = ''
                    main.appendChild(content.container)
                    tabs.forEach(a => a.style.backgroundColor = 'hsla(0, 0%, 10%, .8)')
                    tab.style.backgroundColor = 'hsla(0, 0%, 15%, .8)'
                })
            })
            tabs.push(tab)
        }
        { // targ
            const tab = createHTMLElement('button', tab_style, header, 'Targ')
            const content = new Targ_View(
                hero_data,
                lv_progress_view_effect,
            )
            inits.push(() => {
                tab.addEventListener('click', () => {
                    main.innerHTML = ''
                    main.appendChild(content.container)
                    tabs.forEach(a => a.style.backgroundColor = 'hsla(0, 0%, 10%, .8)')
                    tab.style.backgroundColor = 'hsla(0, 0%, 15%, .8)'
                })
            })
            tabs.push(tab)
        }

        lv_progress_view_effect.add(
            this.container,
            progress_heroes_design[hero_name] ?? 0,
            init
        )
    }
}

export class Heroes_Upgrade_View {
    static init = (item_image) => {
        Pos_View.init()
        Stuff_View.init(item_image)
    }
    static destroy = () => {
        Pos_View.destroy()
        Stuff_View.destroy()
    }

    /**
     * 
     * @param {Student_Data} student_data 
     * @param {Heroes_Data} heroes_data 
     * @param {Heroes_Used_Data} heroes_used_data 
     * @param {Wallet_Data} wallet_data 
     * @param {Heroes_Image} heroes_image 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect 
     */
    constructor(
        student_data,
        heroes_data,
        heroes_used_data,
        upgrade_system,
        heroes_image,
        lv_progress_view_effect,
    ) {
        this.container = createHTMLElement('div', {
            height: '400px',
            overflowY: 'auto',
        })

        const student = new Hero_View(
            'student',
            student_data,
            heroes_used_data,
            heroes_image.student,
            upgrade_system,
            lv_progress_view_effect,
        )
        this.container.appendChild(student.container)

        this.hero_view_scroll = [
            student.container.scrollIntoView.bind(student.container)
        ]
        for (const key of heroes_data.keys()) {
            const hero = heroes_data[key]
            createSeparationBar(this.container)
            const hero_view = new Hero_View(
                key,
                hero,
                heroes_used_data,
                heroes_image[key],
                upgrade_system,
                lv_progress_view_effect
            )
            this.hero_view_scroll[heroes_design[key].id + 1] =
                hero_view.container.scrollIntoView.bind(hero_view.container)
            this.container.appendChild(hero_view.container)
        }
    }
}






