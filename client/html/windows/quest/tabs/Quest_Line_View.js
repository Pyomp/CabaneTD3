






import { Math_min } from '../../../../../utils/math/math_utils.js'
import { i18nH } from '../../../utils/i18n.js'
import { createHTMLElement } from '../../../utils/htmlElement.js'
import { pretty_print_number } from '../../../utils/pretty_print_number.js'
import { hint_popup } from '../../../utils/views/hint_popup.js'
import { Quest_System } from '../../../../../common/systems/Quest_System.js'

export class Quest_Line_View {
    constructor(
        parent,
        obj, key,
        title, desc, reward, goal,
        on_recolt,
    ) {
        this.container = createHTMLElement('div', {
            display: 'flex', alignItems: 'center', gap: '5px',
            width: '350px',
        }, parent)
        createHTMLElement('span', { marginLeft: '5px', marginRight: 'auto' }, this.container, title)

        const hint = createHTMLElement('div', {
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
        })
        createHTMLElement('span', {}, hint, 'goal')
        createHTMLElement('span', { marginLeft: '10px' }, hint, desc)
        createHTMLElement('span', { marginTop: '5px' }, hint, 'reward')
        createHTMLElement('span', { marginLeft: '10px' }, hint, reward)
        hint_popup(this.container, hint)

        const progress = createHTMLElement('div', {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '16px',
            fontSize: '14px',
            borderRadius: '8px',
            width: '130px',
        }, this.container)

        this.button = createHTMLElement('button', {
            backgroundColor: 'hsl(240, 30%, 60%)',
            minWidth: '110px'
        }, this.container)

        const set_progress = (current_p) => {
            if (current_p === goal) {
                i18nH(this.button, 'recolt')
                this.button.disabled = false
            } else if (current_p > goal) {
                i18nH(this.button, 'done')
                this.button.disabled = true
            } else {
                i18nH(this.button, 'in_progress')
                this.button.disabled = true
            }

            const current = current_p > goal ? goal : current_p

            const normalised = Math_min(current / goal, 1)
            const percent = (normalised * 100).toFixed(0)
            const color = (normalised * 240).toFixed(0)
            progress.innerHTML = `${pretty_print_number(current)}/${pretty_print_number(goal)}`
            progress.style.background = `linear-gradient(90deg, hsl(${color}, 100%, 50%), hsl(${color}, 100%, 70%) ${percent}%, grey ${percent}%)`
        }

        const update_view = () => { set_progress(obj[key]) }
        update_view()
        obj[`on_${key}`].add(update_view)

        this.button.addEventListener('click', on_recolt)

    }
}