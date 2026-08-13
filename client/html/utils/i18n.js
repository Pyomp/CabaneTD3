





import { strHTMLsafe } from './htmlElement.js'

export const set_language = async (lang) => {
    try {
        const module = await import(route[lang])
        update(module.default)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

const htmlElements = []
const strs = []
const not_implemented = []
const getStr = (str) => {
    const constructor = str?.constructor
    if (constructor === String) {
        if (str === '') return
        if (trad[str]) {
            return trad[str]
        } else {
            const trimed = str.trim()
            if (!/^[A-Z]/.test(trimed[0]) && isNaN(trimed[0]))
                if (not_implemented.includes(str) === false) {
                    not_implemented.push(str)
                    const trad = (str[0]?.toUpperCase() + str.substring(1)).replaceAll('_', ' ')
                    console.log(`'${str}': \`${trad}\`,`)
                }
            return strHTMLsafe(str)
        }
    } else if (constructor === Array) {
        return strHTMLsafe(str.map(s => getStr(s, trad)).join(' '))
    } else {
        console.warn('i18n wrong use')
    }
}

export const i18nH = (htmlElement, str) => {
    let id = htmlElements.indexOf(htmlElement)
    if (id === -1) {
        htmlElements.push(htmlElement)
        strs.push(str)
    } else {
        strs[id] = str
    }

    if (trad !== undefined) htmlElement.innerHTML = getStr(str)
}

let trad = {}
const update = (trad_module) => {
    trad = trad_module
    for (let i = 0; i < htmlElements.length; i++) {
        htmlElements[i].innerHTML = getStr(strs[i])
    }
}

/**
 * 
 * @param {HTMLElement} parent 
 */
export const i18n_delete = (parent) => {
    for (const child of parent.children) {
        // recursion
        if (child.children.length > 0) {
            i18n_delete(child)
        }

        const index = htmlElements.indexOf(child)
        if (index === -1) return
        htmlElements.splice(index, 1)
        strs.splice(index, 1)
    }
}

let route = {}
export const init_i18n = async (route_p = { en: new URL('./languages/en.js', import.meta.url) }, lang = 'en') => {
    route = route_p
    const res = await set_language(lang)
    if (res === false) set_language('en')
}
init_i18n({
    fr: new URL('./languages/fr.js', import.meta.url).href,
    en: new URL('./languages/en.js', import.meta.url).href,
})






