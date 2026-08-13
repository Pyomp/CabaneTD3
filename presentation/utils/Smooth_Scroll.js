import { easing } from '../../utils/easing.js'




export class Smooth_Scroll {
    #updates
    /** @type {HTMLElement} */ #element
    #age = 0
    #last = 0
    #target = 0
    #delta_target = 0
    get target() { return this.#target }
    set target(a) {
        this.#age = 0
        this.#last = this.#element.scrollTop
        this.#target = a
        this.#delta_target = this.#target - this.#last
        this.#updates.add(this.#update)
    }

    #update = (dt) => {
        this.#age += dt
        this.#age /= this.fade
        if (this.#age > 1) {
            this.#updates.delete(this.#update)
            this.#element.scrollTop = this.#target
            return
        }
        this.#element.scrollTop = this.#last + this.#delta_target * easing.cubic.out(this.#age)
    }

    constructor(
        updates,
        element,
        fade = 1,
    ) {
        this.#updates = updates
        this.#element = element
        this.fade = fade
    }
}







