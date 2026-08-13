




import { cbH } from "../../utils/utils.js"

export class Plant_Bonus_Manager {

    on_speed = new Set()
    #speed = 1
    get speed() { return this.#speed }
    set speed(a) {
        this.#speed = a
        cbH(this.on_speed)
    }

    on_spawn = new Set()
    #spawn = 1
    get spawn() { return this.#spawn }
    set spawn(a) {
        this.#spawn = a
        cbH(this.on_spawn)
    }
}










