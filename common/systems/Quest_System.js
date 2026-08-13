import { Math_max, Math_min } from '../../utils/math/math_utils.js'
import { QUEST_DAILY_MP_GOAL, QUEST_DAILY_REBIRTH_GOAL, QUEST_DAILY_ULT_GOAL, QUEST_DAILY_WAVE_GOAL, QUEST_WEEKLY_WAVE_GOAL } from '../constants.js'
import { User_Data } from '../user_data/User_Data.js'
import { Loop_Manager } from './Loop_Manager.js'
import { Rebirth_System } from './Rebirth_System.js'
import { Ultimate_System } from './Ultimate_System.js'

export class Quest_System {
    constructor(
        /** @type {User_Data} */ user_data,
        /** @type {Rebirth_System} */ rebirth_system,
        /** @type {Ultimate_System} */ ultimate_system,
        /** @type {Loop_Manager} */ loop_manager,
    ) {
        const disposes = []

        const data = user_data.quest.data
        const daily = user_data.quest.daily
        const weekly = user_data.quest.weekly
        const game_data = user_data.game
        const bonus = user_data.bonus

        this.click_ducky = () => { if (daily.ducky === 0) daily.ducky = 1 }
        this.recolt_ducky = () => {
            if (daily.ducky === 1) {
                daily.ducky = 2
                bonus.enemy_spawn += 30
            }
        }

        {// mp
            let last_mp = game_data.mp
            const on_mp = () => {
                const current = game_data.mp
                if (daily.mp < QUEST_DAILY_MP_GOAL && last_mp > current) {
                    daily.mp = Math_min(daily.mp + last_mp - current, QUEST_DAILY_MP_GOAL)
                }
                last_mp = current
            }
            game_data.on_mp.add(on_mp)
            disposes.push(() => { game_data.on_mp.delete(on_mp) })

            this.recolt_mp = () => {
                if (daily.mp === QUEST_DAILY_MP_GOAL) {
                    daily.mp = QUEST_DAILY_MP_GOAL + 1
                    bonus.loot += 30
                }
            }
        }

        {// Waves
            let last = game_data.wave
            const cb = () => {
                const current = game_data.wave
                const delta = current - last
                if (daily.wave < QUEST_DAILY_WAVE_GOAL && delta > 0) {
                    daily.wave = Math_min(daily.wave + delta, QUEST_DAILY_WAVE_GOAL)
                }
                if (weekly.wave < QUEST_WEEKLY_WAVE_GOAL && last > current) {
                    weekly.wave = Math_min(weekly.wave + delta, QUEST_WEEKLY_WAVE_GOAL)
                }
                last = current
            }
            game_data.on_wave.add(cb)
            disposes.push(() => { game_data.on_wave.delete(cb) })

            this.recolt_daily_wave = () => {
                if (daily.wave === QUEST_DAILY_WAVE_GOAL) {
                    daily.wave = QUEST_DAILY_WAVE_GOAL + 1
                    bonus.damage += 30
                }
            }
            this.recolt_weekly_wave = () => {
                if (weekly.wave === QUEST_WEEKLY_WAVE_GOAL) {
                    weekly.wave = QUEST_WEEKLY_WAVE_GOAL + 1
                    bonus.damage += 300
                }
            }
        }

        { // rebirth
            const cb = () => { if (daily.rebirth < QUEST_DAILY_REBIRTH_GOAL) daily.rebirth++ }
            rebirth_system.on_rebirth.add(cb)
            disposes.push(() => { rebirth_system.on_rebirth.delete(cb) })

            this.recolt_rebirth = () => {
                if (daily.rebirth === QUEST_DAILY_REBIRTH_GOAL) {
                    daily.rebirth = QUEST_DAILY_REBIRTH_GOAL + 1
                    bonus.gold += 30
                }
            }
        }

        { // ult
            const cb = () => { if (daily.ult < QUEST_DAILY_ULT_GOAL) daily.ult++ }
            ultimate_system.on_ult.add(cb)
            disposes.push(() => { ultimate_system.on_ult.delete(cb) })

            this.recolt_ult = () => {
                if (daily.ult === QUEST_DAILY_ULT_GOAL) {
                    daily.ult = QUEST_DAILY_ULT_GOAL + 1
                    bonus.speed += 30
                }
            }
        }

        //------- reset ----------
        const reset_quests = (is_monday) => {
            daily.ducky = 0
            daily.wave = 0
            daily.mp = 0
            daily.ult = 0
            daily.rebirth = 0

            if (is_monday === true) {
                weekly.wave = 0
            }
        }

        loop_manager.timer.on_day.add((d) => {
            reset_quests(d === 0)
        })
        { // event on change
            const update_last_save = () => { data.last_save = Date.now() }
            daily.on_mp.add(update_last_save)
            daily.on_rebirth.add(update_last_save)
            daily.on_ult.add(update_last_save)
            daily.on_wave.add(update_last_save)
            daily.on_ducky.add(update_last_save)
            weekly.on_wave.add(update_last_save)
        }
        { // on load reset
            const last_save_day = new Date(data.last_save).getDay()
            const current_day = new Date().getDay()
            if (last_save_day !== current_day) {
                reset_quests(last_save_day === 1)
            }
        }

        this.dispose = () => {
            for (const f of disposes) { f() }
            disposes.length = 0
        }
    }
}







