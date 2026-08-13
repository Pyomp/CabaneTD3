






import {
    EFFECTS_BREAK_DEF,
    EFFECTS_BUMP,
    EFFECTS_FREEZE,
    EFFECTS_KNOCKBACK,
    EFFECTS_SLOW,
    EFFECTS_STUN,
} from '../effects_design.js'
import {
    ITEM_ARROW_PENETRATION,
    ITEM_AXE,
    ITEM_HAMMER,
    ITEM_SKULL_STAFF,
    ITEM_STAFF,
    ITEM_WOOD_STICK,
    ITEM_EMPTY,
    ITEM_LENGTH
} from './item_design_constants.js'

export const ITEM_TYPE_EQUIPMENT = 0

/** @type {Model_Item_Design[]} */
export const item_design = new Array(ITEM_LENGTH)

export class Model_Item_Design {
    constructor(
        id,
        name = '',
        type = 0,
        data = {}
    ) {
        this.type = type
        this.name = name
        this.data = data
        Object.freeze(this)
        item_design[id] = this
    }
}

new Model_Item_Design(
    ITEM_EMPTY,
)

new Model_Item_Design(
    ITEM_AXE,
    'axe',
    ITEM_TYPE_EQUIPMENT,
    { effect: { id: EFFECTS_STUN, param: [.1] } }
)

new Model_Item_Design(
    ITEM_ARROW_PENETRATION,
    'arrow',
    ITEM_TYPE_EQUIPMENT,
    { effect: { id: EFFECTS_KNOCKBACK, param: [.3] } }
)
new Model_Item_Design(
    ITEM_HAMMER,
    'hammer',
    ITEM_TYPE_EQUIPMENT,
    { effect: { id: EFFECTS_BUMP, param: [.3] } },
)
new Model_Item_Design(
    ITEM_SKULL_STAFF,
    'skull_staff',
    ITEM_TYPE_EQUIPMENT,
    { effect: { id: EFFECTS_BREAK_DEF, param: [0.01, .3] } }
)
new Model_Item_Design(
    ITEM_STAFF,
    'staff',
    ITEM_TYPE_EQUIPMENT,
    { effect: { id: EFFECTS_FREEZE, param: [.1] } }
)
new Model_Item_Design(
    ITEM_WOOD_STICK,
    'wood_stick',
    ITEM_TYPE_EQUIPMENT,
    { effect: { id: EFFECTS_SLOW, param: [0.03, .3] } }
)






