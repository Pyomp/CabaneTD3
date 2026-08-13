



import { set_language } from '../../../utils/i18n.js'
import { Select_Image_View } from '../../../utils/Select_Image_View.js'
import { STYLE } from '../../../utils/style/Style.js'



export class Language_Selector {
    constructor(
        parent,
    ) {
        const supported_languages = ['fr', 'en']

        let lang = localStorage.getItem('language') || navigator.language
        if (supported_languages.includes(lang) === false) {
            const l = navigator.language.toLowerCase()
            if (l.includes('fr')) lang = 'fr'
            else lang = 'en'
        }

        const change_lang = (id) => {
            if (supported_languages.includes(id) === false) return
            localStorage.setItem('language', id)
            set_language(id)
        }
        change_lang(lang)
        const select_image_view = new Select_Image_View(parent,
            [
                new URL('./flagEN.svg', import.meta.url).href,
                new URL('./flagFR.svg', import.meta.url).href,
            ],
            [
                () => { change_lang('en') },
                () => { change_lang('fr') },
            ]
        )
        {
            const s = select_image_view.select.style
            s.background = STYLE.var.colorBackground
            s.borderRadius = '5px'
        }
        select_image_view.emit('change', lang === 'en' ? 0 : 1)

        this.container = select_image_view.container
    }
}










