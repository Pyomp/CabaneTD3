





import { createHTMLElement } from '../utils/htmlElement.js'

let prompt = () => { }
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    prompt = e.prompt.bind(e)
})

export class PWA_Install_View {
    constructor(parent) {
        const container = createHTMLElement('div', {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        }, parent)
        const button = createHTMLElement('button', {
            backgroundColor: 'hsl(220 , 100%, 60%)'
        }, container, 'install_app')
        createHTMLElement('span', {}, container, 'play_the_game_in_classic_app')

        button.addEventListener('click', prompt)
    }
}

