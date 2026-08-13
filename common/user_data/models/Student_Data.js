



import { cbH } from '../../../utils/utils.js'
import { TARGET_LENGTH, TARGET_MODE_RANDOM } from '../../constants.js'

export class Student_Data {

    #power_add = 1
    #power_mult = 1
    #cc_add = 1
    #cc_mult = 1
    #dcc_add = 1
    #dcc_mult = 1
    #target = TARGET_MODE_RANDOM

    toArray = () => [
        this.#power_add,
        this.#power_mult,
        this.#cc_add,
        this.#cc_mult,
        this.#dcc_add,
        this.#dcc_mult,
        this.#target,
    ]

    fromArray = (data) => {
        if (data?.constructor !== Array) return
        this.power_add = data[0]
        this.power_mult = data[1]
        this.cc_add = data[2]
        this.cc_mult = data[3]
        this.dcc_add = data[4]
        this.dcc_mult = data[5]
        this.target = data[6]
    }

    on_power_add = new Set()
    get power_add() { return this.#power_add }
    set power_add(a) {
        if (a !== this.#power_add
            && Number.isInteger(a)
            && a > 0
        ) {
            this.#power_add = a
            cbH(this.on_power_add)
        }
    }

    on_power_mult = new Set()
    get power_mult() { return this.#power_mult }
    set power_mult(a) {
        if (a !== this.#power_mult
            && Number.isInteger(a)
            && a > 0
        ) {
            this.#power_mult = a
            cbH(this.on_power_mult)
        }
    }

    on_cc_add = new Set()
    get cc_add() { return this.#cc_add }
    set cc_add(a) {
        if (a !== this.#cc_add
            && Number.isInteger(a)
            && a > 0
        ) {
            this.#cc_add = a
            cbH(this.on_cc_add)
        }
    }

    on_cc_mult = new Set()
    get cc_mult() { return this.#cc_mult }
    set cc_mult(a) {
        if (a !== this.#cc_mult
            && Number.isInteger(a)
            && a > 0
        ) {
            this.#cc_mult = a
            cbH(this.on_cc_mult)
        }
    }

    on_dcc_add = new Set()
    get dcc_add() { return this.#dcc_add }
    set dcc_add(a) {
        if (a !== this.#dcc_add
            && Number.isInteger(a)
            && a > 0
        ) {
            this.#dcc_add = a
            cbH(this.on_dcc_add)
        }
    }

    on_dcc_mult = new Set()
    get dcc_mult() { return this.#dcc_mult }
    set dcc_mult(a) {
        if (a !== this.#dcc_mult
            && Number.isInteger(a)
            && a > 0
        ) {
            this.#dcc_mult = a
            cbH(this.on_dcc_mult)
        }
    }

    on_target = new Set()
    get target() { return this.#target }
    set target(a) {
        if (a !== this.#target
            && Number.isInteger(a)
            && a >= 0 && a < TARGET_LENGTH
        ) {
            this.#target = a
            cbH(this.on_target)
        }
    }
}












