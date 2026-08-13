





import { Bonus_Data } from './models/Bonus_Data.js'
import { Game_Data } from './models/Game_Data.js'
import { Heroes_Data } from './models/Heroes_Data.js'
import { Heroes_Used_Data } from './models/Heroes_Used_Data.js'
import { Key_Code_Data } from './models/Key_Code_Data.js'
import { Quest_Data } from './models/Quest_Data.js'
import { Settings_Data } from './models/Settings_Data.js'
import { Student_Data } from './models/Student_Data.js'
import { Wallet_Data } from './models/Wallet_Data.js'

export class User_Data {
    game = new Game_Data()
    heroes = new Heroes_Data()
    wallet = new Wallet_Data()
    heroes_used = new Heroes_Used_Data()
    bonus = new Bonus_Data()
    settings = new Settings_Data()
    keyCode = new Key_Code_Data()
    quest = new Quest_Data()
    student = new Student_Data()

    toArray = () => [
        this.game.toArray(),
        this.heroes.toArray(),
        this.wallet.toArray(),
        this.heroes_used.toArray(),
        this.bonus.toArray(),
        this.settings.toArray(),
        this.keyCode.toArray(),
        this.quest.toArray(),
        this.student.toArray(),
    ]

    fromArray = (array) => {
        if (array?.constructor !== Array) return
        let i = 0
        this.game.fromArray(array[i++])
        this.heroes.fromArray(array[i++])
        this.wallet.fromArray(array[i++])
        this.heroes_used.fromArray(array[i++])
        this.bonus.fromArray(array[i++])
        this.settings.fromArray(array[i++])
        this.keyCode.fromArray(array[i++])
        this.quest.fromArray(array[i++])
        this.student.fromArray(array[i++])
    }

}









