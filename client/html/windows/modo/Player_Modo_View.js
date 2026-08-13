









import { createHTMLElement } from '../../utils/htmlElement.js'
import { Modo_Line } from './Modo_Line.js'

export class Player_Modo_View {
    constructor(
        game_data,
        student_data,
        heroes_data,
        heroes_used_data,
        quest_data,
        wallet_data,
    ) {
        this.container = createHTMLElement('div', {})

        const line1 = createHTMLElement('div', { position: 'flex' }, this.container)
        const button_reset = createHTMLElement('button', {}, line1, 'Reset')
        button_reset.addEventListener('click', () => {
            
            game_data.max_wave = 0
            game_data.tuto = 0
            game_data.xp = 0
            game_data.wave = 0
            game_data.max_hp = 10
            game_data.max_mp = 50
            game_data.hp = 10
            game_data.mp = 50
            game_data.hp_regen = 1
            game_data.mp_regen = 1
            game_data.ki = 30

            wallet_data.gold = 0
            wallet_data.ruby = 0
            wallet_data.diamond = 0

            for (let i = 0; i < 12; i++)
                heroes_used_data[i] = -1

            for (const h of heroes_data) {
                h.power_add = 1
                h.power_mult = 1
                h.cc_add =1
                h.cc_mult = 1
                h.dcc_add = 1
                h.dcc_mult = 1
                h.evo =0
                h.bag.remove_item(0)
                h.bag.remove_item(1)
                h.bag.remove_item(2)
            }
            student_data.power_add = 1
            student_data.power_mult = 1
            student_data.cc_add =1
            student_data.cc_mult = 1
            student_data.dcc_add = 1
            student_data.dcc_mult = 1

            quest_data.daily.mp = 0
            quest_data.daily.wave = 0
            quest_data.daily.ducky = 0
            quest_data.daily.ult = 0
            quest_data.daily.rebirth = 0

            quest_data.weekly.wave = 0

            setTimeout(() => { location.reload() }, 2000)
        })
        
        new Modo_Line(this.container, game_data, 'max_wave')
        new Modo_Line(this.container, game_data, 'tuto')
        new Modo_Line(this.container, game_data, 'xp')
        new Modo_Line(this.container, game_data, 'wave')
        new Modo_Line(this.container, game_data, 'pseudo')
        new Modo_Line(this.container, game_data, 'hp')
        new Modo_Line(this.container, game_data, 'mp')
        new Modo_Line(this.container, game_data, 'max_hp')
        new Modo_Line(this.container, game_data, 'max_mp')
        new Modo_Line(this.container, game_data, 'hp_regen')
        new Modo_Line(this.container, game_data, 'mp_regen')
        
        new Modo_Line(this.container, game_data, 'ki')
        new Modo_Line(this.container, game_data, 'speed')

        new Modo_Line(this.container, wallet_data, 'gold')
        new Modo_Line(this.container, wallet_data, 'ruby')
        new Modo_Line(this.container, wallet_data, 'diamond')
    }
}







