





import { Bonus_System } from '../../../../common/systems/Bonus_System.js'
import { Evo_Bonus_Manager } from '../../../../common/systems/Evo_Bonus_Managers.js'
import { Rebirth_System } from '../../../../common/systems/Rebirth_System.js'
import { Upgrade_System } from '../../../../common/systems/Upgrade_System.js'
import { User_Data } from '../../../../common/user_data/User_Data.js'
import { LOCALSTORAGE_WINDOW_UPGRADE } from '../../../../constants/localStorage.js'
import { Lv_Progress_View_Effect } from '../../models/Lv_Progress_View_Effect.js'
import { Heroes_Image } from '../../../ressources/heroes_image/Heroes_Image.js'
import { upgradeIMG } from '../../utils/icons/icons.js'
import { DefaultHTMLWindow } from '../../utils/views/DefaultWindow.js'
import { Heroes_Upgrade_View } from './alliesUpgrades/Heroes_Upgrade_View.js'
import { Bonus_View } from './Bonus_View.js'
import { Labo_View } from './labo/Labo_View.js'

export class Upgrade_View {
    static init = (item_image) => {
        Heroes_Upgrade_View.init(item_image)
    }
    static destroy = () => {
        Heroes_Upgrade_View.destroy()
    }

    /**
     * 
     * @param {User_Data} user_data 
     * @param {Upgrade_System} upgrade_system
     * @param {Rebirth_System} rebirth_system
     * @param {Bonus_System} bonus_system
     * @param {Heroes_Image} heros_image 
     * @param {Lv_Progress_View_Effect} lv_progress_view_effect 
     * @param {Evo_Bonus_Manager} evo_bonus_manager 
     */
    constructor(
        user_data,
        upgrade_system,
        rebirth_system,
        bonus_system,
        heros_image,
        lv_progress_view_effect,
        evo_bonus_manager,
    ) {
        this.icon = upgradeIMG(32, 32)
        this.icon.id = 'tuto_1_1'

        this.window = new DefaultHTMLWindow(LOCALSTORAGE_WINDOW_UPGRADE)

        this.heroes_upgrade = new Heroes_Upgrade_View(
            user_data.student,
            user_data.heroes,
            user_data.heroes_used,
            upgrade_system,
            heros_image,
            lv_progress_view_effect,
        )

        this.window.addTab('upgrade', this.heroes_upgrade.container)

        const labo_view = new Labo_View(
            user_data.game,
            user_data.wallet,
            evo_bonus_manager,
            lv_progress_view_effect,
            upgrade_system,
            rebirth_system,
        )

        this.window.addTab('Labo', labo_view.container)

        const bonus_view = new Bonus_View(
            user_data.bonus,
            bonus_system,
        )
        this.window.addTab('shop', bonus_view.container)

        this.icon.addEventListener('click', this.window.toggle)
    }
}



