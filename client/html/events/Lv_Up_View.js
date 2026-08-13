







import { Game_Data } from '../../../common/user_data/models/Game_Data.js'
import { heroes_design } from '../../../game_design/entities/heroes_design.js'
import { progress_heroes_design, progress_interface_design } from '../../../game_design/progress_design.js'
import { createHTMLElement } from '../utils/htmlElement.js'
import { questIMG, repeatIMG, researchIMG, speedIMG, statsIMG } from '../utils/icons/icons.js'
import { STYLE } from '../utils/style/Style.js' 

export class Lv_Up_View {
    /**
     * 
     * @param {Game_Data} game_data 
     */
    constructor(
        game_data,
        heroes_image
    ) {

        const TILE_SIZE = 80
        const IMG_SIZE = 0.6 * TILE_SIZE

        const avatar = {}
        for (const key in heroes_image) {
            const url = heroes_image[key]
            avatar[key] = createHTMLElement('img', {
                width: `${TILE_SIZE}px`,
                height: `${TILE_SIZE}px`,
            }, undefined, '', {
                src: url
            })
        }

        const tile_style = {
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column',
            gap: '5px'
        }
        const create_tile_view = (img, text) => {
            const container = createHTMLElement('div', tile_style)
            container.appendChild(img)
            createHTMLElement('span', {}, container, text)
            return container
        }

        const interface_tiles = {
            quest: create_tile_view(questIMG(IMG_SIZE, IMG_SIZE), 'quests'),
            rebirth: create_tile_view(researchIMG(IMG_SIZE, IMG_SIZE), 'rebirth'),
            equi: create_tile_view(researchIMG(IMG_SIZE, IMG_SIZE), 'equi'),
            evo: create_tile_view(researchIMG(IMG_SIZE, IMG_SIZE), 'evo'),
            targ: create_tile_view(researchIMG(IMG_SIZE, IMG_SIZE), 'targ'),
            stats: create_tile_view(statsIMG(IMG_SIZE, IMG_SIZE), 'stats'),
            repeat: create_tile_view(repeatIMG(IMG_SIZE, IMG_SIZE), 'repeat'),
            speed: create_tile_view(speedIMG(IMG_SIZE, IMG_SIZE), 'speed'),
            labo: create_tile_view(researchIMG(IMG_SIZE, IMG_SIZE), 'labo'),
        }

        const container = createHTMLElement('div', {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column',
            transition: 'all .8s cubic-bezier(.1,1.6,.7, 1)',
            position: 'fixed',
            gap: '5px',
            top: '50%',
            left: '50%',
            background: STYLE.var.colorBackground,
            borderRadius: '5px',
            padding: '5px',
            transformOrigin: 'top left',
            transform: 'scale(0) translate(-50%, -50%)',
        })

        const container_style = container.style

        const lv_text_container = createHTMLElement('div', { display: 'flex', }, container)
        createHTMLElement('span', { marginRight: '5px' }, lv_text_container, 'lv_up')
        const lv_span = createHTMLElement('span', {}, lv_text_container)

        createHTMLElement('span', {}, container, 'unlock')

        const tiles = createHTMLElement('div', { display: 'flex' }, container)

        const confirm_button = createHTMLElement('button', {
            padding: '5px',
            backgroundColor: 'hsl(120, 60%, 60%)',
            '--padding-button': '5px',
        }, container, 'confirm')

        confirm_button.addEventListener('click', () => {
            container_style.transition = 'transform .8s cubic-bezier(.45,-0.47,1,.53)'
            container_style.transform = 'scale(0) translate(-50%, -50%)'
        })

        this.display_lv_up_view = (lv) => {
            if (lv === 0) return
            lv_span.innerHTML = lv
            tiles.innerHTML = ''

            for (const key in progress_heroes_design) {
                if (lv === progress_heroes_design[key]) {
                    tiles.appendChild(avatar[key])
                }
            }

            for (const key in progress_interface_design) {
                if (lv === progress_interface_design[key]) {
                    tiles.appendChild(interface_tiles[key])
                }
            }

            document.body.appendChild(container)
            container_style.transition = 'transform .8s cubic-bezier(.32,1.71,.55,1)'

            requestAnimationFrame(() => {
                container_style.transform = 'scale(1) translate(-50%, -50%)'
            })
        }

        const on_lv = () => {
            this.display_lv_up_view(game_data.lv)
        }
        game_data.on_lv.add(on_lv)

        this.dispose = () => {
            game_data.on_lv.delete(on_lv)
        }
    }
}