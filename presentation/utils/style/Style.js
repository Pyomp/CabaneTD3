

import { strHTMLsafe } from '../htmlElement.js' 
import { darkTheme } from './theme/dark.js'
import { lightTheme } from './theme/light.js'

const style = document.createElement("style")
document.head.appendChild(style)

// to get doc on all project (css var(--***) name)
const styleVariables = {
    colorText: '--color-text',
    colorBackground: '--color-background',
    colorLine: '--color-line',
    colorButtonBackground: '--color-button-background',
    colorBackgroundPopup: '--color-background-popup',
    wallpaper: '--wallpaper',
    colorScrollBar: '--color-scroll-bar',
    colorBackgroundScrollBar: '--color-background-scroll-bar',
}

const styleVar = { ...styleVariables }
for (const key in styleVar) {
    const element = styleVar[key]
    styleVar[key] = `var(${element})`
}
//

/**
 * @example
 * const style = new Style()
 * await style.init()
*/
class Style {

    #base = ''
    #animations = ''

    var = styleVar

    constructor(
        themes = { dark: darkTheme, light: lightTheme }
    ) {

        // check all var present in theme
        for (const key in themes) {
            const theme = themes[key]
            for (const key_var in this.var) {
                if (theme[key_var] === undefined) {
                    throw `STYLE | theme: ${key} | var not present: ${key_var}`
                }
            }
        }
        this.themes = themes

    }


    #class_index = 0
    #classes = []
    /**
     * @example
     * const class_id = style.add_class({
     *     'background-color': 'red',
     *     'color': 'blue',
     * })
     * element.classList.add(class_id)
    */
    add_class(style) {
        const i = this.#class_index++

        let str = `\n.p${i}{`

        for (const key in style) {
            str += `${key}: ${style[key]};`
        }

        str += `}\n`
        this.#classes.push(str)

        return 'p' + i
    }


    async init() {
        [this.#base, this.#animations] =
            await Promise.all([
                fetch(new URL('./base.css', import.meta.url)).then((res) => {
                    return res.text()
                }),
                fetch(new URL('./animations.css', import.meta.url)).then((res) => {
                    return res.text()
                }),
            ])

        this.update()
    }

    update(themeP = {}) {
        const t = { ...darkTheme, ...themeP }

        style.innerHTML = `:root { `
        for (const key in styleVariables) {
            style.innerHTML += strHTMLsafe(`${styleVariables[key]}: ${t[key]}; `)
        }
        style.innerHTML += `}\n`

        style.innerHTML += `
            @font-face {
                font-family: 'Comfortaa';
                src: url(${new URL('./fonts/comfortaa/comfortaa.woff', import.meta.url)}) format('woff');
            }\n
            `

        style.innerHTML += this.#base
        style.innerHTML += this.#animations

        style.innerHTML += this.#classes.join('')

    }

}

export const STYLE = new Style()


