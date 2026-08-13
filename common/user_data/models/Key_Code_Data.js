import { cbH } from '../../../utils/utils.js'








export class Key_Code_Data {
    on_up = new Set()
    #up = '0z'
    get up() { return this.#up }
    set up(a) {
        if (this.#up !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#up = a
            cbH(this.on_up)
        }
    }

    on_down = new Set()
    #down = '0s'
    get down() { return this.#down }
    set down(a) {
        if (this.#down !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#down = a
            cbH(this.on_down)
        }
    }

    on_left = new Set()
    #left = '0q'
    get left() { return this.#left }
    set left(a) {
        if (this.#left !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#left = a
            cbH(this.on_left)
        }
    }

    on_right = new Set()
    #right = '0d'
    get right() { return this.#right }
    set right(a) {
        if (this.#right !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#right = a
            cbH(this.on_right)
        }
    }

    on_interact = new Set()
    #interact = '0f'
    get interact() { return this.#interact }
    set interact(a) {
        if (this.#interact !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#interact = a
            cbH(this.on_interact)
        }
    }

    on_skill0 = new Set()
    #skill0 = '0 '
    get skill0() { return this.#skill0 }
    set skill0(a) {
        if (this.#skill0 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill0 = a
            cbH(this.on_skill0)
        }
    }

    on_skill1 = new Set()
    #skill1 = '0e'
    get skill1() { return this.#skill1 }
    set skill1(a) {
        if (this.#skill1 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill1 = a
            cbH(this.on_skill1)
        }
    }

    on_skill2 = new Set()
    #skill2 = '0r'
    get skill2() { return this.#skill2 }
    set skill2(a) {
        if (this.#skill2 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill2 = a
            cbH(this.on_skill2)
        }
    }

    on_skill3 = new Set()
    #skill3 = '0t'
    get skill3() { return this.#skill3 }
    set skill3(a) {
        if (this.#skill3 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill3 = a
            cbH(this.on_skill3)
        }
    }

    on_skill4 = new Set()
    #skill4 = '0c'
    get skill4() { return this.#skill4 }
    set skill4(a) {
        if (this.#skill4 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill4 = a
            cbH(this.on_skill4)
        }
    }

    on_skill5 = new Set()
    #skill5 = '0v'
    get skill5() { return this.#skill5 }
    set skill5(a) {
        if (this.#skill5 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill5 = a
            cbH(this.on_skill5)
        }
    }

    on_skill6 = new Set()
    #skill6 = '0b'
    get skill6() { return this.#skill6 }
    set skill6(a) {
        if (this.#skill6 !== a
            && a?.constructor === String
            && a.length > 1
        ) {
            this.#skill6 = a
            cbH(this.on_skill6)
        }
    }

    toArray() {
        return [
            this.#up,
            this.#down,
            this.#left,
            this.#right,
            this.#interact,
            this.#skill0,
            this.#skill1,
            this.#skill2,
            this.#skill3,
            this.#skill4,
            this.#skill5,
            this.#skill6,
        ]
    }

    fromArray(array) {
        if (array?.constructor !== Array) return
        let i = 0
        this.up = array[i++]
        this.down = array[i++]
        this.left = array[i++]
        this.right = array[i++]
        this.interact = array[i++]
        this.skill0 = array[i++]
        this.skill1 = array[i++]
        this.skill2 = array[i++]
        this.skill3 = array[i++]
        this.skill4 = array[i++]
        this.skill5 = array[i++]
        this.skill6 = array[i++]
    }

    keys() {
        return [
            'up',
            'down',
            'left',
            'right',
            'interact',
            'skill0',
            'skill1',
            'skill2',
            'skill3',
            'skill4',
            'skill5',
            'skill6',
        ]
    }

    get_name_from_code(code) {
        if (this.#up === code) return 'up'
        if (this.#down === code) return 'down'
        if (this.#left === code) return 'left'
        if (this.#right === code) return 'right'
        if (this.#interact === code) return 'interact'
        if (this.#skill0 === code) return 'skill0'
        if (this.#skill1 === code) return 'skill1'
        if (this.#skill2 === code) return 'skill2'
        if (this.#skill3 === code) return 'skill3'
        if (this.#skill4 === code) return 'skill4'
        if (this.#skill5 === code) return 'skill5'
        if (this.#skill6 === code) return 'skill6'
    }
}


export const _keycode_toArray = () => {
    return _keyCode
}







