import { init_animals_3D } from '../../../client/3D/entities/heroes/animals/init_animals_3D.js'
import { init_cactus_3D } from '../../../client/3D/entities/heroes/cactus/init_cactus_3D.js'
import { init_employee_3D } from '../../../client/3D/entities/heroes/employee/init_employee_3D.js'
import { init_engineer_3D } from '../../../client/3D/entities/heroes/engineer/init_engineer_3D.js'
import { init_kitsunes_3D } from '../../../client/3D/entities/heroes/kitsune/init_kitsune_3D.js'
import { init_magicians_3D } from '../../../client/3D/entities/heroes/magician/init_magician_3D.js'
import { init_plant_3D } from '../../../client/3D/entities/heroes/plant/init_plant_3D.js'
import { init_witch_3D } from '../../../client/3D/entities/heroes/witch/init_witch_3D.js'
import { Loader_Manager } from '../../../client/3D/modules/Loader_Manager.js'
import { WebGLRenderer } from '../../../client/3D/modules/three.module.js'
import { heroes_design } from '../../../game_design/entities/heroes_design.js'
import { PI2 } from '../../../utils/math/math_utils.js'
import { Static_Init_Manager } from '../../../utils/Static_Init_Manager.js'
import { createHTMLElement } from '../../utils/htmlElement.js'
import { pointerMove } from '../../utils/input_utils.js'
import { Character } from './Character.js'
import { presentation_heroes_data } from './data.js'

let models = {}

const { init, destroy } = new Static_Init_Manager(
    async () => {
        const loader = new Loader_Manager()
        return Promise.all([
            init_animals_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_cactus_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_employee_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_engineer_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_kitsunes_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_magicians_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_plant_3D(loader).then((a) => { models = { ...models, ...a } }),
            init_witch_3D(loader).then((a) => { models = { ...models, ...a } }),
        ])
    },
    () => {
        models = {}
    }
)

export class Avatars_Manager {

    static init = init
    static destroy = destroy

    constructor(
        parent,
        w = 300,
        h = 300,
    ) {

        this.container = createHTMLElement('div', {
            overflow: 'hidden',
            width: '100%',
            // height: '100%',
        }, parent)

        const container_flex = createHTMLElement('div', {
            display: 'flex',
            width: 'max-content',
        }, this.container)

        const container_description = createHTMLElement('div', {
            position: 'relative',
            height: '150px',
        }, parent)

        const offset_margin = 150
        const w_yep = w - offset_margin

        const pricipal_canvas = document.createElement("canvas")

        // renderer
        const renderer = new WebGLRenderer({
            canvas: pricipal_canvas,
            antialias: true,
            alpha: true,
        })
        renderer.setSize(w, h)
        renderer.setPixelRatio(1)

        /** @type {[Character]} */
        const characters = []

        const inits = []


        const init_view = () => {
            for (const key in heroes_design) {

                const character = new Character(
                    w, h, offset_margin,
                    'engineer' === key ? models[key] : models[key][0],
                    container_description,
                    presentation_heroes_data[key],
                    container_flex,
                )
                characters.push(character)

                inits.push(() => {
                    requestIdleCallback(() => {
                        renderer.render(character.scene, character.camera)
                        const cb = inits.pop()
                        if (cb !== undefined) {
                            cb()
                        } else {
                            addEventListener('resize', on_scroll)
                            on_scroll()
                        }
                    })
                })
            }

            const before_div = createHTMLElement('div')
            container_flex.prepend(before_div)
            const after_div = createHTMLElement('div')
            container_flex.appendChild(after_div)

            inits.pop()()

            const render_character = (id, y) => {
                const char = characters[id]
                char.mesh.rotation.y = y
                renderer.render(char.scene, char.camera)
                char.ctx.clearRect(0, 0, w, h)
                char.ctx.drawImage(pricipal_canvas, 0, 0, w, h)
            }

            const hero_to_render = []

            this.container.scrollLeft = 10 * w_yep

            const on_scroll = (e) => {
                const left = this.container.scrollLeft
                hero_to_render.length = 0
                // const width = container_flex.clientWidth / 3

                // const start = Math.floor(left / width)
                const w_bound = this.container.clientWidth / 2
                before_div.style.width = after_div.style.width = `${w_bound}px`

                let z = 0
                let x_max = 0
                let needs_description_display = undefined

                let offsetLeft = w_bound + (w_yep - offset_margin) / 2
                for (let i = 0; i < characters.length; i++) {
                    const character = characters[i]
                    const canvas_style = character.canvas.style
                    const middle = offsetLeft - left
                    offsetLeft += w_yep
                    const zoom = middle / w_bound
                    if (zoom > 1.9 || zoom < 0.1) continue
                    const x = zoom < 1 ? zoom : 2 - zoom

                    if (x > x_max) {
                        x_max = zoom
                        canvas_style.zIndex = ++z
                    } else {
                        if (needs_description_display === undefined) {
                            needs_description_display = characters[Math.max(i - 1, 0)]
                        }
                        canvas_style.zIndex = --z
                    }

                    canvas_style.opacity = x
                    canvas_style.transform = `scale(${x})`
                    hero_to_render.push(i)
                }

                if (needs_description_display === undefined) {
                    needs_description_display = characters[characters.length - 1]
                }

                for (let i = 0; i < characters.length; i++) {
                    const c = characters[i]
                    if (c === needs_description_display) {
                        c.description_display()
                    } else {
                        c.description_close()
                    }
                }
            }
            this.container.addEventListener('scroll', on_scroll)

            pointerMove(this.container, (e, dx, dy) => {
                this.container.scrollLeft -= dx
            })


            this.render = (t) => {
                const y = (t / 2000) % PI2

                for (const index of hero_to_render) {
                    render_character(index, y)
                }
            }

            renderer.setAnimationLoop(this.render)
        }
        Avatars_Manager.init().then(init_view)

        this.dispose = () => { Avatars_Manager.destroy() }


    }
}














