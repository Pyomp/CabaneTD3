












import { createHTMLElement } from '../../../utils/htmlElement.js'
import { Rebirth_View } from './Rebirth_View.js'
import { Cabane_Upgrade_View } from './Upgrade_Cabane_View.js'


export class Labo_View {
    constructor(
        game_data,
        wallet_data,
        evo_bonus_manager,
        lv_progress_view_effect,
        upgrade_system,
        rebirth_system,
    ) {
        this.container = createHTMLElement('div', {})

        const cabane_upgrade_view = new Cabane_Upgrade_View(
            game_data,
            wallet_data,
            upgrade_system,
        )
        this.container.appendChild(cabane_upgrade_view.container)

        const rebirth_view = new Rebirth_View(
            game_data,
            evo_bonus_manager,
            lv_progress_view_effect,
            rebirth_system,
        )
        this.container.appendChild(rebirth_view.container)
    }
}








