




import { Stats_Manager } from '../../../../common/systems/Stats_Manager.js'
import { Heroes_Data } from '../../../../common/user_data/models/Heroes_Data.js'
import { LOCALSTORAGE_WINDOW_STATS } from '../../../../constants/localStorage.js' 
import { DefaultHTMLWindow } from '../../utils/views/DefaultWindow.js' 
import { statsIMG } from '../../utils/icons/icons.js'
import { Wave_Stats_View } from './Wave_Stats_View.js'
import { Heroes_Image } from '../../../ressources/heroes_image/Heroes_Image.js'

export class Stats_View {
    constructor(
        /** @type {Stats_Manager} */ stats_system,
        /** @type {Heroes_Data} */ heroes_data,
        /** @type {Heroes_Image} */ heroes_image
    ) {
        this.icon = statsIMG(32, 32)

        const wave_stats_view = new Wave_Stats_View(
            stats_system,
            heroes_data,
            heroes_image,
        )

        const w = new DefaultHTMLWindow(LOCALSTORAGE_WINDOW_STATS)
        w.addTab('wave', wave_stats_view.container)

        this.icon.addEventListener('click', w.toggle)
    }
}









