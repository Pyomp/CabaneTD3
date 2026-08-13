




import { cbH } from '../../../utils/utils.js'
import { Item_Data } from './Item_Data.js'

const compare = (a, b) => {
    if (a === 0) return 1
    if (b === 0) return -1
    const diffRank = b.rank - a.rank
    if (diffRank === 0) return a.effect - b.effect
    else return diffRank
}

export class Bag_Data {
    #array = []

    constructor(length) {
        this.length = length
        for (let i = 0; i < length; i++) {
            this.#array.push(new Item_Data())
        }
    }

    /** @return {Item_Data} */
    get_item = (index) => {
        const item = this.#array[index]
        return item
    }

    get_empty_place = () => {
        return this.#array.findIndex(a => a.id === 0 && a.rank === 0)
    }

    on_change = new Set()
    /**
     * 
     * @param {number} index 
     * @param {Item_Data} item_data 
     * @returns 
     */
    add_item = (index, item_data) => {
        const item = (index === undefined) ?
            this.#array.find(a => a.id === 0 && a.rank === 0) // check fullness
            : this.#array[index]

        if (item === undefined) return false

        item.id = item_data.id
        item.rank = item_data.rank
        cbH(this.on_change)
        return true
    }

    remove_item = (index) => {
        const item = this.#array[index]
        item.id = 0
        item.rank = 0
        cbH(this.on_change)
    }

    sort = () => {
        this.#array.sort(compare)
    }

    toArray = () => {
        return this.#array.map(a => a.toArray())
    }

    fromArray = (array) => {
        if (array?.constructor !== Array) return
        this.#array.forEach((a, i) => a.fromArray(array[i]))
        cbH(this.on_change)
    }
}


