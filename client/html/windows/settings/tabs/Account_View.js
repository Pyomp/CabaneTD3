
import { Three_Context } from "../../../../3D/Three_Context.js"
import { Canvas_Picture_In_Picture } from "../../../models/Canvas_Picture_In_Picture.js"
import { Theme_View } from "../../../models/Theme_View.js"
import { createHTMLElement } from "../../../utils/htmlElement.js"
import { User_Data } from '../../../../../common/user_data/User_Data.js'
import { PWA } from '../../../utils/browser_info.js'
import { PWA_Install_View } from '../../../models/PWA_Install_View.js'
import { strHTMLsafe } from '../../../utils/htmlElement.js'
import { createSeparationBar } from '../../../utils/views/separationBar.js'
import { fullScreenIMG, popupIMG } from '../../../utils/icons/icons.js'
import { Select_Image_View } from '../../../utils/Select_Image_View.js'
import { set_language } from '../../../utils/i18n.js'
import { LOCALSTORAGE_LANG } from '../../../../../constants/localStorage.js'

export class Account_View {

    /**
     * @param {Canvas_Picture_In_Picture} canvas_picture_in_picture
     * @param {User_Data} user_data
     * @param {Three_Context} three_context
     */
    constructor(
        canvas_picture_in_picture,
        user_data,
        three_context,
    ) {
        this.container = createHTMLElement('div', {
            padding: '5px',
        })



        if (PWA === false) {
            new PWA_Install_View(this.container)
        }

        const line_1 = createHTMLElement('div', {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '5px'
        }, this.container)

        {
            const app_id = createHTMLElement('div', {}, line_1)
            const update = () => {
                app_id.innerHTML = strHTMLsafe(`ID ${user_data.game.id}`)
            }
            user_data.game.on_id.add(update)
            update()
        }

        // refresh button
        createHTMLElement('button', { padding: '5px', backgroundColor: 'hsl(0, 0%, 30%)' }, line_1, 'refresh')
            .addEventListener('click', () => { location.reload() })
        //

        createSeparationBar(this.container)

        const befor_last_line = createHTMLElement('div', {
            display: 'flex', alignItems: 'center', marginTop: '2px'
        }, this.container)

        new Theme_View(befor_last_line, ['dark', 'light'])

        { // full screen
            const icon = fullScreenIMG(24, 24)
            icon.style.padding = '8px'
            icon.classList.add('button')
            befor_last_line.appendChild(icon)
            const full_screen = () => { document.body.requestFullscreen(); icon.addEventListener('click', exit_full_screen, { once: true }) }
            const exit_full_screen = () => { document.exitFullscreen(); icon.addEventListener('click', full_screen, { once: true }) }
            icon.addEventListener('click', full_screen)
        }
        {// popup canvas
            const icon = popupIMG(24, 24)
            icon.style.padding = '8px'
            icon.classList.add('button')
            befor_last_line.appendChild(icon)

            icon.addEventListener('click', canvas_picture_in_picture.toggle)
        }
        { // save screen
            const button_save = createHTMLElement('button', { fontSize: '10px', padding: '8px', backgroundColor: 'hsl(0,0%,10%)' }, befor_last_line)
            button_save.innerHTML = 'Save<br>Screen'
            button_save.addEventListener('click', () => {
                three_context.render_disabled = !three_context.render_disabled
            })
        }

        createSeparationBar(this.container)

        const footer = createHTMLElement('div', {
            display: 'flex',
            alignItems: 'center',
        }, this.container)
        
        /**************************/
        /*     🔤 Language 🔤    */
        /**************************/
        {
            const change_lang = (id) => {
                user_data.game.lang = id
                set_language(id)
                localStorage.setItem(LOCALSTORAGE_LANG, id)
            }
            new Select_Image_View(footer,
                [
                    new URL('./flags/flagEN.svg', import.meta.url).href,
                    new URL('./flags/flagFR.svg', import.meta.url).href,
                ],
                [
                    () => { change_lang('en') },
                    () => { change_lang('fr') },
                ]
            )
        }
    }
}

