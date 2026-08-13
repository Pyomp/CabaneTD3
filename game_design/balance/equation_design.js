




import {
    cc_rate,
    effect,
    gold,
    hero_damage,
    ruby_revive,
    speed_factor,
} from './core_equation_design.js'
import { hp_enemy } from './enemy_equation_design.js'
import {
    cc_add_cost,
    cc_mult_cost,
    dcc_add_cost,
    dcc_mult_cost,
    evolution_cost,
    hp_cost,
    hp_regen_cost,
    mp_cost,
    mp_regen_cost,
    power_add_cost,
    power_mult_cost,
} from './player_equation_design.js'
import {
    all_enemies_damage,
    dps_enemies_acceleration,
    hero_dps,
    nb_enemies_on_map_per_s,
    nb_enemies_reach_wall_per_s,
    run_enemies_time_average,
    run_enemy_time,
    tt_allies_dps_calcul,
    tt_hp_enemies_per_s,
    tt_time_to_lose,
    wave_enemies_dps_average,
} from './test_equation_design.js'
import {
    nb_enemies,
    rand_loot,
    time_wave,
} from './wave_equation_design.js'
import {
    lv_from_xp,
    xp_from_lv,
    xp_tab,
} from './xp_lv_equation_design.js'

export const equation_design = {
    rand_loot: rand_loot,
    cc_rate: cc_rate,
    nb_enemies: nb_enemies,
    speed_factor: speed_factor,
    hero_damage: hero_damage,
    effect: effect,
    gold: gold,
    time_wave: time_wave,
    ruby_revive: ruby_revive,
    power_add_cost: power_add_cost,
    power_mult_cost: power_mult_cost,
    cc_add_cost: cc_add_cost,
    cc_mult_cost: cc_mult_cost,
    dcc_add_cost: dcc_add_cost,
    dcc_mult_cost: dcc_mult_cost,
    evolution_cost: evolution_cost,
    hp_cost: hp_cost,
    mp_cost: mp_cost,
    hp_regen_cost: hp_regen_cost,
    mp_regen_cost: mp_regen_cost,
    hp_enemy: hp_enemy,
    hero_dps: hero_dps,
    run_enemy_time: run_enemy_time,
    run_enemies_time_average: run_enemies_time_average,
    wave_enemies_dps_average: wave_enemies_dps_average,
    tt_time_to_lose: tt_time_to_lose,
    nb_enemies_on_map_per_s: nb_enemies_on_map_per_s,
    tt_hp_enemies_per_s: tt_hp_enemies_per_s,
    nb_enemies_reach_wall_per_s: nb_enemies_reach_wall_per_s,
    all_enemies_damage: all_enemies_damage,
    tt_allies_dps_calcul: tt_allies_dps_calcul,
    dps_enemies_acceleration: dps_enemies_acceleration,
    lv_from_xp: lv_from_xp,
    xp_tab: xp_tab,
    xp_from_lv: xp_from_lv,
}