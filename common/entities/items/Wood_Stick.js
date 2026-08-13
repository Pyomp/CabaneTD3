import { ITEM_WOOD_STICK } from '../../../game_design/items/item_design_constants.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Bag_Data } from '../../user_data/models/Bag_Data.js'
import { Item_Data } from '../../user_data/models/Item_Data.js'
import { Item_Interface } from './Item_Interface.js'

export class Wood_Stick extends Item_Interface {
    constructor(
       /** @type {{x:number, y: number, z:number}} */ position,
       /** @type {number} */  rank,
       /** @type {Bag_Data} */ bag_data,
       /** @type {Loop_Manager} */ loop_manager,
    ) {
        super(position, new Item_Data(ITEM_WOOD_STICK, rank), bag_data, loop_manager)
    }
}



