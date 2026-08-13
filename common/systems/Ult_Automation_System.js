import { Ball_System } from './Ball_System.js'
import { Ultimate_System } from './Ultimate_System.js'
import { Loop_Manager } from './Loop_Manager.js'
import { Team_Bonus_Manager } from './Team_Bonus_Manager.js'
import { Game_State } from '../State.js'


export class Ult_Automation_System {
    /**
     * 
     * @param {Team_Bonus_Manager} team_bonus_manager
     * @param {Loop_Manager} loop_manager
     * @param {Ball_System} ball_system
     * @param {Ultimate_System} ultimate_system
     * @param {Game_State} game_stats
     */
    constructor(
        team_bonus_manager,
        loop_manager,
        ball_system,
        ultimate_system,
        game_stats,
    ) {

        let age = 0
        const update = (dt) => {
            if (game_stats.value !== Game_State.WAVE) return
            age += dt
            if (age > 10) {
                age = 0
                for (const instance of ball_system.ki_instances) {
                    instance.click()
                    break
                }
                ultimate_system.launch()
            }
        }



        const on_ult_automation = () => {
            if (team_bonus_manager.ult_automation === 1) {
                loop_manager.updates_physics.add(update)
            } else {
                loop_manager.updates_physics.delete(update)
            }
        }

        team_bonus_manager.on_ult_automation.add(on_ult_automation)
        this.dispose = () => {
            loop_manager.updates_physics.delete(update)
            team_bonus_manager.on_ult_automation.delete(on_ult_automation)
        }

    }
}










