





import { rank_design } from '../../game_design/items/rank_design.js'
import { Event_Dispatcher } from '../../utils/Event_Dispatcher.js'
import { array_get_random } from '../../utils/utils.js'
import { Arrow } from '../entities/items/Arrow.js'
import { Axe } from '../entities/items/Axe.js'
import { Hammer } from '../entities/items/Hammer.js'
import { Skull_Staff } from '../entities/items/Skull_Staff.js'
import { Staff } from '../entities/items/Staff.js'
import { Wood_Stick } from '../entities/items/Wood_Stick.js'
import { Bag_Data } from '../user_data/models/Bag_Data.js'
import { Loop_Manager } from './Loop_Manager.js'

export class Loot_System extends Event_Dispatcher {

    #items = []
    constructor(
        /** @type {Bag_Data} */ bag_data,
        /** @type {Loop_Manager} */ loop_manager,
    ) {
        super()

        this.loot = (pos) => {
            let rank = 0
            while (rank < rank_design.length) {
                if (Math.random() < .66) break
                rank++
            }
            if (rank === 0) return
            array_get_random(items_loot)(pos, rank - 1)
        }

        // generatrice function
        const add_item = (name, Item_Class) => {
            return (pos, rank) => {
                const item = new Item_Class(pos, rank, bag_data, loop_manager)
                if (this.#items.length >= 20)
                    this.#items.shift().dispose()

                this.#items.push(item)

                this.emit(name, item)
            }
        }

        this.axe = add_item('axe', Axe)
        this.hammer = add_item('hammer', Hammer)
        this.skull_staff = add_item('skull_staff', Skull_Staff)
        this.staff = add_item('staff', Staff)
        this.wood_stick = add_item('wood_stick', Wood_Stick)
        this.arrow = add_item('arrow', Arrow)
        const items_loot = [
            this.axe,
            this.hammer,
            this.skull_staff,
            this.staff,
            this.wood_stick,
            this.arrow,
        ]

    }
}











