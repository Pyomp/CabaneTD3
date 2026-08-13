

import { cbH } from "../../../utils/utils.js"

class Data {
    on_last_save = new Set()
    #last_save = 0
    get last_save() { return this.#last_save }
    set last_save(a) {
        if (a !== this.#last_save
            && Number.isInteger(a)
            && a >= 0 && a <= Infinity
        ) {
            this.#last_save = a
            cbH(this.on_last_save)
        }
    }
    toArray = () => [
        this.#last_save
    ]
    fromArray = (array) => {
        if (array?.constructor !== Array) return
        this.last_save = array[0]
    }

}

class Daily {
    on_wave = new Set()
    #wave = 0
    get wave() { return this.#wave }
    set wave(a) {
        if (a !== this.#wave
            && Number.isInteger(a)
            && a >= 0 && a <= 11
        ) {
            this.#wave = a
            cbH(this.on_wave)
        }
    }

    on_mp = new Set()
    #mp = 0
    get mp() { return this.#mp }
    set mp(a) {
        if (a !== this.#mp
            && Number.isInteger(a)
            && a >= 0 && a <= 101
        ) {
            this.#mp = a
            cbH(this.on_mp)
        }
    }

    on_rebirth = new Set()
    #rebirth = 0
    get rebirth() { return this.#rebirth }
    set rebirth(a) {
        if (a !== this.#rebirth
            && Number.isInteger(a)
            && a >= 0 && a <= 2
        ) {
            this.#rebirth = a
            cbH(this.on_rebirth)
        }
    }

    on_ducky = new Set()
    #ducky = 0
    get ducky() { return this.#ducky }
    set ducky(a) {
        if (a !== this.#ducky
            && Number.isInteger(a)
            && a >= 0 && a <= 2
        ) {
            this.#ducky = a
            cbH(this.on_ducky)
        }
    }

    on_ult = new Set()
    #ult = 0
    get ult() { return this.#ult }
    set ult(a) {
        if (a !== this.#ult
            && Number.isInteger(a)
            && a >= 0 && a <= 3
        ) {
            this.#ult = a
            cbH(this.on_ult)
        }
    }

    toArray() {
        return [
            this.#wave,
            this.#mp,
            this.#rebirth,
            this.#ducky,
            this.#ult,
        ]
    }

    fromArray(array) {
        if (array?.constructor !== Array) return
        let i = 0
        this.wave = array[i++]
        this.mp = array[i++]
        this.rebirth = array[i++]
        this.ducky = array[i++]
        this.ult = array[i++]
    }

    keys() {
        return [
            'wave',
            'mp',
            'rebirth',
            'ducky',
            'ult',
        ]
    }

}

class Weekly {
    on_wave = new Set()
    #wave = 0
    get wave() { return this.#wave }
    set wave(a) {
        if (a !== this.#wave
            && Number.isInteger(a)
            && a >= 0 && a <= 10_001
        ) {
            this.#wave = a
            cbH(this.on_wave)
        }
    }

    toArray() {
        return [
            this.#wave
        ]
    }

    keys() {
        return [
            'wave'
        ]
    }

    fromArray(array) {
        if (array?.constructor !== Array) return
        this.wave = array[0]
    }

}

export class Quest_Data {
    data = new Data()
    daily = new Daily()
    weekly = new Weekly()

    toArray = () => [
        this.data.toArray(),
        this.daily.toArray(),
        this.weekly.toArray(),
    ]

    fromArray = (array) => {
        if (array?.constructor !== Array) return
        let i = 0
        this.data.fromArray(array[i++])
        this.daily.fromArray(array[i++])
        this.weekly.fromArray(array[i++])
    }
}
















