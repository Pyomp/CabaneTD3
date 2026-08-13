import {
    CONDITION_BURN,
    CONDITION_FREEZE
} from "./condition_design.js"
import {
    burnRAW,
    burnSVG,
    freezeRAW,
    freezeSVG
} from "./icons/icons.js"


export const CONDITION_VIEW_DATA = {}
export const STR_CONDITION = {}

class D {
    constructor(
        id,
        name = ['nameEN', 'nameFR'],
        desc = ['descEN', 'descFR'],
        svg = 'svg str format',
    ) {
        this.name = `condition_name_${id}`
        STR_CONDITION[this.name] = name

        this.desc = `condition_desc_${id}`
        STR_CONDITION[this.desc] = desc

        this.type = id < 1000 ? 'good' : 'bad'

        this.svg = svg
        CONDITION_VIEW_DATA[id] = this
        Object.freeze(this)
    }
}

new D(CONDITION_BURN, ['Burn',
    'Brûle'], ['The target get fire damage over time.',
    'La cible subit des dommages au fil du temps.'],
    burnRAW)

new D(CONDITION_FREEZE, ['Freeze',
    'Gel'], ['The target cannot move.',
    'La cible ne peut plus bouger.'],
    freezeRAW)





Object.freeze(CONDITION_VIEW_DATA)