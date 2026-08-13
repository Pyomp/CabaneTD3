




import { progress_interface_design } from '../../game_design/progress_design.js'
import { Game_Data } from '../user_data/models/Game_Data.js'

export class Game_Settings_System {
    /**
     * 
     * @param {Game_Data} game_data 
     * @param {Upgr} lv 
     */
    constructor(
        game_data,
    ) {
        this.speed_toggle = () => {
            if (game_data.lv < progress_interface_design.speed) return
            game_data.speed += 0.5
            if (game_data.speed > 2.1) game_data.speed = 1
        }
        this.repeat_toggle = () => {
            if (game_data.lv < progress_interface_design.repeat) return
            game_data.repeat ^= 1
        }
    }
}









