import { createHTMLElement } from '../../utils/htmlElement.js'









export class Description {
    constructor(
        parent,
        data = {
            name: 'Johan',
            family: 'Magician',
            hobbies: ['watching television', 'bargain hunting', 'baking', 'ferret racing', 'relaxing'],
            characteristics: ['loveable', 'giving', 'unkind'],
        }
    ) {
        this.container = createHTMLElement('div', {
            display: 'grid',
            grid: 'auto / 1fr 300px',
            gap: '10px',
        }, parent)

        createHTMLElement('span', {}, this.container, 'name')
        createHTMLElement('p', {}, this.container, data.name)

        createHTMLElement('span', {}, this.container, 'family')
        createHTMLElement('p', {}, this.container, data.family)

        {
            createHTMLElement('span', {}, this.container, 'hobbies')
            const c = createHTMLElement('p', {}, this.container)
            for (let i = 0; i < data.hobbies.length; i++) {
                if (i > 0) createHTMLElement('span', {}, c).innerHTML = ' - '
                createHTMLElement('span', {}, c, data.hobbies[i])
            }
        }

        {
            createHTMLElement('span', {}, this.container, 'characteristics')
            const c = createHTMLElement('p', {}, this.container)
            for (let i = 0; i < data.characteristics.length; i++) {
                if (i > 0) createHTMLElement('span', {}, c).innerHTML = ' - '
                createHTMLElement('span', {}, c, data.characteristics[i])
            }
        }

    }
}