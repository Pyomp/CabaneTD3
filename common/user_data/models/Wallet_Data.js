
import { cbH } from '../../../utils/utils.js'

export class Wallet_Data {
    on_gold = new Set()
    #gold = 0
    get gold() { return this.#gold }
    set gold(a) {
        if (this.#gold !== a
            && Number.isFinite(a)
            && a >= 0
        ) {
            this.#gold = a
            cbH(this.on_gold)
        }
    }

    on_ruby = new Set()
    #ruby = 0
    get ruby() { return this.#ruby }
    set ruby(a) {
        if (this.#ruby !== a
            && Number.isFinite(a)
            && a >= 0
        ) {
            this.#ruby = a
            cbH(this.on_ruby)
        }
    }

    on_diamond = new Set()
    #diamond = 0
    get diamond() { return this.#diamond }
    set diamond(a) {
        if (this.#diamond !== a
            && Number.isFinite(a)
            && a >= 0
        ) {
            this.#diamond = a
            cbH(this.on_diamond)
        }
    }

    toArray = () => [
        this.#gold,
        this.#ruby,
        this.#diamond,
    ]

    fromArray = (array)=>{
        if(array?.constructor !== Array) return
        let i = 0
        this.gold = array[i++]
        this.ruby = array[i++]
        this.diamond = array[i++]
    }

}










