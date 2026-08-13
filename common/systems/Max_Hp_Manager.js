





import { equation_design } from '../../game_design/balance/equation_design.js'
import { bosses_design } from '../../game_design/entities/bosses_design.js'
import { mobs_design } from '../../game_design/entities/mobs_design.js'
import { User_Data } from '../user_data/User_Data.js'

export class Max_Hp_Manager {
    /**
     * 
     * @param {User_Data} user_data 
     */
    constructor(user_data) {

        const game = user_data.game
        const disposes = []

        for (const key in mobs_design) {
            const mob = mobs_design[key]
            const update = () => { this[key] = equation_design.hp_enemy(mob.hp, game.wave) }
            update()
            game.on_wave.add(update)
            disposes.push(() => { game.on_wave.delete(update) })
        }
        for (const key in bosses_design) {
            const boss = bosses_design[key]
            const update = () => { this[key] = equation_design.hp_enemy(boss.hp, game.wave) }
            update()
            game.on_wave.add(update)
            disposes.push(() => { game.on_wave.delete(update) })
        }

        this.dispose = () => {
            for (let i = 0; i < disposes.length; i++) {
                disposes[i]()
            }
            disposes.length = 0
        }
    }
}








