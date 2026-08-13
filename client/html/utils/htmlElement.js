




import { i18nH } from './i18n.js'

/** @param {CSSStyleDeclaration} style */
export const setStyle = (element, style = {}) => {
    const s = element.style
    for (const key in style) {
        if (s[key] === undefined) {
            s.setProperty(key, style[key])
        } else {
            s[key] = style[key]
        }
    }
}

/**
 * @param {CSSStyleDeclaration} style 
 * @param {HTMLElement} parent
 * @returns {HTMLElement | HTMLInputElement}
 */
export const createHTMLElement = (tagName = 'div', style = {}, parent, child, attributes = {}, CSSClass = []) => {
    const element = document.createElement(tagName)

    if (tagName === 'input') element.addEventListener('pointerdown', (e) => { e.stopPropagation() })

    setStyle(element, style)

    for (const value of CSSClass) {
        element.classList.add(value)
    }

    const child_constructor = child?.constructor
    if (child_constructor === String || child_constructor === Array) i18nH(element, child)
    else if (child_constructor !== undefined) element.appendChild(child)

    for (const [key, value] of Object.entries(attributes)) {
        element[key] = value
    }

    if (parent !== undefined) parent.appendChild(element)
    return element
}

export const strHTMLsafe = (str) => {
    return String(str)
        .replace(/&(?!(amp;)|(lt;)|(gt;)|(quot;))/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}
export const unescapeHtml = (safe) => {
    return safe.replace(/\\&amp\\;/g, '&')
        .replace(/\\&lt\\;/g, '<')
        .replace(/\\&gt\\;/g, '>')
        .replace(/\\&quot\\;/g, '"')
        .replace(/\\&#039\\;/g, '\'')
}











