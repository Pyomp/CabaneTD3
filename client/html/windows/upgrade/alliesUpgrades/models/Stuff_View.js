






import { Upgrade_System } from '../../../../../../common/systems/Upgrade_System.js'
import { Hero_Data } from '../../../../../../common/user_data/models/Hero_Data.js'
import { item_design } from '../../../../../../game_design/items/item_design_data.js'
import { item_design_view } from '../../../../../../game_design/items/item_design_view.js'
import { rank_design } from '../../../../../../game_design/items/rank_design.js'
import { progress_interface_design } from '../../../../../../game_design/progress_design.js'
import { Static_Init_Manager } from '../../../../../../utils/Static_Init_Manager.js'
import { Lv_Progress_View_Effect } from '../../../../models/Lv_Progress_View_Effect.js'
import { add_drag_event, add_drop_event } from '../../../../utils/drag.js'
import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { i18nH } from '../../../../utils/i18n.js'

const button_style = {
    color: 'red',
    backgroundColor: 'hsl(0, 0%, 20%)',
    width: 'fit-content',
    height: '90%'
}
const icon_size = 16

const line_style = {
    gap: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30%',
}

const sep_style = {
    width: '80%',
    margin: '0 auto',
    height: '1px',
    background: 'black',
}

const effect_names = []
const effect_desc = []
for (let i = 0; i < item_design_view.length; i++) {
    const design = item_design_view[i]
    effect_names.push(design.name)
    effect_desc.push(design.desc)
}



let stuff_image
const { init, destroy } = new Static_Init_Manager(
    (
        item_image
    ) => {
        stuff_image = {}
        const add_image = (id) => {
            const image = new Image(64, 64)
            image.style.width = '100%'
            image.style.height = '100%'
            image.src = item_image[item_design[id].name]
            stuff_image[id] = image
        }

        for (let i = 1; i < item_design.length; i++) {
            add_image(i)
        }
    },
    () => { stuff_image = undefined }
)


export class Stuff_View {
    static init = init
    static destroy = destroy

    /**
     * 
     * @param {String} hero_name 
     * @param {Hero_Data | Student_Data} hero_data 
     * @param {Upgrade_System} upgrade_system 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect
     */
    constructor(
        hero_name,
        hero_data,
        upgrade_system,
        lv_progress_view_effect,
    ) {
        this.container = createHTMLElement('div', {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
        })

        const inits = []
        const init = () => {
            for (const f of inits) f()
            inits.length = 0
        }

        for (let i = 0; i < 3; i++) {
            const pos_id = i
            if (i !== 0) createHTMLElement('div', sep_style, this.container)
            const container = createHTMLElement('div', { display: 'flex', alignItems: 'center', }, this.container)

            const item_view = createHTMLElement('div', {
                // display: 'inline-block',
                boxSizing: 'border-box',
                width: '33px',
                height: '33px',
                background: rank_design[0].background,
                borderRadius: '10px',
                border: 'solid 1px black',
            }, container)
            const effect = createHTMLElement('span',
                { margin: 'auto' },
                container, 'empty')

            const id = i
            inits.push(() => {
                const item = hero_data.bag.get_item(id)
                add_drag_event(item_view, [hero_name, pos_id], () => item.id !== 0)
                add_drop_event(container, (dataTransfer) => {
                    upgrade_system.item_switch(hero_name, pos_id, dataTransfer[1])
                })
                const style = item_view.style

                const on_effect = () => {
                    item_view.innerHTML = ''
                    i18nH(effect, effect_desc[item.id])
                    if (item.id === 0) return
                    // const img = stuff_image[item.id].cloneNode()
                    // img.src = stuff_image[item.id].src
                    item_view.appendChild(stuff_image[item.id].cloneNode())

                }
                on_effect()
                item.on_id.add(on_effect)

                const on_rank = () => {
                    style.background = rank_design[item.rank].background
                    // effect_style.color = item_colors[item.effect]
                }
                on_rank()
                item.on_rank.add(on_rank)
            })
        }

        lv_progress_view_effect.add(
            this.container,
            progress_interface_design.equi,
            init,
        )
    }
}
