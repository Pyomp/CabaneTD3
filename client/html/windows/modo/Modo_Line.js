import { createHTMLElement } from '../../utils/htmlElement.js'






export class Modo_Line {
    constructor(parent, o, key, event_set) {
        const container = createHTMLElement('div', {
            display: 'flex',
            alignItems: 'center',
        }, parent)

        createHTMLElement('span', {
            margin: 'auto',
        }, container).innerHTML = key

        const current = createHTMLElement('span', {
            margin: '0 5px',
            width: '100px',
            textAlign: 'end'
        }, container)
        const update_current = () => {
            current.innerHTML = o[key].toExponential ? o[key].toExponential(3) : o[key]
        }
        update_current()

        if (o[`on_${key}`] !== undefined) o[`on_${key}`].add(update_current)
        else if (event_set !== undefined) event_set[key].add(update_current)

        // const key_str = '' + key
        // const key_upper = key_str[0].toUpperCase() + key_str.substring(1)
        const input = createHTMLElement('input', { width: '60px', }, container)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                cb()
                input.value = ''
            }
        })

        const button = createHTMLElement('button', {
            backgroundColor: 'hsl(220, 100%, 70%)',
            padding: '5px',
            '--padding-button': '2px',
        }, container, 'Save')
        const is_number = typeof o[key] === 'number'
        const cb = () => {
            o[key] = is_number === true ? +input.value : input.value
        }
        button.addEventListener('click', cb)
    }
}














