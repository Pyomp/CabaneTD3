







import { createHTMLElement } from '../utils/htmlElement.js'

export class Stay_Connected_View {

    /**
     * 
     * @param {Element} parent 
     */
    constructor(
        parent,
        // app_storage,
    ) {
        const container = createHTMLElement('div', {
            display: 'flex', alignItems: 'center', padding: '5px 0',
        }, parent, undefined, { type: 'checkbox' })

        const checkbox = createHTMLElement('input', { pointerEvents: 'none' }, container, '', { type: 'checkbox' })
        container.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked
            localStorage.setItem('stay_connected', checkbox.checked === true ? '1' : '0')
        })
        checkbox.checked = localStorage.getItem('stay_connected') === '1'
        
        createHTMLElement('span', {}, container, 'stay_connected')
    }
}





