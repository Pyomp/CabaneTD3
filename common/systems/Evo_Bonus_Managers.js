










import { heroes_design } from '../../game_design/entities/heroes_design.js'
import { cbH } from '../../utils/utils.js'
import { Heroes_Data } from '../user_data/models/Heroes_Data.js'
import { Hero_Data } from '../user_data/models/Hero_Data.js'

export class Evo_Bonus_Manager {
    on_gold = new Set()
    #gold = 1
    get gold() { return this.#gold }
    set gold(a) {
        this.#gold = a
        cbH(this.on_gold)
    }

    on_ruby = new Set()
    #ruby = 1
    get ruby() { return this.#ruby }
    set ruby(a) {
        this.#ruby = a
        cbH(this.on_ruby)
    }

    on_speed = new Set()
    #speed = 1
    get speed() { return this.#speed }
    set speed(a) {
        this.#speed = a
        cbH(this.on_speed)
    }

    on_ki = new Set()
    #ki = 1
    get ki() { return this.#ki }
    set ki(a) {
        this.#ki = a
        cbH(this.on_ki)
    }

    on_wave_jump = new Set()
    #wave_jump = 1
    get wave_jump() { return this.#wave_jump }
    set wave_jump(a) {
        this.#wave_jump = a
        cbH(this.on_wave_jump)
    }

    on_invincibility = new Set()
    #invincibility = 1
    get invincibility() { return this.#invincibility }
    set invincibility(a) {
        this.#invincibility = a
        cbH(this.on_invincibility)
    }

    /**
    * @param {Heroes_Data} heroes_data 
    */
    constructor(heroes_data) {
        const update = () => {
            let gold_new = 1
            let ruby_new = 1
            let speed_new = 1
            let ki_new = 1
            let wave_jump_new = 1
            let invincibility_new = 1

            for (const key in heroes_data) {
                const hero = heroes_data[key]
                for (let j = 0; j < hero.evo; j++) {
                    const evo = heroes_design[key].evolutions[j]
                    gold_new += evo.gold
                    ruby_new += evo.ruby
                    speed_new += evo.speed
                    ki_new += evo.ki
                    wave_jump_new += evo.wave_jump
                    invincibility_new += evo.invincibility
                }
            }

            if (this.#gold !== gold_new) {
                this.gold = gold_new
            }
            if (this.#ruby !== ruby_new) {
                this.ruby = ruby_new
            }
            if (this.#speed !== speed_new) {
                this.speed = speed_new
            }
            if (this.#ki !== ki_new) {
                this.ki = ki_new
            }
            if (this.#wave_jump !== wave_jump_new) {
                this.wave_jump = wave_jump_new
            }
            if (this.#invincibility !== invincibility_new) {
                this.invincibility = invincibility_new
            }
        }

        for (const key in heroes_design) {
            /**@type {Hero_Data}*/
            const hero = heroes_data[key]
            hero.on_evo.add(update)
        }
        
        this.dispose = () => {
            for (const key in heroes_data) {
                /**@type {Hero_Data}*/
                const hero = heroes_data[key]
                hero.on_evo.delete(update)
            }
        }
    }
}













