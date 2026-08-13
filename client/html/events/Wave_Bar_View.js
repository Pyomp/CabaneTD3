import { Game_State } from '../../../common/State.js'
import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'
import { Game_Data } from '../../../common/user_data/models/Game_Data.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { createHTMLElement } from '../utils/htmlElement.js'

export class Wave_Bar_View {

    /**
     * @param {HTMLElement} parent
     * @param {Game_Data} game_data
     * @param {Game_State} game_state 
     * @param {Loop_Manager} loop_manager
     */
    constructor(
        parent,
        game_data,
        game_state,
        loop_manager,
    ) {
        const wave_bar = createHTMLElement('div', {
            position: "fixed",
            width: "13px",
            height: "30%",
            right: "5px",
            bottom: "35%",
            backgroundColor: "white",
            borderRadius: "1em",
            overflow: "hidden",
        })
        const s = wave_bar.style

        let age = 0
        let end_spawn_time = 0
        const on_new_wave = () => {
            if (game_state.value !== Game_State.WAVE) return
            age = 0
            end_spawn_time = equation_design.time_wave(game_data.wave)
            parent.appendChild(wave_bar)
            loop_manager.frame_updates.add(update)
        }

        game_state.on_change.add(on_new_wave)

        const set_wave_bar = (time_normalized) => {
            if (time_normalized > 1) {
                stop()
            } else {
                const percent = (time_normalized * 100).toFixed(0)
                s.background = `linear-gradient(white ${percent}%, hsl(30, 100%, 70%) ${percent}%)`
            }
        }

        const update = (dt) => {
            age += dt
            set_wave_bar(age / end_spawn_time)
        }

        const stop = () => {
            wave_bar.remove()
            loop_manager.frame_updates.delete(update)
        }
    }
}





