









import { equation_design } from '../../game_design/balance/equation_design.js'
import { cbH } from '../../utils/utils.js'
import { DT_PHYSICS } from '../constants.js'
import { Evo_Bonus_Manager } from './Evo_Bonus_Managers.js'
import { Plant_Bonus_Manager } from './Plant_Bonus_Manager.js'
import { Team_Bonus_Manager } from './Team_Bonus_Manager.js'
import { Game_State } from '../State.js'
import { User_Data } from '../user_data/User_Data.js'

export class Loop_Manager {
    speed_factor = 1
    frame_updates = new Set()
    updates_physics = new Set()
    now = 0
    dt_physics_raf = 0

    /**
     * @param {User_Data} user_data 
     * @param {Evo_Bonus_Manager} evo_bonus_manager 
     * @param {Plant_Bonus_Manager} plant_bonus_manager 
     * @param {Team_Bonus_Manager} team_bonus_manager 
     * @param {Game_State} state
     */
    constructor(
        user_data,
        evo_bonus_manager,
        plant_bonus_manager,
        team_bonus_manager,
        state,
    ) {
        const update_speed_factor = () => {
            this.speed_factor = equation_design.speed_factor(
                user_data.game.speed,
                evo_bonus_manager.speed,
                team_bonus_manager.game_speed,
                plant_bonus_manager.speed,
                user_data.bonus.speed)
        }
        update_speed_factor()
        user_data.game.on_speed.add(update_speed_factor)
        evo_bonus_manager.on_speed.add(update_speed_factor)
        team_bonus_manager.on_game_speed.add(update_speed_factor)
        plant_bonus_manager.on_speed.add(update_speed_factor)
        user_data.bonus.on_speed.add(update_speed_factor)

        this.update = (dt_p) => {

            const dt = state.value === Game_State.IDLE ? dt_p : dt_p * this.speed_factor

            this.now += dt
            
            this.dt_physics_raf += dt

            while (this.dt_physics_raf > DT_PHYSICS) {
                this.dt_physics_raf -= DT_PHYSICS

                for (const f of this.updates_physics)
                    if (f(DT_PHYSICS) === true)
                        this.updates_physics.delete(f)

                // cbH(this.updates_physics)
            }

            for (const f of this.frame_updates)
                if (f(dt) === true)
                    this.frame_updates.delete(f)
        }

        this.timer = new Timer()
    }
}

class Timer {
    on_second = new Set()
    on_minute = new Set()
    on_hour = new Set()
    on_day = new Set()

    constructor() {
        const Date_now = Date.now
        let now = Date_now()
        let oldNow = now

        const interval = setInterval(() => {
            now = Date_now()
            if (oldNow + (1000 - oldNow % 1000) <= now) {
                for (const f of this.on_second) if (f((now / 1000 | 0) % 60) === true) this.on_second.delete(f)
                if (oldNow + (60000 - oldNow % 60000) <= now) {
                    for (const f of this.on_minute) if (f((now / 60000 | 0) % 60) === true) this.on_minute.delete(f)
                    if (oldNow + (3600000 - oldNow % 3600000) <= now) {
                        for (const f of this.on_hour) if (f((now / 3600000 | 0) % 24) === true) this.on_hour.delete(f)
                        if (oldNow + (84400000 - oldNow % 84400000) <= now) {
                            for (const f of this.on_day) if (f(((now / 84400000 | 0) - 1) % 7) === true) this.on_day.delete(f)
                        }
                    }
                }
            }
            oldNow = now
        }, 1000)

        this.dispose = () => {
            clearInterval(interval)
        }
    }
}



