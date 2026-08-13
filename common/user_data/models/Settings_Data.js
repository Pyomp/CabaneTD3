


import { cbH } from '../../../utils/utils.js'

export class Settings_Data {

    on_auto_delete_green = new Set()
    #auto_delete_green = 0
    get auto_delete_green() { return this.#auto_delete_green }
    set auto_delete_green(a) {
        if (this.#auto_delete_green != a) {
            this.#auto_delete_green ^= 1
            cbH(this.on_auto_delete_green)
        }
    }

    on_auto_delete_blue = new Set()
    #auto_delete_blue = 0
    get auto_delete_blue() { return this.#auto_delete_blue }
    set auto_delete_blue(a) {
        if (this.#auto_delete_blue != a) {
            this.#auto_delete_blue ^= 1
            cbH(this.on_auto_delete_blue)
        }
    }

    on_auto_delete_violet = new Set()
    #auto_delete_violet = 0
    get auto_delete_violet() { return this.#auto_delete_violet }
    set auto_delete_violet(a) {
        if (this.#auto_delete_violet != a) {
            this.#auto_delete_violet ^= 1
            cbH(this.on_auto_delete_violet)
        }
    }

    on_auto_delete_yellow = new Set()
    #auto_delete_yellow = 0
    get auto_delete_yellow() { return this.#auto_delete_yellow }
    set auto_delete_yellow(a) {
        if (this.#auto_delete_yellow != a) {
            this.#auto_delete_yellow ^= 1
            cbH(this.on_auto_delete_yellow)
        }
    }

    on_tips_display = new Set()
    #tips_display = 0
    get tips_display() { return this.#tips_display }
    set tips_display(a) {
        if (this.#tips_display != a) {
            this.#tips_display ^= 1
            cbH(this.on_tips_display)
        }
    }

    toArray = () => [
        this.#auto_delete_green,
        this.#auto_delete_blue,
        this.#auto_delete_violet,
        this.#auto_delete_yellow,
        this.#tips_display,
    ]

    fromArray = (array) => {
        if(array?.constructor !== Array)return
        let i = 0
        this.auto_delete_green = array[i++]
        this.auto_delete_blue = array[i++]
        this.auto_delete_violet = array[i++]
        this.auto_delete_yellow = array[i++]
        this.tips_display = array[i++]
    }
}

