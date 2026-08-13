





import { cbH } from "../../utils/utils.js"





export const GAME_DATA_WAVE_JUMP = 0
export const GAME_DATA_WAVE_INVINCIBILITY = 1
export const GAME_DATA_WAVE_ENEMY_OCCURENCE = 2
// export const GAME_DATA_WAVE_ = 3
// export const GAME_DATA_WAVE_ = 4
// export const GAME_DATA_WAVE_ = 5
// export const GAME_DATA_WAVE_ = 6
// export const GAME_DATA_WAVE_ = 7
export const GAME_DATA_WAVE_LENGTH = 3

export const default_gameData_wave = [
    0,
    0,
    0,
]



let wave_jump = 0
const on_wave_jump = new Set()

let invincibility = false
const on_invincibility = new Set()

export const wave_data = {
    get wave_jump() { return wave_jump },
    set wave_jump(a) {
        wave_jump = a
        cbH(on_wave_jump)
    },

    get invincibility() { return invincibility },
    set invincibility(a) {
        if (a != invincibility) {
            invincibility = !invincibility
            cbH(on_invincibility)
        }
    },
}











