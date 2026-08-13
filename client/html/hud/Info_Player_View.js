
import { Game_Data } from '../../../common/user_data/models/Game_Data.js'
import { equation_design } from '../../../game_design/balance/equation_design.js'
import { createHTMLElement } from '../utils/htmlElement.js' 

export class Info_Player_View {

    /**
     * @param {HTMLElement} parent
     * @param {Game_Data} game_data 
     */
    constructor(
        game_data,
    ) {
        const style = {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: 'black', borderRadius: '6px', height: '12px', fontSize: '11px',
            width: '100%'
        }

        this.lv_view = createHTMLElement('div', style)
        const update_lv = () => {
            const percent = ((game_data.xp - (equation_design.xp_from_lv(game_data.lv - 1)))
                / equation_design.xp_tab[game_data.lv] * 100).toFixed(0)
            this.lv_view.style.backgroundImage = `linear-gradient(90deg, hsl(120, 100%, 80%) ${percent}%, white ${percent}%)`
            this.lv_view.innerHTML = `Lv. ${game_data.lv | 0}`
        }
        update_lv()
        game_data.on_xp.add(update_lv)

        this.hp_view = createHTMLElement('div', style)
        const update_hp = () => {
            const percent = (game_data.hp / game_data.max_hp * 100).toFixed(0)
            this.hp_view.style.backgroundImage = `linear-gradient(90deg, hsl(0, 100%, 80%) ${percent}%, white ${percent}%)`
            this.hp_view.innerHTML = `${game_data.hp} hp`
        }
        update_hp()
        game_data.on_hp.add(update_hp)
        game_data.on_max_hp.add(update_hp)

        this.mp_view = createHTMLElement('div', style)
        const update_mp = () => {
            const percent = (game_data.mp / game_data.max_mp * 100).toFixed(0)
            this.mp_view.style.backgroundImage = `linear-gradient(90deg, hsl(240, 100%, 80%) ${percent}%, white ${percent}%)`
            this.mp_view.innerHTML = `${game_data.mp} mp`
        }
        update_mp()
        game_data.on_mp.add(update_mp)
        game_data.on_max_mp.add(update_hp)

        this.ki_view = createHTMLElement('div', style)
        const update_ki = () => {
            const percent = game_data.ki.toFixed(0)
            this.ki_view.style.backgroundImage = `linear-gradient(90deg, hsl(30, 100%, 80%) ${percent}%, white ${percent}%)`
            this.ki_view.innerHTML = `${game_data.ki} ki`
        }
        update_ki()
        game_data.on_ki.add(update_ki)

    }
}









