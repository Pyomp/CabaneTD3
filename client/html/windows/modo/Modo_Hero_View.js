import { createHTMLElement } from '../../utils/htmlElement.js'
import { Modo_Line } from './Modo_Line.js'


export class Modo_Hero_View {
    constructor(
        parent,
        hero_name,
        hero_data,
    ) {
        const container = createHTMLElement('div', {}, parent)
        const fold_button = createHTMLElement('button', {
            backgroundColor: 'hsl(20, 100%, 70%)',
            padding: '5px',
            '--padding-button': '2px',
        }, container, hero_name)

        fold_button.addEventListener('click', () => {
            if (form.parentNode) { form.remove() }
            else container.appendChild(form)
        })
        const form = createHTMLElement('div')

        new Modo_Line(form, hero_data, 'power_add')
        new Modo_Line(form, hero_data, 'power_mult')
        new Modo_Line(form, hero_data, 'cc_add')
        new Modo_Line(form, hero_data, 'cc_mult')
        new Modo_Line(form, hero_data, 'dcc_add')
        new Modo_Line(form, hero_data, 'dcc_mult')
        new Modo_Line(form, hero_data, 'evo')
    }
}











