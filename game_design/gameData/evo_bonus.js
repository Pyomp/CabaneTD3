

import { heroes_design } from '../../../game_design/entities/heroes_design.js'
import { HEROES_DATA_EVO } from '../../../game_design/appData/appData_heroes_design.js'

export const GAME_DATA_EVO_BONUS_GOLD = 0
export const GAME_DATA_EVO_BONUS_RUBY = 1
export const GAME_DATA_EVO_BONUS_SPEED = 2
export const GAME_DATA_EVO_BONUS_KI = 3
export const GAME_DATA_EVO_BONUS_WAVE_JUMP = 4
export const GAME_DATA_EVO_BONUS_INVINCIBILTY = 5
export const GAME_DATA_EVO_BONUS_LENGTH = 6
export const default_gameData_evo_bonus = [
    1, // gold
    1, // ruby
    1, // speed
    1, // qi
    1, // wave jump
    1, // invincibility
]

export const update_game_data_evo_bonus = (array, heroes) => {
    let gold_new = 1
    let ruby_new = 1
    let speed_new = 1
    let ki_new = 1
    let wave_jump_new = 1
    let invincibility_new = 1

    for (let i = 0, n = heroes.length; i < n; i++) {
        const hero = heroes[i]
        for (let j = 0; j < hero[HEROES_DATA_EVO]; j++) {
            gold_new += heroes_design[i].evolutions[j].gold
            ruby_new += heroes_design[i].evolutions[j].ruby
            speed_new += heroes_design[i].evolutions[j].speed
            ki_new += heroes_design[i].evolutions[j].ki
            wave_jump_new += heroes_design[i].evolutions[j].wave_jump
            invincibility_new += heroes_design[i].evolutions[j].invincibility
        }
    }

    if (array[GAME_DATA_EVO_GOLD] !== gold_new) {
        array[GAME_DATA_EVO_GOLD] = gold_new
    }
    if (array[GAME_DATA_EVO_RUBY] !== ruby_new) {
        array[GAME_DATA_EVO_RUBY] = ruby_new
    }
    if (array[GAME_DATA_EVO_SPEED] !== speed_new) {
        array[GAME_DATA_EVO_SPEED] = speed_new
    }
    if (array[GAME_DATA_EVO_KI] !== ki_new) {
        array[GAME_DATA_EVO_KI] = ki_new
    }
    if (array[GAME_DATA_EVO_WAVE_JUMP] !== wave_jump_new) {
        array[GAME_DATA_EVO_WAVE_JUMP] = wave_jump_new
    }
    if (array[GAME_DATA_EVO_INVINCIBILTY] !== invincibility_new) {
        array[GAME_DATA_EVO_INVINCIBILTY] = invincibility_new
    }
}

