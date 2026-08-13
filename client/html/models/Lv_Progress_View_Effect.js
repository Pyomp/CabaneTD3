import { createHTMLElement } from '../utils/htmlElement.js'
import { hint_popup } from '../utils/views/hint_popup.js'


export class Lv_Progress_View_Effect {
    /**
     * @param {Game_Data} game_data 
     */
    constructor(
        game_data,
    ) {
        this.add = (
            htmlElement,
            lv,
            init
        ) => {
            if (game_data.lv >= lv) { init(); return }

            const s = htmlElement.style
            const filter_save = s.filter
            s.filter = 'grayscale(1) brightness(0.3)'
            htmlElement.dataset.prevent_event = '1'
            const hint = createHTMLElement('span',
                {
                    color: 'hsl(0,100%,70%)'
                }, undefined, ['feature_unlock_at_lv', lv.toString()])
            const delete_hint_popup = hint_popup(htmlElement, hint)

            game_data.on_lv.add(() => {
                if (game_data.lv < lv) return
                s.filter = filter_save
                delete htmlElement.dataset.event
                delete_hint_popup()
                init()
                return true
            })
        }
    }
}