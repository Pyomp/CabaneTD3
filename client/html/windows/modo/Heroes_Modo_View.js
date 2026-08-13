





import { HEROES_LENGTH } from '../../../../common/constants.js'
import { heroes_design } from '../../../../game_design/entities/heroes_design.js'
import { createHTMLElement } from '../../utils/htmlElement.js'
import { Modo_Hero_View } from './Modo_Hero_View.js'
import { Modo_Line } from './Modo_Line.js'

export class Heroes_Modo_View {
    constructor(
        student_data,
        heroes_data
    ) {
        this.container = createHTMLElement('div')

        new Modo_Line(this.container, student_data, 'power_add')
        new Modo_Line(this.container, student_data, 'power_mult')
        new Modo_Line(this.container, student_data, 'cc_add')
        new Modo_Line(this.container, student_data, 'cc_mult')
        new Modo_Line(this.container, student_data, 'dcc_add')
        new Modo_Line(this.container, student_data, 'dcc_mult')

        for (const key in heroes_design) {
            new Modo_Hero_View(
                this.container,
                key,
                heroes_data[key],
            )
        }
    }
}








