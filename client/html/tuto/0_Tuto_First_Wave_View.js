





import { DefaultHTMLWindow } from '../utils/views/DefaultWindow.js'
import { Tuto_System } from './Tuto_System.js'

export class Tuto_0_First_Wave_View {
    constructor(
        game,
        tuto_view
    ) {
        const on_success = () => {
            game.tuto |= Tuto_System.TUTO_FIRST_WAVE
        }

        if (game.tuto & Tuto_System.TUTO_FIRST_WAVE !== 0) return

        const step_1 = () => {
            // click on upgrade
            DefaultHTMLWindow.close_all()
            const button = document.getElementById('tuto_1_1')
            tuto_view(button, step_2, on_success)
        }
        const step_2 = () => {
            // click on hero placement
            const button = document.getElementById('tuto_1_2')
            tuto_view(button, step_3, on_success)
        }
        const step_3 = () => {
            // click on hero placement 2
            const button = document.getElementById('tuto_1_3')
            tuto_view(button, step_4, on_success)
        }
        const step_4 = () => {
            // close window
            const button = document.getElementById('tuto_1_4')
            tuto_view(button, step_5, on_success)
        }
        const step_5 = () => {
            // next wave
            const button = document.getElementById('tuto_1_5')
            tuto_view(button, on_success, on_success)
        }
        step_1()
    }
}

























