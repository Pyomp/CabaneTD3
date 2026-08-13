




import { cbH } from "../utils/utils.js"

/**
 * @typedef {Object} Game_State
*/
export class Game_State {
    static IDLE = 0
    static WAVE = 1
    static WIN = 2
    static GAME_OVER = 3

    on_change = new Set()
    #value = Game_State.IDLE
    get value() { return this.#value }
    set value(a) {
        if (a !== this.#value) {
            this.#value = a
            cbH(this.on_change)
        }
    }
}