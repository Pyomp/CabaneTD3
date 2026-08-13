import { equation_design } from '../../game_design/balance/equation_design.js'
import { item_design } from '../../game_design/items/item_design_data.js'

export class Damage_System {
    constructor(
        bonus_data,
        stats_manager,
        effect_system,
        enemy_manager,
    ) {
        this.hero_damage = (hero_data, name, target) => {
            const power = equation_design.hero_damage(
                1,// base attack
                hero_data.power_add,
                hero_data.power_mult,
                hero_data.cc_add,
                hero_data.cc_mult,
                hero_data.dcc_add,
                hero_data.dcc_mult,
                bonus_data.damage,
            )

            // damage
            target.hp -= power

            // stats
            stats_manager.add_heroes_damage(name, power)

            // effect
            const bag = hero_data.bag
            for (let i = 0; i < 3; i++) {
                const item = bag.get_item(i)
                const effect = item_design[item.id].data.effect
                const rank_ratio = 1 + item.rank
                if (effect !== undefined) {
                    effect_system.apply(effect.id, target, ...effect.param.map(a => a * rank_ratio))
                }
            }
        }

        this.hero_damage_all = (hero_data, name) => {
            const power = equation_design.hero_damage(
                1,// base attack
                hero_data.power_add,
                hero_data.power_mult,
                hero_data.cc_add,
                hero_data.cc_mult,
                hero_data.dcc_add,
                hero_data.dcc_mult,
                bonus_data.damage,
            )

            for (const enemy of enemy_manager.target.all) {

                // damage
                enemy.hp -= power

                // stats
                stats_manager.add_heroes_damage(name, power)

                // effect
                const bag = hero_data.bag
                for (let i = 0; i < 3; i++) {
                    const item = bag.get_item(i)
                    const effect = item_design[item.id].data.effect
                    const rank_ratio = 1 + item.rank
                    if (effect !== undefined) {
                        effect_system.apply(effect.id, enemy, ...effect.param.map(a => a * rank_ratio))
                    }
                }

            }
        }
    }
}












