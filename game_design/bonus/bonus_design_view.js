









import {
    BONUS_DAMAGE_MULT,
    BONUS_ENEMY_SPAWN_SPEED,
    BONUS_GOLD_110_PERCENT,
    BONUS_LENGTH,
    BONUS_LOOT,
    BONUS_SPEED_150_PERCENT,
} from './bonus_design_data.js'

/** @type {[Bonus]} */
export const bonus_design_view = new Array(BONUS_LENGTH)


class Bonus_Design_View {
    constructor(id, name = '', desc = '') {
        this.name = name
        this.desc = desc
        bonus_design_view[id] = this
    }
}

new Bonus_Design_View(BONUS_DAMAGE_MULT, 'bonus_damage', 'bonus_damage_desc')
new Bonus_Design_View(BONUS_SPEED_150_PERCENT, 'bonus_speed', 'bonus_speed_desc')
new Bonus_Design_View(BONUS_GOLD_110_PERCENT, 'bonus_gold', 'bonus_gold_desc')
new Bonus_Design_View(BONUS_ENEMY_SPAWN_SPEED, 'enemy_spaw', 'bonus_enemy_spaw_desc')
new Bonus_Design_View(BONUS_LOOT, 'loot', 'loot_damage_desc')






























