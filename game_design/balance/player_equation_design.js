








// Math.ceil(power_add * Math.ceil(power_add / 30))
export const power_add_cost = (power_add) => 1 + Math.floor(power_add / 4)
export const power_mult_cost = (power_mult) => power_mult ** 2
export const cc_add_cost = (cc_add) => cc_add * 10000
export const cc_mult_cost = (cc_mult) => cc_mult * 10
export const dcc_add_cost = (dcc_add) => dcc_add
export const dcc_mult_cost = (dcc_mult) => dcc_mult ** 2
export const evolution_cost = (evo) => evo ** 2 + 1
export const hp_cost = hp => 1 + Math.floor(hp / 5)
export const mp_cost = mp => mp
export const hp_regen_cost = hp_regen => power_add_cost(hp_regen * 100 - 99)
export const mp_regen_cost = mp_regen => power_add_cost(mp_regen * 100 - 99)








