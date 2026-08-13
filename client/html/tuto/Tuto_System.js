import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'
import { Game_Data } from '../../../common/user_data/models/Game_Data.js'
import { Tuto_0_First_Wave_View } from './0_Tuto_First_Wave_View.js'
import { Tuto_Focus_View } from './Tuto_Focus_View.js'

export class Tuto_System {
    static TUTO_FIRST_WAVE = 1

    /**
     * 
     * @param {Loop_Manager} loop_manager 
     * @param {Game_Data} game_data
     */
    constructor(
        loop_manager,
        game_data,
    ) {
        const tuto_focus_view = new Tuto_Focus_View(
            loop_manager,
        )

        if ((game_data.tuto & Tuto_System.TUTO_FIRST_WAVE) === 0) {
            new Tuto_0_First_Wave_View(
                game_data,
                tuto_focus_view.tuto_view
            )
        }


    }
}




