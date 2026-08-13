



import { Heroes_Placement_Manager } from './Heroes_Placement_Manager.js'
import { Loop_Manager } from './Loop_Manager.js'
import { Team_Bonus_Manager } from './Team_Bonus_Manager.js'
import { Game_Data } from '../user_data/models/Game_Data.js'
import { cbH } from '../../utils/utils.js'

export class Ultimate_System {

    on_ult = new Set()

    /**
     * @param {Game_Data} game_data 
     * @param {Heroes_Placement_Manager} heroes_placement_manager
     * @param {Team_Bonus_Manager} team_bonus_manager
     * @param {Loop_Manager} loop_manager
     */
    constructor(
        game_data,
        heroes_placement_manager,
        team_bonus_manager,
        loop_manager
    ) {
        this.launch = () => {
            if (game_data.ki < 10) return
            game_data.ki -= 10
            const rand = Math.floor(Math.random() * heroes_placement_manager.heroes_used.length)
            heroes_placement_manager.heroes_used[rand].ultimate_request++
            cbH(this.on_ult)
        }

        let age = 0
        const update_ult_auto = (dt) => {
            age += dt
            if (age > 5) {
                age = 0
                this.launch()
            }
        }

        const on_ult_automation = () => {
            if (team_bonus_manager.ult_automation === 1) {
                loop_manager.updates_physics.add(update_ult_auto)
            } else {
                loop_manager.updates_physics.delete(update_ult_auto)
            }
        }
        team_bonus_manager.on_ult_automation.add(on_ult_automation)

        this.dispose = () => {
            loop_manager.updates_physics.delete(update_ult_auto)
            team_bonus_manager.on_ult_automation.delete(on_ult_automation)
        }
    }
}




