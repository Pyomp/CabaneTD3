



import { cbH } from '../../../utils/utils.js'

export class HTMLElement_Effect {

    on_brightness_disabled = new Set()
    #brightness_disabled = 0
    get brightness_disabled() { return this.#brightness_disabled }
    set brightness_disabled(a) {
        if (this.#brightness_disabled != a) {
            this.#brightness_disabled ^= 1
            cbH(this.on_brightness_disabled)
        }
    }

    on_blur_disabled = new Set()
    #blur_disabled = 0
    get blur_disabled() { return this.#blur_disabled }
    set blur_disabled(a) {
        if (this.#blur_disabled != a) {
            this.#blur_disabled ^= 1
            cbH(this.on_blur_disabled)
        }
    }

    constructor(element) {

        let brightness = 1
        let blur = 0

        const brightness_map = new Map()
        const blur_map = new Map()

        this.on_blur_disabled.add(() => {
            if (this.blur_disabled === 1) blur_map.clear()
        })
        this.on_brightness_disabled.add(() => {
            if (this.brightness_disabled === 1) brightness_map.clear()
        })

        this.set_brightness = (ref, value) => {
            if (this.#brightness_disabled === 1) return
            brightness_map.set(ref, value)
            update_brightness()
        }
        this.unset_brightness = (ref) => {
            if (this.#brightness_disabled  === 1) return
            brightness_map.delete(ref)
            update_brightness()
        }
        this.set_blur = (ref, value) => {
            if (this.#blur_disabled === 1) return
            blur_map.set(ref, value)
            update_blur()
        }
        this.unset_blur = (ref) => {
            if (this.#blur_disabled === 1) return
            blur_map.delete(ref)
            update_blur()
        }
        const update_brightness = () => {
            brightness = 1
            for (const value of brightness_map.values())
                if (value > brightness) brightness = value

            update_filter()
        }

        const update_blur = () => {
            blur = 0
            for (const value of blur_map.values())
                if (value > blur) blur = value

            update_filter()
        }
        const update_filter = () => {
            element.filter = `brightness(${brightness}) blur(${blur}px)`
        }
        this.toArray = () => [
            this.#brightness_disabled ,
            this.#blur_disabled,
        ]
        this.fromArray = (array) => {
            if (array?.constructor !== Array) return
            this.brightness_disabled = array[0]
            this.blur_disabled = array[1]
        }
    }
}


