

import {
    AVERAGE_ENEMY_HP,
    AVERAGE_ENEMY_RANGE
} from '../entities/mobs_design.js'


/////////////////
export const hero_dps = (base_attack, power_add, power_mult, cc_add, cc_mult, dcc_add, dcc_mult, attack_speed, shop) => {

    const ratio_cc = cc_rate(cc_add, cc_mult)
    const power = base_attack
        * shop
        * power_add
        * power_mult

    return power * (1 - ratio_cc)
        + power * (dcc_add / 100 + 1) * dcc_mult * ratio_cc
        / attack_speed
}

export const run_enemy_time = (dist, enemy_range, move_speed) => (dist - enemy_range) * move_speed

export const run_enemies_time_average = (dist) =>
    (dist - AVERAGE_ENEMY_RANGE) * AVERAGE_ENEMY_MOVE_SPEED

export const wave_enemies_dps_average = (wave) => {
    const nb = nb_enemies(wave)
    return AVERAGE_ENEMY_POWER * nb * AVERAGE_ENEMY_ATTACK_SPEED
}
export const tt_time_to_lose = (dist, wave, hp) => {
    return run_enemies_time_average(dist)
        + hp * wave_enemies_dps_average(wave)
}

export const nb_enemies_on_map_per_s = (wave) => {
    return nb_enemies(wave) / time_wave(wave)
}

export const tt_hp_enemies_per_s = (wave) => {
    return nb_enemies_on_map_per_s(wave)
        * hp_enemy(AVERAGE_ENEMY_HP, wave)
}

export const nb_enemies_reach_wall_per_s = (tt_allies_dps, wave) =>
    tt_hp_enemies_per_s(wave) - tt_allies_dps

export const all_enemies_damage = (tt_allies_dps, wave, dist, current_time = 0) => {
    const tt_damages_over_time = []
    let tt_damage = 0
    const run_time = run_enemies_time_average(dist)
    let s = run_time

    for (let i = 0; i < s; i++) tt_damages_over_time.push(0)

    const nb_enemies_reach_wall_s = nb_enemies_reach_wall_per_s(tt_allies_dps, wave)

    let nb_enemies = 0
    const dps_average = wave_enemies_dps_average(wave)
    for (s; s < (time_wave(wave) + run_time); s++) {
        nb_enemies += nb_enemies_reach_wall_s
        tt_damage += nb_enemies * dps_average
        tt_damages_over_time.push(tt_damage)
    }

    const hp_enemy_average = hp_enemy(AVERAGE_ENEMY_HP, wave)
    let tt_enemies_hp = nb_enemies * hp_enemy_average

    while (nb_enemies > 0) {
        tt_enemies_hp -= tt_allies_dps

        tt_damage += nb_enemies * dps_average
        tt_damages_over_time.push(tt_damage)

        nb_enemies = (tt_enemies_hp / hp_enemy_average) | 0
    }
    return tt_damages_over_time
}

export const tt_allies_dps_calcul = (hero_used, hero, shop) => {
    let tt_dps = 0
    for (const hero_id of hero_used) {
        if (hero_id < 0) continue
        const h = hero[hero_id]
        tt_dps += hero_dps(1, h.power_add, h.power_mult, h.cc_add, h.cc_mult, h.dcc_add, h.dcc_mult,
            heroes_design[hero_id].attack_speed,
            shop)
    }
    return tt_dps
}

export const dps_enemies_acceleration = (tt_allies_dps, wave) => {
    tt_hp_enemies_per_s(wave) - tt_allies_dps
}





