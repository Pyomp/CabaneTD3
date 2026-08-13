import { Math_random } from '../../utils/math/math_utils.js'


export const nb_enemies = (wave) => Math.min(wave*2 + 3, 500)

export const time_wave = (wave) => Math.min(wave + 5, 100 * 3)


export const rand_loot = (bonus) => { return (Math_random() < 0.02) * bonus }


