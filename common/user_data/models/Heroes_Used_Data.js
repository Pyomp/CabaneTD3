
import { cbH } from '../../../utils/utils.js'
import { HEROES_LENGTH } from '../../constants.js'

export class Heroes_Used_Data extends Array {
    array = new Array(12).fill(-1)

    on_change = new Set()
    toArray = () => this.array
    fromArray = (array) => {
        if (array?.constructor !== Array) return
        for (let i = 0; i < HEROES_LENGTH; i++) {
            this[i] = array[i]
        }
    }

    get 0() { return this.array[0] }
    set 0(a) {
        if (a !== this.array[0]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[0] = a
            cbH(this.on_change)
        }
    }

    get 1() { return this.array[1] }
    set 1(a) {
        if (a !== this.array[1]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[1] = a
            cbH(this.on_change)
        }
    }

    get 2() { return this.array[2] }
    set 2(a) {
        if (a !== this.array[2]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[2] = a
            cbH(this.on_change)
        }
    }

    get 3() { return this.array[3] }
    set 3(a) {
        if (a !== this.array[3]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[3] = a
            cbH(this.on_change)
        }
    }

    get 4() { return this.array[4] }
    set 4(a) {
        if (a !== this.array[4]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[4] = a
            cbH(this.on_change)
        }
    }

    get 5() { return this.array[5] }
    set 5(a) {
        if (a !== this.array[5]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[5] = a
            cbH(this.on_change)
        }
    }

    get 6() { return this.array[6] }
    set 6(a) {
        if (a !== this.array[6]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[6] = a
            cbH(this.on_change)
        }
    }

    get 7() { return this.array[7] }
    set 7(a) {
        if (a !== this.array[7]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[7] = a
            cbH(this.on_change)
        }
    }

    get 8() { return this.array[8] }
    set 8(a) {
        if (a !== this.array[8]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[8] = a
            cbH(this.on_change)
        }
    }

    get 9() { return this.array[9] }
    set 9(a) {
        if (a !== this.array[9]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[9] = a
            cbH(this.on_change)
        }
    }

    get 10() { return this.array[10] }
    set 10(a) {
        if (a !== this.array[10]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[10] = a
            cbH(this.on_change)
        }
    }

    get 11() { return this.array[11] }
    set 11(a) {
        if (a !== this.array[11]
            && Number.isInteger(a)
            && a >= -1 && a < HEROES_LENGTH
        ) {
            this.array[11] = a
            cbH(this.on_change)
        }
    }

    *[Symbol.iterator]() {
        yield this[0]
        yield this[1]
        yield this[2]
        yield this[3]
        yield this[4]
        yield this[5]
        yield this[6]
        yield this[7]
        yield this[8]
        yield this[9]
        yield this[10]
        yield this[11]
    }
}







