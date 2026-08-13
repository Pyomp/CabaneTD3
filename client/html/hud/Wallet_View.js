import { Wallet_Data } from '../../../common/user_data/models/Wallet_Data.js'
import { createHTMLElement, strHTMLsafe } from '../utils/htmlElement.js'
import { diamondIMG, goldIMG, rubyIMG } from '../utils/icons/icons.js'


export class Wallet_View {
    /**
     * 
     * @param {Wallet_Data} wallet_data 
     */
    constructor(
        parent,
        wallet_data,
    ) {

        this.container = createHTMLElement('div', {},parent)

        const container_style = {
            display: 'flex', alignItems: 'center', width: '100px',
            height: '16px', fontSize: '15px', color: 'black',
        }

        const gold_container = createHTMLElement('div', container_style, this.container)
        {
            const icon = goldIMG(16, 16)
            gold_container.appendChild(icon)
            icon.style.position = 'relative'
            icon.style.left = '5px'
            const text = createHTMLElement('div', {
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                height: '100%',
                background: 'hsl(60, 100%, 80%)',
                padding: '0 10px',
                borderRadius: '9px',
                width: '100%'
            }, gold_container)
            text.innerHTML = strHTMLsafe(wallet_data.gold)
            wallet_data.on_gold.add(() => { text.innerHTML = strHTMLsafe(wallet_data.gold) })
        }

        const ruby_container = createHTMLElement('div', container_style, this.container)
        {
            const icon = rubyIMG(16, 16)
            ruby_container.appendChild(icon)
            icon.style.position = 'relative'
            icon.style.left = '5px'
            const text = createHTMLElement('div', {
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                height: '100%',
                background: 'hsl(0, 100%, 80%)',
                padding: '0 10px',
                borderRadius: '9px',
                width: '100%'
            }, ruby_container)
            text.innerHTML = strHTMLsafe(wallet_data.ruby)
            wallet_data.on_ruby.add(() => { text.innerHTML = strHTMLsafe(wallet_data.ruby) })
        }

        const diamond_container = createHTMLElement('div', container_style, this.container)
        {
            const icon = diamondIMG(16, 16)
            diamond_container.appendChild(icon)
            icon.style.position = 'relative'
            icon.style.left = '5px'
            const text = createHTMLElement('div', {
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                height: '100%',
                background: 'hsl(180, 100%, 80%)',
                padding: '0 10px',
                borderRadius: '9px',
                width: '100%'
            }, diamond_container)
            text.innerHTML = strHTMLsafe(wallet_data.diamond)
            wallet_data.on_diamond.add(() => { text.innerHTML = strHTMLsafe(wallet_data.diamond) })
        }
    }
}












