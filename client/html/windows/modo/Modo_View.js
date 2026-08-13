





import { User_Data } from '../../../../common/user_data/User_Data.js'
import { LOCALSTORAGE_WINDOW_MODO } from '../../../../constants/localStorage.js'

import { createHTMLElement } from '../../utils/htmlElement.js'
import { DefaultHTMLWindow } from '../../utils/views/DefaultWindow.js'
import { Heroes_Modo_View } from './Heroes_Modo_View.js'
import { Player_Modo_View } from './Player_Modo_View.js'


export class Modo_View {
    /**
     * 
     * @param {User_Data} user_data 
     */
    constructor(
        user_data,
    ) {
        this.icon = createHTMLElement('button', {
            backgroundColor: 'hsla(240, 70%, 70%, .9)'
        }, undefined, 'Modo')

        const w = new DefaultHTMLWindow(LOCALSTORAGE_WINDOW_MODO)

        const player_modo_view = new Player_Modo_View(
            user_data.game,
            user_data.student,
            user_data.heroes,
            user_data.heroes_used,
            user_data.quest,
            user_data.wallet
        )
        w.addTab('player', player_modo_view.container)

        const heroes_modo_view = new Heroes_Modo_View(
            user_data.student,
            user_data.heroes,
        )
        w.addTab('heroes', heroes_modo_view.container)

        this.icon.addEventListener('click', w.toggle)
    }
}







