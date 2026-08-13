









import { topo_basic } from '../../game_design/topo.js'
import { equation_design } from '../../game_design/balance/equation_design.js'
import { Loop_Manager } from './Loop_Manager.js'
import { Enemy_Manager } from './Enemy_Manager.js'
import { Evo_Bonus_Manager } from './Evo_Bonus_Managers.js'
import { Max_Hp_Manager } from './Max_Hp_Manager.js'
import { Physics } from '../Physics.js'
import { Game_State } from '../State.js'
import { User_Data } from '../user_data/User_Data.js'
import { Bonhomme } from '../entities/enemies/mobs/Bonhomme.js'
import { Sheep } from '../entities/enemies/mobs/Sheep.js'
import { Champ } from '../entities/enemies/mobs/Champ.js'
import { Slime } from '../entities/enemies/mobs/Slime.js'
import { Yombi } from '../entities/enemies/mobs/Yombi.js'
import { DT_PHYSICS } from '../constants.js'
import { array_get_random, cbH } from '../../utils/utils.js'
import { Cerbere } from '../entities/enemies/bosses/Cerbere.js'
import { Mino } from '../entities/enemies/bosses/Mino.js'
import { Titan } from '../entities/enemies/bosses/Titan.js'

export class Wave_System {

    on_invincibility = new Set()
    #invincibility = 0
    get invincibility() { return this.#invincibility }
    set invincibility(a) {
        this.#invincibility = a
        cbH(this.on_invincibility)
    }

    /**
     * @param {Enemy_Manager} enemy_manager 
     * @param {Game_State} state 
     * @param {User_Data} user_data
     * @param {Evo_Bonus_Manager} evo_bonus_manager
     * @param {Loop_Manager} loop_manager
     * @param {Max_Hp_Manager} max_hp_manager
     * @param {Physics} physics
     */
    constructor(
        enemy_manager,
        state,
        user_data,
        evo_bonus_manager,
        loop_manager,
        max_hp_manager,
        physics,
        loot_system
    ) {

        // wave skip
        this.wave_skip = () => {
            if (state.value !== Game_State.WAVE) return
            wave_end()
            for (const enemy of enemy_manager.instances) {
                enemy.dispose()
            }
            win()
        }

        // invincibility
        let invincibility_used = false
        user_data.game.on_hp.add(async () => {
            if (invincibility_used === false
                && state.value === Game_State.WAVE
            ) {
                invincibility_used = true
                this.invincibility = performance.now() + evo_bonus_manager.invincibility
            }
        })

        // enemy flow
        let enemy_timing = []
        let enemy_type = []
        let age = 0
        let enemy_current_nb = 0
        let enemy_wave_nb = 0
        const user_bonus = user_data.bonus
        const game = user_data.game

        this.wave_start = () => {
            if (state.value !== Game_State.IDLE) return
            state.value = Game_State.WAVE

            // bonus
            for (const key of user_bonus.keys())
                if (user_bonus[key] > 0) user_bonus[key]--

            // invincibility
            invincibility_used = false

            // enemy flow
            enemy_timing = get_timing_flow()
            enemy_type = get_wave_enemy_flow()

            // loop
            age = 0
            loop_manager.updates_physics.add(update_spawn)
        }

        const get_timing_flow = () => {
            const time_wave = equation_design.time_wave(game.wave)
            let nb_enemies = equation_design.nb_enemies(game.wave)
            const groups = Math.ceil(nb_enemies / 5)
            const step = time_wave / (groups - 1)
            const res = []
            let time = 0
            while (true) {
                for (let i = 0; i < 5; i++) {
                    nb_enemies--
                    res.push(time + i * .1)
                    if (nb_enemies === 0) return res
                }
                time += step
            }
        }

        const mobs_class = [Bonhomme, Sheep, Champ, Slime, Yombi]
        const get_wave_enemy_flow = () => {
            const nb_enemies = equation_design.nb_enemies(game.wave)
            const a = Math.floor((game.wave % 100) / 20)
            const mobs = [mobs_class[a], mobs_class[(a + 1) % 5]]

            const res = []
            for (let i = 0; i < nb_enemies; i++) {
                if ((i % 10) < 5) res.push(mobs[0])
                else res.push(mobs[1])
            }
            return res
        }

        const bosses_class = [Cerbere, Mino, Titan]

        const create_enemy = (Enemy_Class) => {

            const pos = { x: p.x + (Math.random() - 0.5) * 3, y: p.y, z: p.z }

            new Enemy_Class(
                pos,
                max_hp_manager,
                loop_manager,
                physics,
                user_data,
                enemy_manager,
                evo_bonus_manager,
                loot_system,
            )
        }

        let is_lose = false
        const timeout_celebration_update = () => {

            age += DT_PHYSICS

            if (age > 4) {
                state.value = Game_State.IDLE
                if (is_lose === false && game.repeat === 1) this.wave_start()
                return true
            }
        }

        const check_lose = () => {
            if (game.hp === 0) { is_lose = true; lose() }
        }
        game.on_hp.add(check_lose)

        const win = () => {
            state.value = Game_State.WIN
            game.wave++
            wave_end()
            age = 0
            loop_manager.updates_physics.add(timeout_celebration_update)
        }
        const check_win = () => {
            if (enemy_manager.occurrence === 0) {
                is_lose = false
                win()
            }
        }

        const p = topo_basic.field.enemyAttackPos
        const update_spawn = () => {
            age += DT_PHYSICS

            while (age > enemy_timing[0]) {
                enemy_timing.shift()

                create_enemy(enemy_type.shift())

                if (enemy_timing.length === 0) {
                    if (game.wave !== 0 && (game.wave % 5) === 0)
                        create_enemy(array_get_random(bosses_class))
                    enemy_manager.on_occurrence.add(check_win)
                    check_win()
                    return true
                }
            }

            const nb_enemies_needed = age * enemy_wave_nb
            while (enemy_current_nb < nb_enemies_needed) {
                enemy_current_nb++
                create_enemy()
            }
        }

        const lose = () => {
            state.value = Game_State.GAME_OVER
            wave_end()
            age = 0
            loop_manager.updates_physics.add(timeout_celebration_update)
            enemy_manager.instances.forEach(a => a.win())
        }

        const wave_end = () => {
            enemy_manager.on_occurrence.delete(check_win)
            loop_manager.updates_physics.delete(update_spawn)
        }


        const on_idle = () => {
            game.hp = game.max_hp
            game.mp = game.max_mp
        }
        state.on_change.add(on_idle)

        let wave_gold = 0
        this.add_wave_stats_gold = (gold_amount) => {
            wave_gold += gold_amount
        }

        this.dispose = () => {
            game.on_hp.delete(check_lose)
            enemy_manager.on_occurrence.delete(check_win)
        }
    }
}










