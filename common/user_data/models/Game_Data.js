





import { cbH } from '../../../utils/utils.js'
import { isDev } from '../../../env.js'
import { check_positive_int } from '../../../utils/check.js'
import { MAX_KI } from '../../constants.js'
import { Bag_Data } from './Bag_Data.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { REGEX } from '../../../utils/REGEX.js'

export class Game_Data {
    on_id = new Set()
    #id = 0
    get id() { return this.#id }
    set id(a) {
        if (this.#id !== a
            && check_positive_int(a)
        ) {
            this.#id = a
            cbH(this.on_id)
        }
    }

    on_max_wave = new Set()
    #max_wave = 0
    get max_wave() { return this.#max_wave }
    set max_wave(a) {
        if (this.#max_wave !== a
            && check_positive_int(a)
        ) {
            this.#max_wave = a
            cbH(this.on_max_wave)
        }
    }

    on_tuto = new Set()
    #tuto = 0
    get tuto() { return this.#tuto }
    set tuto(a) {
        if (this.#tuto !== a
            && check_positive_int(a)
        ) {
            this.#tuto = a
            cbH(this.on_tuto)
        }
    }

    on_xp = new Set()
    #xp = 0
    get xp() { return this.#xp }
    set xp(a) {
        if (this.#xp !== a
            && check_positive_int(a)
        ) {
            const eq_lv = equation_design.lv_from_xp(a)
            if (eq_lv !== this.lv) { this.lv = eq_lv; cbH(this.on_lv) }
            this.#xp = a
            cbH(this.on_xp)
        }
    }

    on_lv = new Set()
    lv = 0

    on_wave = new Set()
    #wave = 0
    get wave() { return this.#wave }
    set wave(a) {
        if (this.#wave !== a
            && check_positive_int(a)
        ) {
            this.#wave = a
            cbH(this.on_wave)
        }
    }

    on_pseudo = new Set()
    #pseudo = 'unknown'
    get pseudo() { return this.#pseudo }
    set pseudo(a) {
        if (this.#pseudo !== a
            && a
            && REGEX.alpha_num.test(a)
            && a.length > 2
        ) {
            this.#pseudo = a
            cbH(this.on_pseudo)
        }
    }

    on_last_server_save = new Set()
    #last_server_save = 0
    get last_server_save() { return this.#last_server_save }
    set last_server_save(a) {
        if (this.#last_server_save !== a
            && check_positive_int(a)
        ) {
            this.#last_server_save = a
            cbH(this.on_last_server_save)
        }
    }

    on_max_hp = new Set()
    #max_hp = 10
    get max_hp() { return this.#max_hp }
    set max_hp(a) {
        if (this.#max_hp !== a
            && check_positive_int(a)
        ) {
            this.#max_hp = a
            cbH(this.on_max_hp)
        }
    }

    on_max_mp = new Set()
    #max_mp = 50
    get max_mp() { return this.#max_mp }
    set max_mp(a) {
        if (this.#max_mp !== a
            && check_positive_int(a)
        ) {
            this.#max_mp = a
            cbH(this.on_max_mp)
        }
    }

    on_hp = new Set()
    #hp = this.#max_hp
    get hp() { return this.#hp }
    set hp(a) {
        if (this.#hp !== a
            && Number.isFinite(a)
        ) {
            if (a < 0) {
                if (this.#hp !== 0) {
                    this.#hp = 0
                    cbH(this.on_hp)
                }
            } else {
                this.#hp = Math.min(this.#max_hp, a)
                cbH(this.on_hp)
            }
        }
    }

    on_mp = new Set()
    #mp = this.#max_mp
    get mp() { return this.#mp }
    set mp(a) {
        if (this.#mp !== a
            && check_positive_int(a)
        ) {
            this.#mp = Math.min(this.#max_mp, a)
            cbH(this.on_mp)
        }
    }

    on_hp_regen = new Set()
    #hp_regen = 1
    get hp_regen() { return this.#hp_regen }
    set hp_regen(a) {
        if (this.#hp_regen !== a
            && check_positive_int(a)
        ) {
            this.#hp_regen = a
            cbH(this.on_hp_regen)
        }
    }

    on_mp_regen = new Set()
    #mp_regen = 1
    get mp_regen() { return this.#mp_regen }
    set mp_regen(a) {
        if (this.#mp_regen !== a
            && check_positive_int(a)
        ) {
            this.#mp_regen = a
            cbH(this.on_mp_regen)
        }
    }

    on_ki = new Set()
    #ki = 30
    get ki() { return this.#ki }
    set ki(a) {
        if (this.#ki !== a
            && check_positive_int(a)
        ) {
            this.#ki = Math.min(MAX_KI, a)
            cbH(this.on_ki)
        }
    }

    on_lang = new Set()
    #lang = 0
    get lang() { return this.#lang }
    set lang(a) {
        if (this.#lang !== a
            && check_positive_int(a)
        ) {
            this.#lang = a
            cbH(this.on_lang)
        }
    }

    on_account_linked = new Set()
    #account_linked = 0
    get account_linked() { return this.#account_linked }
    set account_linked(a) {
        if (this.#account_linked !== a
            && check_positive_int(a)
        ) {
            this.#account_linked = a
            cbH(this.on_account_linked)
        }
    }

    on_speed = new Set()
    #speed = 1
    get speed() { return this.#speed }
    set speed(a) {
        if (
            this.#speed !== a
            && a > 0
            && (isDev || a <= 2)
        ) {
            this.#speed = a
            cbH(this.on_speed)
        }
    }

    on_repeat = new Set()
    #repeat = 0
    get repeat() { return this.#repeat }
    set repeat(a) {
        if (this.#repeat !== a) {
            this.#repeat ^= 1
            cbH(this.on_repeat)
        }
    }

    bag = new Bag_Data(60)

    toArray = () => [
        this.#id,
        this.#max_wave,
        this.#tuto,
        this.#xp,
        this.#wave,
        this.#pseudo,
        this.#last_server_save,
        this.#max_hp,
        this.#max_mp,
        this.#hp,
        this.#mp,
        this.#hp_regen,
        this.#mp_regen,
        this.#ki,
        this.#lang,
        this.#account_linked,
        this.#speed,
        this.#repeat,
        this.bag.toArray(),
    ]

    fromArray = (array) => {
        if (array?.constructor !== Array) return
        let i = 0
        this.id = array[i++]
        this.max_wave = array[i++]
        this.tuto = array[i++]
        this.xp = array[i++]
        this.wave = array[i++]
        this.pseudo = array[i++]
        this.last_server_save = array[i++]
        this.max_hp = array[i++]
        this.max_mp = array[i++]
        this.hp = array[i++]
        this.mp = array[i++]
        this.hp_regen = array[i++]
        this.mp_regen = array[i++]
        this.ki = array[i++]
        this.lang = array[i++]
        this.account_linked = array[i++]
        this.speed = array[i++]
        this.repeat = array[i++]
        this.bag.fromArray(array[i++])
    }
}













