import { User_Data } from '../user_data/User_Data.js'



export class Bonus_System {

    /**
     * 
     * @param {User_Data} user_data 
     */
    constructor(
        user_data
    ) {
        const game = user_data.game
        const wallet = user_data.wallet
        const bonus = user_data.bonus

        this.damage = () => {
            if (1 > wallet.diamond) return
            wallet.diamond -= 1
            bonus.damage += 30
            return true
        }

        this.enemy_spawn = () => {
            if (1 > wallet.diamond) return
            wallet.diamond -= 1
            bonus.enemy_spawn += 30
            return true
        }

        this.gold = () => {
            if (1 > wallet.diamond) return
            wallet.diamond -= 1
            bonus.gold += 30
            return true
        }

        this.loot = () => {
            if (1 > wallet.diamond) return
            wallet.diamond -= 1
            bonus.loot += 30
            return true
        }

        this.speed = () => {
            if (1 > wallet.diamond) return
            wallet.diamond -= 1
            bonus.speed += 30
            return true
        }
    }
}


const test_gold = () => {

    const user_data = new User_Data()
    const bonus_system = new Bonus_System(
        user_data
    )

    const before_diamond = user_data.game.wallet.diamond
    const before_gold = user_data.game.gold

    bonus_system.gold()

    if (
        user_data.game.wallet.diamond === before_diamond - 1
        && user_data.game.gold === before_gold + 30
    ) {
        console.log('youpi')
    } else {
        console.log('meh')
    }
}

