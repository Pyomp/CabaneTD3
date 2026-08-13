




import {
    ITEM_ARROW_PENETRATION,
    ITEM_AXE,
    ITEM_HAMMER,
    ITEM_SKULL_STAFF,
    ITEM_STAFF,
    ITEM_WOOD_STICK,
} from './item_design_constants.js'
import {
    axeRAW,
    defBreakRAW,
    hammerRAW,
    skullstaffRAW,
    staffRAW,
    woodStickRAW,
} from './icons/icons.js'
import {
    ITEM_EMPTY,
    ITEM_LENGTH
} from './item_design_constants.js'

export const ITEM_TYPE_EQUIPMENT = 0

/** @type {[Model_View_Item_Design]} */
export const item_design_view = new Array(ITEM_LENGTH)

class Model_View_Item_Design {
    constructor(
        id,
        name = 'name',
        desc = 'desc',
        svg = 'svg str format',
    ) {
        this.name = name
        this.desc = desc
        this.svg = svg

        Object.freeze(this)
        item_design_view[id] = this
    }
}

new Model_View_Item_Design(
    ITEM_EMPTY,
    'empty',
    '',
    '',
)

new Model_View_Item_Design(
    ITEM_STAFF,
    'freeze',
    'freeze_desc',
    staffRAW,
)

new Model_View_Item_Design(
    ITEM_WOOD_STICK,
    'slow',
    'slow_desc',
    woodStickRAW,
)

new Model_View_Item_Design(
    ITEM_SKULL_STAFF,
    'silence',
    'silence_desc',
    skullstaffRAW,
)

new Model_View_Item_Design(
    ITEM_HAMMER,
    'knockback',
    'knockback_desc',
    hammerRAW,
)

new Model_View_Item_Design(
    ITEM_AXE,
    'stun',
    'stun_desc',
    axeRAW,
)

new Model_View_Item_Design(
    ITEM_ARROW_PENETRATION,
    'penetration',
    'penetration_desc',
    defBreakRAW,
)




