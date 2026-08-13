


import { cbH } from '../../../utils/utils.js'


export class Bonus_Data {
    on_damage = new Set()
    #damage = 0
    get damage() { return this.#damage }
    set damage(a) {
        if (a !== this.#damage
            && Number.isInteger(a)
            && a >= 0 && a < Infinity
        ) {
            this.#damage = a
            cbH(this.on_damage)
        }
    }

    on_speed = new Set()
    #speed = 0
    get speed() { return this.#speed }
    set speed(a) {
        if (this.#speed !== a
            && Number.isInteger(a)
            && a >= 0 && a < Infinity
        ) {
            this.#speed = a
            cbH(this.on_speed)
        }
    }

    on_gold = new Set()
    #gold = 0
    get gold() { return this.#gold }
    set gold(a) {
        if (this.#gold !== a
            && Number.isInteger(a)
            && a >= 0 && a < Infinity
        ) {
            this.#gold = a
            cbH(this.on_gold)
        }
    }

    on_enemy_spawn = new Set()
    #enemy_spawn = 0
    get enemy_spawn() { return this.#enemy_spawn }
    set enemy_spawn(a) {
        if (this.#enemy_spawn !== a
            && Number.isInteger(a)
            && a >= 0 && a < Infinity
        ) {
            this.#enemy_spawn = a
            cbH(this.on_enemy_spawn)
        }
    }

    on_loot = new Set()
    #loot = 0
    get loot() { return this.#loot }
    set loot(a) {
        if (this.#loot !== a
            && Number.isInteger(a)
            && a >= 0 && a < Infinity
        ) {
            this.#loot = a
            cbH(this.on_loot)
        }
    }

    toArray() {
        return [
            this.#damage,
            this.#speed,
            this.#enemy_spawn,
            this.#gold,
            this.#loot,
        ]
    }

    fromArray(array) {
        if (array?.constructor !== Array) return
        let i = 0
        this.damage = array[i++]
        this.speed = array[i++]
        this.enemy_spawn = array[i++]
        this.gold = array[i++]
        this.loot = array[i++]
    }

    keys() {
        return [
            'damage',
            'speed',
            'enemy_spawn',
            'gold',
            'loot',
        ]
    }
}








