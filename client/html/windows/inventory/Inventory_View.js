



import { Upgrade_System } from '../../../../common/systems/Upgrade_System.js'
import { Bag_Data } from "../../../../common/user_data/models/Bag_Data.js"
import { LOCALSTORAGE_WINDOW_INVENTORY } from "../../../../constants/localStorage.js"
import { item_design } from '../../../../game_design/items/item_design_data.js'
import { rank_design } from "../../../../game_design/items/rank_design.js"
import { Static_Init_Manager } from '../../../../utils/Static_Init_Manager.js'
import { set_on_change } from "../../../../utils/utils.js"
import { add_drag_event, add_drop_event } from '../../utils/drag.js'
import { createHTMLElement } from "../../utils/htmlElement.js"
import { bagIMG } from '../../utils/icons/icons.js'
import { DefaultHTMLWindow } from "../../utils/views/DefaultWindow.js"

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

export class Inventory_View {
    static init = init
    static destroy = destroy

    /**
     * @param {Bag_Data} bag_data 
     */
    constructor(
        bag_data,
       /** @type {Upgrade_System} */ upgrade_system,
    ) {
        this.icon = bagIMG(32, 32)
        const w = new DefaultHTMLWindow(LOCALSTORAGE_WINDOW_INVENTORY)

        this.icon.addEventListener('click', w.toggle)

        const BOX_SIZE = '45px'

        const inventory_view = createHTMLElement('div', {
            height: '300px',
            // maxHeight: '60%',
            overflowY: 'auto',
            display: 'grid',
            grid: `repeat(15, ${BOX_SIZE}) / repeat(4, ${BOX_SIZE})`,
        })

        const selectionned = new Set()
        const on_selectionned = set_on_change(selectionned)
        const unselection_all = () => {
            for (const element of selectionned) element.style.borderColor = 'black'
            selectionned.clear()
        }

        w.closeCb.add(unselection_all)

        { // delete button
            const delete_button = createHTMLElement('div', {
                padding: '5px',
                position: 'absolute',
                bottom: '0px',
                left: '0px',
            })
            createHTMLElement('button', {
                padding: '5px 10px',
                backgroundColor: 'hsl(0, 100%, 60%)',
                borderRadius: '5px',
            }, delete_button, 'delete')

            const update_delete_button = () => {
                if (selectionned.size === 0) {
                    delete_button.remove()
                } else if (selectionned.size === 1) {
                    inventory_view.parentElement.appendChild(delete_button)
                }
            }
            update_delete_button()
            on_selectionned.add(update_delete_button)

            delete_button.addEventListener('click', () => {
                for (const element of selectionned)
                    bag_data.remove_item(+element.dataset.id)
                unselection_all()
            })
        }

        w.addTab('inventory', inventory_view)
        for (let i = 0; i < bag_data.length; i++) {
            const item_view = createHTMLElement('div', {
                boxSizing: 'border-box',
                width: BOX_SIZE,
                height: BOX_SIZE,
                borderRadius: '10px',
                border: 'solid 2px black',
            }, inventory_view)
            item_view.dataset.id = i
            const pos_id = i
            const item = bag_data.get_item(i)
            const on_select = () => {
                if (item.id !== 0) {
                    if (selectionned.has(item_view) === true) {
                        item_view.style.borderColor = 'black'
                        selectionned.delete(item_view)
                    } else {
                        item_view.style.borderColor = 'cyan'
                        selectionned.add(item_view)
                    }
                } else {
                    unselection_all()
                }
            }
            const on_check = () => {
                const check = (item.id !== 0)
                if (check === true) unselection_all()
                return check
            }
            {
                add_drag_event(item_view, [-1, pos_id], on_check, on_select)

                add_drop_event(item_view, (dataTransfer) => {
                    if (dataTransfer[0] === -1) return
                    upgrade_system.item_switch(dataTransfer[0], dataTransfer[1], pos_id)
                })
            }
            const style = item_view.style

            const update_id = () => {
                item_view.innerHTML = ''
                if (item.id === 0) return
                // const img = stuff_image[item.id].cloneNode()
                // img.src = stuff_image[item.id].src
                item_view.appendChild(stuff_image[item.id].cloneNode())
            }
            item.on_id.add(update_id)
            update_id()

            const update_rank = () => {
                style.background = rank_design[item.rank].background
            }
            item.on_rank.add(update_rank)
            update_rank()
        }
    }
}


