


import { createHTMLElement } from '../utils/htmlElement.js'


class Characteristic {
    constructor(
        parent,
        data = {
            genre: 'Tower Defense',
            platformes: ['Web', 'PC', 'Phone'],
            categories: ['Strategic', 'Idle']
        }
    ) {
        this.container = createHTMLElement('div', {
            display: 'flex',
            gap: '10px',
        }, parent)

        const title_style = {
            color: 'orange'
        }

        { // genre
            const c = createHTMLElement('div', {}, this.container)
            createHTMLElement('span', title_style, c, 'Genre: ')
            createHTMLElement('span', {}, c, data.genre)
        }

        { // platforme
            const c = createHTMLElement('div', {}, this.container)
            createHTMLElement('span', title_style, c, 'Plateformes: ')
            createHTMLElement('span', {}, c, data.platformes.join(' - '))
        }

        { // types
            const c = createHTMLElement('div', {}, this.container)
            createHTMLElement('span', title_style, c, 'Categories: ')
            createHTMLElement('span', {}, c, data.categories.join(' - '))
        }


    }
}

export class Introduction {
    constructor(
        parent,
        section_style,
        characteristic = {
            genre: 'Tower Defense',
            platformes: ['Web', 'PC', 'Phone'],
            categories: ['Strategic', 'Idle'],
        },
        description = `game_description`,

    ) {
        this.container = createHTMLElement('section', section_style, parent)

        createHTMLElement('h1', {}, this.container, 'Presentation')

        new Characteristic(this.container, characteristic)

        {
            const content = createHTMLElement('div', {
                width: '100%',
                display: 'flex', gap: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }, this.container)

            createHTMLElement('article', {
                width: '500px',
                maxWidth: '100%',
                // flex: '400px 400px 400px',
            }, content, description)


            createHTMLElement('video',{
                maxWidth: '100%',
                width: '700px',
                // maxHeight: '400px',
                // flex: '0 400px 400px',
                border: 'solid 5px black',
                borderRadius: '5px',
            }, content, undefined, {
                controls: true,
                src: new URL('../gameplay.mkv',import.meta.url).href,
            })
        }


    }
}



