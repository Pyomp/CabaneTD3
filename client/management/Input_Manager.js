





import { Key_Code_Data } from '../../common/user_data/models/Key_Code_Data.js'

export class Input_Manager {
    /**
     * @param {Key_Code_Data} key_code_data
    */
    constructor(
        htmlelement,
        key_code_data
    ) {
        this.get_keyCode = (e) => {
            if (e.type.includes('mouse') === true) {
                return getCodeMouse(e) + e.button
            } else if (e.type.includes('key') === true) {
                return getCodeKey(e) + e.key
            }
        }

        // code for general event (mouse & keyboard)
        const getCodeKey = (e) => {
            if (e.ctrlKey === true) {
                if (e.shiftKey === true) return '4'
                else if (e.altKey === true) return '5'
                else return '1'
            } else if (e.shiftKey === true) {
                if (e.altKey === true) return '6'
                else return '2'
            }
            else if (e.altKey === true) return '3'
            else return '0'
        }

        const getCodeMouse = (e) => {
            if (e.ctrlKey === true) {
                if (e.shiftKey === true) return 'e'
                else if (e.altKey === true) return 'f'
                else return 'b'
            } else if (e.shiftKey === true) {
                if (e.altKey === true) return 'g'
                else return 'c'
            }
            else if (e.altKey === true) return 'd'
            else return 'a'
        }

        const dispatcher_down = {}
        const dispatcher_up = {}
        const dispatcher_default_keys = {}

        let lock_keyCode_count = 0
        this.lock = () => { lock_keyCode_count++ }
        this.unlock = () => { lock_keyCode_count--; if (lock_keyCode_count < 0) lock_keyCode_count = 0 }

        this.dispatcher_default_keys = dispatcher_default_keys
        // this.default_keys_used = ['0Escape']
        this.dispatcher = {
            down: dispatcher_down,
            up: dispatcher_up,
        }

        this.keycode_state = {}

        // mouse general events
        htmlelement.addEventListener("mousedown", (e) => {
            if (lock_keyCode_count > 0) return
            const code = getCodeMouse(e) + e.button
            this.keycode_state[code] = true


            const shortcut_name = key_code_data.get_name_from_code(code)

            if (shortcut_name !== undefined) {
                const cb = dispatcher_down[shortcut_name]
                if (cb !== undefined) {
                    e.preventDefault(); e.stopPropagation()
                    cb(e)
                }
            }
        }, { capture: true })

        htmlelement.addEventListener("mouseup", (e) => {
            if (lock_keyCode_count > 0) return
            const code = getCodeMouse(e) + e.button
            this.keycode_state[code] = false

            for (const key in this.keycode_state) {
                if (['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(key[0])
                    && key.substring(1) === e.button)
                    this.keycode_state[key] = false
            }

            const shortcut_name = key_code_data.get_name_from_code(code)

            if (shortcut_name !== undefined) {
                const cb = dispatcher_up[shortcut_name]
                if (cb !== undefined) {
                    e.preventDefault(); e.stopPropagation()
                    cb(e)
                }
            }
        }, { capture: true })

        // KeyBoard general events
        addEventListener("keydown", (e) => {
            const key = e.key
            if (document.activeElement.tagName.toUpperCase() === 'INPUT') {
                if (key === 'Escape') document.activeElement.blur()
                return
            }
            if (lock_keyCode_count > 0) return
            if (e.repeat) return

            const code = getCodeKey(e) + key

            this.keycode_state[code] = true

            const default_cb = dispatcher_default_keys[code]
            if (default_cb !== undefined) { default_cb(); return }

            const shortcut_name = key_code_data.get_name_from_code(code)

            if (shortcut_name !== undefined) {
                const cb = dispatcher_down[shortcut_name]
                if (cb !== undefined) {
                    e.preventDefault(); e.stopPropagation()
                    cb(e)
                }
            }
        }, { capture: true })

        addEventListener("keyup", (e) => {
            if (lock_keyCode_count > 0) return
            if (e.repeat) return

            const code = getCodeKey(e) + e.key

            for (const key in this.keycode_state) {
                const key_lowerred = e.key.toLowerCase()
                if (['0', '1', '2', '3', '4', '5', '6'].includes(key[0])
                    && key?.substring(1).toLowerCase() === key_lowerred)
                    this.keycode_state[key] = false
            }


            const index = key_code_data.get_name_from_code(code)

            if (index !== undefined) {
                const cb = dispatcher_up[index]
                if (cb !== undefined) {
                    e.preventDefault(); e.stopPropagation()
                    cb(e)
                }
            }
        }, { capture: true })

        window.addEventListener('blur', () => {
            for (const key in this.keycode_state) {
                delete this.keycode_state[key]
            }
        }, { cpture: true })
    }
}