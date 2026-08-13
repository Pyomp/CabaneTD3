import { equation_design } from '../../game_design/balance/equation_design.js'
import { heroes_design } from '../../game_design/entities/heroes_design.js'
import { progress_heroes_design, progress_interface_design } from '../../game_design/progress_design.js'
import { Hero_Data } from '../user_data/models/Hero_Data.js'
import { Item_Data } from '../user_data/models/Item_Data.js'
import { User_Data } from '../user_data/User_Data.js'


export class Upgrade_System {

    /**
     * 
     * @param {User_Data} user_data 
     */
    constructor(
        user_data
    ) {
        const game = user_data.game
        const wallet = user_data.wallet
        const heroes = user_data.heroes
        const student = user_data.student
        const user_bag = user_data.game.bag
        const heroes_used = user_data.heroes_used

        this.add_power_add = (hero_name) => {
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.power_add_cost(hero_data.power_add)
            if (
                game.lv >= progress_heroes_design[hero_name]
                && wallet.gold >= amount
            ) {
                wallet.gold -= amount
                hero_data.power_add++
                return true
            }
        }

        this.add_power_mult = (hero_name) => {
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.power_mult_cost(hero_data.power_mult)
            if (
                game.lv >= progress_heroes_design[hero_name]
                && wallet.ruby >= amount
            ) {
                wallet.ruby -= amount
                hero_data.power_mult++
                return true
            }
        }

        this.add_cc_add = (hero_name) => {
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.cc_add_cost(hero_data.cc_add)
            if (
                game.lv >= progress_heroes_design[hero_name]
                && wallet.gold >= amount
            ) {
                wallet.gold -= amount
                hero_data.cc_add++
                return true
            }
        }

        this.add_cc_mult = (hero_name) => {
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.cc_mult_cost(hero_data.cc_mult)
            if (
                game.lv >= progress_heroes_design[hero_name]
                && wallet.ruby >= amount
            ) {
                wallet.ruby -= amount
                hero_data.cc_mult++
                return true
            }
        }
        this.add_dcc_add = (hero_name) => {
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.dcc_add_cost(hero_data.dcc_add)
            if (
                game.lv >= progress_heroes_design[hero_name]
                && wallet.gold >= amount
            ) {
                wallet.gold -= amount
                hero_data.dcc_add++
                return true
            }
        }

        this.add_dcc_mult = (hero_name) => {
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.dcc_mult_cost(hero_data.dcc_mult)
            if (
                game.lv >= progress_heroes_design[hero_name]
                && wallet.ruby >= amount
            ) {
                wallet.ruby -= amount
                hero_data.dcc_mult++
                return true
            }
        }

        this.add_evo = (hero_name) => {
            if (game.lv < progress_interface_design.evo) return
            const hero_data = heroes[hero_name] || student
            const amount = equation_design.evolution_cost(hero_data.evo)
            if (
                game.lv >= progress_interface_design.evo
                && game.lv >= progress_heroes_design[hero_name]
                && wallet.diamond >= amount
            ) {
                wallet.diamond -= amount
                hero_data.evo++
                return true
            }
        }

        const item_buff = new Item_Data()
        this.item_switch = (hero_name, hero_bag_index, user_bag_index) => {
            if (game.lv < progress_interface_design.equi) return
            /** @type {Hero_Data} */
            const hero_data = heroes[hero_name]
            const hero_bag = hero_data.bag
            const hero_item = hero_bag.get_item(hero_bag_index)
            if (
                 game.lv >= progress_heroes_design[hero_name]
                && hero_item !== undefined
            ) {
                const user_item = user_bag.get_item(user_bag_index)
                item_buff.id = hero_item.id
                item_buff.rank = hero_item.rank
                hero_bag.add_item(hero_bag_index, user_item)
                user_bag.add_item(user_bag_index, item_buff)
                return true
            }
        }

        this.placement = (hero_name, index) => {
            const id = heroes_design[hero_name].id
            const current = heroes_used.array.findIndex(a => a === id)

            if (current === -1) {
                if (index !== -1) heroes_used[index] = id
            } else {
                if (index === -1) heroes_used[current] = -1
                else {
                    heroes_used[current] = heroes_used[index]
                    heroes_used[index] = id
                }
            }
        }

        this.add_hp = () => {
            const cost = equation_design.hp_cost(game.max_hp)
            if (cost > wallet.gold) return
            wallet.gold -= cost
            game.max_hp++
            game.hp++
            return true
        }

        this.add_mp = () => {
            const cost = equation_design.mp_cost(game.max_mp)
            if (cost > wallet.gold) return
            wallet.gold -= cost
            game.max_mp++
            game.mp++
            return true
        }

        // this.add_hp_regen = () => {
        //     const cost = equation_design.hp_regen_cost(game.hp_regen)
        //     if (cost > wallet.gold) return
        //     wallet.gold -= cost
        //     game.hp_regen++
        //     return true
        // }

        // this.add_mp_regen = () => {
        //     const cost = equation_design.mp_regen_cost(game.mp_regen)
        //     if (cost > wallet.gold) return
        //     wallet.gold -= cost
        //     game.mp_regen++
        //     return true
        // }

    }
}








