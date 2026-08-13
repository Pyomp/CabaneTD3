import { time_wave } from './wave_equation_design.js'




export const cc_rate = (cc_add, cc_mult) => Math.min(((cc_add / 1000) * cc_mult + 10) / 100, 1)

export const speed_factor = (pref, evo, team, plant_ult, shop) => pref * evo * team * plant_ult * ((shop > 0) ? 1.5 : 1)

export const hero_damage = (base_attack, power_add, power_mult, cc_add, cc_mult, dcc_add, dcc_mult, shop) => {
    const damage = base_attack * power_add * power_mult * ((shop > 0) ? 2 : 1)
    if (Math.random() < cc_rate(cc_add, cc_mult))
        return damage * (dcc_add / 100 + 1) * dcc_mult
    else
        return damage

}

export const effect = (base, rank) => (base + rank / 2 * base)

export const gold = (base, wave, evo_gold) => {
    return base * evo_gold
}

export const ruby_revive = (evo_bonus, wave) => {



    const res = 1 + Math.floor((time_wave(wave) ** 1.1) / 30)

    return Math.ceil(evo_bonus * res)
}





