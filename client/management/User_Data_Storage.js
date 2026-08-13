



import { User_Data } from '../../common/user_data/User_Data.js'
import { createTimeoutBuffer, JSON_parse } from '../../utils/utils.js'

export class User_Data_Storage {

    /**
     * @param {string} name 
     * @param {User_Data} user_data 
     */
    constructor(
        user_data,
        name = 'save',
    ) {

        const update_localstorage = createTimeoutBuffer(() => {
            localStorage.setItem(name, JSON.stringify(user_data.toArray()))
        }, 500)

        user_data.fromArray(JSON_parse(localStorage.getItem(name)))

        const add_update_to_event = (obj) => {
            for (const key in obj) {
                if (key.substring(0, 3) === 'on_') {
                    obj[key].add(update_localstorage)
                }
            }
        }
        add_update_to_event(user_data.game)
        user_data.game.bag.on_change.add(update_localstorage)
        add_update_to_event(user_data.bonus)
        for (const key in user_data.heroes) {
            const hero = user_data.heroes[key]
            add_update_to_event(hero)
            hero.bag.on_change.add(update_localstorage)
        }
        add_update_to_event(user_data.settings)
        add_update_to_event(user_data.student)
        add_update_to_event(user_data.quest.data)
        add_update_to_event(user_data.quest.daily)
        add_update_to_event(user_data.quest.weekly)
        user_data.heroes_used.on_change.add(update_localstorage)
        add_update_to_event(user_data.keyCode)
        add_update_to_event(user_data.wallet)

    }
}











