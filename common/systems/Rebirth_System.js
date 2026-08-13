import { equation_design } from '../../game_design/balance/equation_design.js'
import { progress_interface_design } from '../../game_design/progress_design.js'
import { cbH } from '../../utils/utils.js'
import { REBIRTH_MIN_WAVE } from '../constants.js'
import { User_Data } from '../user_data/User_Data.js'



export class Rebirth_System {

    on_rebirth = new Set()

    /**
     * @param {User_Data} user_data 
     */
    constructor(
        user_data,
        evo_bonus
    ) {
        const wallet_data = user_data.wallet
        const student_data = user_data.student
        const game_data = user_data.game
        const heroes_data = user_data.heroes

        this.rebirth = () => {
            if (game_data.lv < progress_interface_design.rebirth
                || game_data.wave < REBIRTH_MIN_WAVE) return
            wallet_data.gold = 0
            student_data.power_add = 1
            student_data.cc_add = 1
            student_data.dcc_add = 1

            for (const hero of heroes_data) {
                hero.power_add = 1
                hero.cc_add = 1
                hero.dcc_add = 1
            }

            game_data.max_hp = 10
            game_data.max_mp = 50
            game_data.hp_regen = 1
            game_data.mp_regen = 1

            wallet_data.ruby += equation_design.ruby_revive(evo_bonus.ruby, game_data.wave)
            game_data.wave = 0
            cbH(this.on_rebirth)
        }
    }
}











