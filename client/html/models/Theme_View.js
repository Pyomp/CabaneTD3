








import { STYLE } from '../utils/style/Style.js'
import { hint_popup } from '../utils/views/hint_popup.js'

export class Theme_View {

    /**
     * @param {Element} parent
     *  @param {string[]} theme_list
     */
    constructor(
        parent,
        theme_list = [
            'dark',
            'light'
        ]
    ) {

        let current_theme_index = +localStorage.getItem('theme') || 0

        const button = new Image()
        button.style.padding = '8px'
        button.style.width = '20px'
        button.style.height = '20px'
        // button.src = STYLE.icon[theme_list[current_theme_index]]
        button.classList.add('button')
        parent.appendChild(button)

        hint_popup(button, 'switch_theme_light_and_dark')

        button.addEventListener('click', () => {
            current_theme_index = (current_theme_index + 1) % theme_list.length
            STYLE.update(STYLE.theme[theme_list[current_theme_index]])
            localStorage.setItem('theme', current_theme_index)
            // button.src = STYLE.icon[theme_list[current_theme_index]]
        })
    }
}








