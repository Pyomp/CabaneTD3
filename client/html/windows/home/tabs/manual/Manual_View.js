
import { Heroes_Image } from '../../../../../ressources/heroes_image/Heroes_Image.js'
import { Item_Image } from '../../../../../ressources/item_images/Item_Image.js'
import { Skill_Image } from '../../../../../ressources/skill_image/Skill_Image.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { closeIMG, nextWaveIMG, questIMG, researchIMG } from '../../../../utils/icons/icons.js'
import { Bonus_Manual_View } from './Bonus_Manual_View.js'
import { General_Manual_View } from './General_Manual_View.js'
import { Heroes_Manual_View } from './Heroes_Manual_View.js'
import { Items_Manual_View } from './Items_Manual_View.js'
import { Quests_Manual_View } from './Quests_Manual_View.js'
import { Skills_Manual_View } from './Skills_Manual_View.js'
import { Upgrade_Manual_View } from './Upgrade_Manual_View.js'


export class Manual_View {

    /**
     * 
     * @param {Heroes_Image} heroes_image 
     * @param {Item_Image} item_image 
     * @param {Skill_Image} skill_image
     */
    constructor(
        heroes_image,
        item_image,
        skill_image,
    ) {
        this.container = createHTMLElement('div', {
            overflowY: 'auto',
            // position: 'relative',
        })
        const on_resize = () => {
            const { top } = this.container.getBoundingClientRect()
            const max_height = Math.min(innerHeight - top, 600)
            this.container.style.maxHeight = `${max_height}px`
        }
        on_resize()
        addEventListener('resize', on_resize)
        const mutation_observer = new MutationObserver(on_resize)
        mutation_observer.observe(this.container, { childList: true })

        const tiles = createHTMLElement('div', {
            display: 'flex',
            flexWrap: 'wrap',
            width: '350px',
        }, this.container)

        const info = createHTMLElement('div', {
            width: '350px',
            userSelect: 'text',
            padding: '5px'
        })
        const close_img = closeIMG(20, 20)
        info.appendChild(close_img)
        {
            const s = close_img.style
            s.padding = '20px'
            s.position = 'absolute'
            s.top = '0'
            s.right = '0'
        }
        close_img.addEventListener('click', () => {
            this.container.innerHTML = ''
            this.container.appendChild(tiles)
        })

        const tile_image_size = 50

        class Tile {
            /**
             * @param {String} title 
             * @param {Element} img 
             * @param {Element} element_to_display 
             */
            constructor(parent, title, img, element_to_display) {
                const container = createHTMLElement('div', {
                    border: '1px solid',
                    borderRadius: '10px',
                    background: 'rgba(0,0,0,0.2)',
                    textAlign: 'center',
                    width: 'fit-content',
                    padding: '5px',
                    margin: '5px',
                }, tiles)

                container.appendChild(img)
                {
                    const s = img.style
                    s.padding = '5px'
                }

                createHTMLElement('div', { margin: 'auto' }, container, title)
                container.addEventListener('click', () => {

                    parent.innerHTML = ''
                    // manual_view.parentNode.appendChild(close_img)
                    parent.appendChild(info)
                    // info.innerHTML = ''
                    while (info.children.length > 1) { info.lastElementChild.remove() }
                    info.appendChild(element_to_display)
                })
            }
        }

        new Tile(this.container, 'general', nextWaveIMG(tile_image_size, tile_image_size), new General_Manual_View().container)
        new Tile(this.container, 'upgrade',
            researchIMG(tile_image_size, tile_image_size),
            new Upgrade_Manual_View().container)
        new Tile(this.container, 'heroes',
            createHTMLElement('img', { width: `${tile_image_size}px`, height: `${tile_image_size}px` }, undefined, undefined, {
                src: heroes_image.kitsune_fire
            }),
            new Heroes_Manual_View(heroes_image).container)

        new Tile(this.container, 'bonus', researchIMG(tile_image_size, tile_image_size), new Bonus_Manual_View().container)

        const ult_image = new Image(tile_image_size, tile_image_size)
        ult_image.src = skill_image.ult
        new Tile(this.container, 'skills', ult_image, new Skills_Manual_View(skill_image).container)

        new Tile(this.container, 'quests', questIMG(tile_image_size, tile_image_size), new Quests_Manual_View().container)

        const item_icon = new Image(tile_image_size, tile_image_size)
        item_icon.src = item_image.axe
        item_icon.style.backgroundImage = 'radial-gradient(#f44, #fff0 70%)'
        new Tile(this.container, 'items', item_icon, new Items_Manual_View().container)
    }
}




