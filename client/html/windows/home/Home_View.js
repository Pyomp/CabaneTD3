






import { LOCALSTORAGE_WINDOW_HOME } from '../../../../constants/localStorage.js'
import { Heroes_Image } from '../../../ressources/heroes_image/Heroes_Image.js'
import { Item_Image } from '../../../ressources/item_images/Item_Image.js'
import { Skill_Image } from '../../../ressources/skill_image/Skill_Image.js'
import { DefaultHTMLWindow } from '../../utils/views/DefaultWindow.js'
import { Beta_View } from './tabs/Beta_View.js'
import { Help_Me_View } from './tabs/Help_Me.js'
import { Manual_View } from './tabs/manual/Manual_View.js'

export class Home_View {

    /**
     * @param {Heroes_Image} heroes_image 
     * @param {Item_Image} item_image 
     * @param {Skill_Image} skill_image 
     */
    constructor(
        heroes_image,
        item_image,
        skill_image,
    ) {
        this.icon = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
        this.icon.setAttributeNS(null, 'viewBox', '0 0 512 512')
        this.icon.innerHTML = `<path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z"
   fill="#ffffff" fill-opacity="1"></path>`

        const home_window = new DefaultHTMLWindow(LOCALSTORAGE_WINDOW_HOME)

        // this.home_window.addTab('news', (await import('../../../../note/news.js')).default)
        const beta_view = new Beta_View()
        home_window.addTab('Beta', beta_view.container)

        const manual_view = new Manual_View(
            heroes_image,
            item_image,
            skill_image,
        )
        home_window.addTab('manual', manual_view.container)

        const help_me_view = new Help_Me_View()
        home_window.addTab('about', help_me_view.container)

        this.icon.addEventListener('click', home_window.toggle)
    }
}




