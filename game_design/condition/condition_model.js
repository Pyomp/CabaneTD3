

export const CONDITION = {}

export const CONDITION_GOOD = 0
export const CONDITION_BAD = 1
export const CONDITION_OTHER = 2

export class Condition_Data {
    constructor(
        id = 0,
        type = CONDITION_OTHER,
    ) {
        this.name = name
        this.type = type

        Object.freeze(this)
        CONDITION[id] = this
    }
}




