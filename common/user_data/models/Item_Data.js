

import { cbH } from "../../../utils/utils.js"


export class Item_Data {
    on_id = new Set()
    #id = 0
    get id() { return this.#id }
    set id(a) {
        if (a !== this.#id
            && Number.isInteger(a)
            && a >= 0 && a < 7
        ) {
            this.#id = a
            cbH(this.on_id)
        }
    }

    on_rank = new Set()
    #rank = 0
    get rank() { return this.#rank }
    set rank(a) {
        if (a !== this.#rank
            && Number.isInteger(a)
            && a >= 0 && a < 7
        ) {
            this.#rank = a
            cbH(this.on_rank)
        }
    }

    constructor(id, rank) {
        if (id !== undefined) this.id = id
        if (rank !== undefined) this.rank = rank
    }

    toArray = () => [
        this.#id,
        this.#rank
    ]

    fromArray = (array) => {
        if (array?.constructor !== Array) return
        this.id = array[0]
        this.rank = array[1]
    }
}
