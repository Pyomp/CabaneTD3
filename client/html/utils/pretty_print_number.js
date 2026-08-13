





import { LOCALSTORAGE_PRETTY_PRINT } from '../../../constants/localStorage.js' 


const pretty_print_number_array = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export const pretty_print_number_scientific = (a) => {
    let b = a
    let i = 0
    while (b >= 1000) { b /= 1000; i++ }
    return i > 0 ?
        b.toFixed(b >= 100 ? 0 : b >= 10 ? 1 : 2) + 'e' + i * 3
        : b.toFixed(0)
}
export const pretty_print_number_alphabet = (a) => {
    let b = a
    let i = 0
    while (b >= 1000) { b /= 1000; i++ }
    let e = ''
    while (i > 26) { i -= 26; e = 'Z' + e }
    return b.toFixed(0) + pretty_print_number_array[i] + e
}

const PRETTY_PRINT_SCIENTIFIC = 0
const PRETTY_PRINT_ALPHABET = 1

let pref = pretty_print_number_scientific
export const set_pretty_print_pref = (a) => {
    if (a === PRETTY_PRINT_SCIENTIFIC) {
        pref = pretty_print_number_scientific
        to_localStorage(PRETTY_PRINT_SCIENTIFIC)
    } else if (a === PRETTY_PRINT_ALPHABET) {
        pref = pretty_print_number_alphabet
        to_localStorage(PRETTY_PRINT_ALPHABET)
    }
}

// save
try {
    const o = SAVE.get(LOCALSTORAGE_PRETTY_PRINT)
    set_pretty_print_pref(o)
} catch { }

const to_localStorage = (a) => { SAVE.set(LOCALSTORAGE_PRETTY_PRINT, a) }

export const pretty_print_number = (a) => { return pref(a) }

