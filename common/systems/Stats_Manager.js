



import { cbH } from '../../utils/utils.js'
import { DT_PHYSICS } from '../constants.js'
import { Game_State } from '../State.js'
import { Heroes_Data } from '../user_data/models/Heroes_Data.js'
import { Loop_Manager } from './Loop_Manager.js'




export class Stats_Manager {
    total_damage = 0
    students_damage = 0
    heroes_damage = {}
    on_change = new Set()

    /**
     * 
     * @param {Heroes_Data} heroes_data 
     * @param {Game_State} state 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        heroes_data,
        state,
        loop_manager,
    ) {

        for (const key in heroes_data)
            this.heroes_damage[key] = 0

        this.add_heroes_damage = (name, damage) => {
            this.heroes_damage[name] += damage
            this.total_damage += damage
            cbH(this.on_change)
            this.dps = this.total_damage / this.wave_time
        }

        this.add_students_damage = (damage) => {
            this.students_damage += damage
            this.total_damage += damage
            cbH(this.on_change)
            this.dps = this.total_damage / this.wave_time
        }

        this.get_mvp = () => {
            const hero = Object.entries(this.heroes_damage)
                .sort((a, b) => b[1] - a[1])[0]
            return hero[1] < this.students_damage ? 'student' : hero[0]
        }

        const reset = () => {
            for (const key in this.heroes_damage)
                this.heroes_damage[key] = 0

            this.students_damage = 0
            this.dps = 0
            this.wave_time = 0
            this.total_damage = 0
            cbH(this.on_change)
        }

        this.dps = 0
        this.wave_time = 0
        this.session_wave_win_nb = 0

        const update_dps = () => {
            this.wave_time += DT_PHYSICS
        }

        state.on_change.add(() => {
            if (state.value === Game_State.WIN) {
                this.session_wave_win_nb++
            }
        })

        state.on_change.add(() => {
            if (state.value === Game_State.WAVE) {
                reset()
                loop_manager.updates_physics.add(update_dps)
            } else if (state.value === Game_State.IDLE) {
                loop_manager.updates_physics.delete(update_dps)
            }
        })
    }
}







