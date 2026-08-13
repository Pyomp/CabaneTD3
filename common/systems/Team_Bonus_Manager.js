





import { heroes_design } from '../../game_design/entities/heroes_design.js'
import { cbH } from '../../utils/utils.js'
import { Heroes_Used_Data } from '../user_data/models/Heroes_Used_Data.js'

export class Team_Bonus_Manager {
    on_students_power = new Set()
    #students_power = 1
    get students_power() { return this.#students_power }
    set students_power(a) {
        this.#students_power = a
        cbH(this.on_students_power)
    }

    on_kitsune_speed = new Set()
    #kitsune_speed = 1
    get kitsune_speed() { return this.#kitsune_speed }
    set kitsune_speed(a) {
        this.#kitsune_speed = a
        cbH(this.on_kitsune_speed)
    }

    on_magicians_speed = new Set()
    #magicians_speed = 1
    get magicians_speed() { return this.#magicians_speed }
    set magicians_speed(a) {
        this.#magicians_speed = a
        cbH(this.on_magicians_speed)
    }

    on_witches_speed = new Set()
    #witches_speed = 1
    get witches_speed() { return this.#witches_speed }
    set witches_speed(a) {
        this.#witches_speed = a
        cbH(this.on_witches_speed)
    }

    on_animals_speed = new Set()
    #animals_speed = 1
    get animals_speed() { return this.#animals_speed }
    set animals_speed(a) {
        this.#animals_speed = a
        cbH(this.on_animals_speed)
    }

    on_ult_automation = new Set()
    #ult_automation = 0
    get ult_automation() { return this.#ult_automation }
    set ult_automation(a) {
        this.#ult_automation = a
        cbH(this.on_ult_automation)
    }

    on_fireworks_hide = new Set()
    #fireworks_hide = 1
    get fireworks_hide() { return this.#fireworks_hide }
    set fireworks_hide(a) {
        this.#fireworks_hide = a
        cbH(this.on_fireworks_hide)
    }

    on_game_speed = new Set()
    #game_speed = 1
    get game_speed() { return this.#game_speed }
    set game_speed(a) {
        this.#game_speed = a
        cbH(this.on_game_speed)
    }

    /**
     * 
     * @param {Heroes_Used_Data} heroes_used 
     */
    constructor(heroes_used) {
        const update = () => {
            let students_power_buffer = 1
            let kitsunes_speed_buffer = 1
            let magicians_speed_buffer = 1
            let witches_speed_buffer = 1
            let animals_speed_buffer = 1
            let ult_automation_buffer = 0
            let fireworks_hide_buffer = 0
            let game_speed_buffer = 1

            const a = heroes_used.array
            if (a.includes(heroes_design.nuraty.id)
                && a.includes(heroes_design.johan.id)
                && a.includes(heroes_design.susiku.id)) {
                students_power_buffer += 0.25
                kitsunes_speed_buffer = 2
            }
            if (a.includes(heroes_design.green.id)
                && a.includes(heroes_design.red.id)
                && a.includes(heroes_design.cyan.id)) {
                students_power_buffer += 0.25
                magicians_speed_buffer = 2
            }
            if (a.includes(heroes_design.kitsune_water.id)
                && a.includes(heroes_design.kitsune_thunder.id)
                && a.includes(heroes_design.kitsune_fire.id)) {
                students_power_buffer += 0.25
                animals_speed_buffer = 2
            }
            if (a.includes(heroes_design.hama.id)
                && a.includes(heroes_design.claudette.id)
                && a.includes(heroes_design.robin.id)) {
                students_power_buffer += 0.25
                witches_speed_buffer = 2
            }
            if (a.includes(heroes_design.carna.id)
                && a.includes(heroes_design.flavo.id)) {
                ult_automation_buffer = 1
            }
            if (a.includes(heroes_design.mama.id)
                && a.includes(heroes_design.papa.id)) {
                fireworks_hide_buffer = 1
            }
            if (a.includes(heroes_design.employee.id)
                && a.includes(heroes_design.engineer.id)) {
                game_speed_buffer += 0.1
            }

            if (this.#students_power !== students_power_buffer) {
                this.students_power = students_power_buffer
            }
            if (this.#kitsune_speed !== kitsunes_speed_buffer) {
                this.kitsune_speed = kitsunes_speed_buffer
            }
            if (this.#magicians_speed !== magicians_speed_buffer) {
                this.magicians_speed = magicians_speed_buffer
            }
            if (this.#witches_speed !== witches_speed_buffer) {
                this.witches_speed = witches_speed_buffer
            }
            if (this.#animals_speed !== animals_speed_buffer) {
                this.animals_speed = animals_speed_buffer
            }
            if (this.#ult_automation !== ult_automation_buffer) {
                this.ult_automation = ult_automation_buffer
            }
            if (this.#fireworks_hide !== fireworks_hide_buffer) {
                this.fireworks_hide = fireworks_hide_buffer
            }
            if (this.#game_speed !== game_speed_buffer) {
                this.game_speed = game_speed_buffer
            }
        }
        heroes_used.on_change.add(update)
        this.dispose = () => {
            heroes_used.on_change.delete(update)
        }
    }

}







