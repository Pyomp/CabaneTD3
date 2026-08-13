
import { cbH } from '../../../utils/utils.js'
import {
    HEROES_CACTUS_MAMA,
    HEROES_CACTUS_PAPA,
    HEROES_CARNA,
    HEROES_CLAUDETTE,
    HEROES_CYAN,
    HEROES_EMPLOYEE,
    HEROES_ENGINEER,
    HEROES_FLAVO,
    HEROES_GREEN,
    HEROES_HAMA,
    HEROES_JOHAN,
    HEROES_KITSUNE_FIRE,
    HEROES_KITSUNE_THUNDER,
    HEROES_KITSUNE_WATER,
    HEROES_NURATY,
    HEROES_RED,
    HEROES_ROBIN,
    HEROES_SUSIKU
} from "../../../game_design/entities/heroes_design.js"
import { _heroes_used } from '../_heroes_used.js'


export const GAME_DATA_TEAM_STUDENTS_POWER = 0
export const GAME_DATA_TEAM_KITSUNE_SPEED = 1
export const GAME_DATA_TEAM_MAGICIANS_SPEED = 2
export const GAME_DATA_TEAM_WITCHES_SPEED = 3
export const GAME_DATA_TEAM_ANIMALS_SPEED = 4
export const GAME_DATA_TEAM_ULT_AUTOMATION = 5
export const GAME_DATA_TEAM_FIREWORKS_HIDE = 6
export const GAME_DATA_TEAM_GAME_SPEED = 7
export const GAME_DATA_TEAM_LENGTH = 8

export const default_gameData_team = [
    1, // students_power
    1, // kitsunes_speed
    1, // magicians_speed
    1, // witches_speed
    1, // animals_speed
    0, // ult_automation
    0, // fireworks_hide
    1, // game_speed
]

export const update_gameData_team = (data_array, heroes_used) => {
    let studentsPowerBuffer = 1
    let kitsunesSpeedBuffer = 1
    let magiciansSpeedBuffer = 1
    let witchesSpeedBuffer = 1
    let animalsSpeedBuffer = 1
    let ultAutomationBuffer = 0
    let fireworksHideBuffer = 0
    let gameSpeedBuffer = 1

    const a = heroes_used.array
    if (a.includes(HEROES_NURATY)
        && a.includes(HEROES_JOHAN)
        && a.includes(HEROES_SUSIKU)) {
        studentsPowerBuffer += 0.25
        kitsunesSpeedBuffer = 2
    } else if (a.includes(HEROES_GREEN)
        && a.includes(HEROES_RED)
        && a.includes(HEROES_CYAN)) {
        studentsPowerBuffer += 0.25
        magiciansSpeedBuffer = 2
    } else if (a.includes(HEROES_KITSUNE_WATER)
        && a.includes(HEROES_KITSUNE_THUNDER)
        && a.includes(HEROES_KITSUNE_FIRE)) {
        studentsPowerBuffer += 0.25
        animalsSpeedBuffer = 2
    } else if (a.includes(HEROES_HAMA)
        && a.includes(HEROES_CLAUDETTE)
        && a.includes(HEROES_ROBIN)) {
        studentsPowerBuffer += 0.25
        witchesSpeedBuffer = 2
    } else if (a.includes(HEROES_CARNA)
        && a.includes(HEROES_FLAVO)) {
        ultAutomationBuffer = 1
    } else if (a.includes(HEROES_CACTUS_MAMA)
        && a.includes(HEROES_CACTUS_PAPA)) {
        fireworksHideBuffer = 1
    } else if (a.includes(HEROES_EMPLOYEE)
        && a.includes(HEROES_ENGINEER)) {
        gameSpeedBuffer += 0.1
    }

    if (data_array[GAME_DATA_TEAM_STUDENTS_POWER] !== studentsPowerBuffer) {
        data_array[GAME_DATA_TEAM_STUDENTS_POWER] = studentsPowerBuffer
    }
    if (data_array[GAME_DATA_TEAM_KITSUNE_SPEED] !== kitsunesSpeedBuffer) {
        data_array[GAME_DATA_TEAM_KITSUNE_SPEED] = kitsunesSpeedBuffer
    }
    if (data_array[GAME_DATA_TEAM_MAGICIANS_SPEED] !== magiciansSpeedBuffer) {
        data_array[GAME_DATA_TEAM_MAGICIANS_SPEED] = magiciansSpeedBuffer
    }
    if (data_array[GAME_DATA_TEAM_WITCHES_SPEED] !== witchesSpeedBuffer) {
        data_array[GAME_DATA_TEAM_WITCHES_SPEED] = witchesSpeedBuffer
    }
    if (data_array[GAME_DATA_TEAM_ANIMALS_SPEED] !== animalsSpeedBuffer) {
        data_array[GAME_DATA_TEAM_ANIMALS_SPEED] = animalsSpeedBuffer
    }
    if (data_array[GAME_DATA_TEAM_ULT_AUTOMATION] !== ultAutomationBuffer) {
        data_array[GAME_DATA_TEAM_ULT_AUTOMATION] = ultAutomationBuffer
    }
    if (data_array[GAME_DATA_TEAM_FIREWORKS_HIDE] !== fireworksHideBuffer) {
        data_array[GAME_DATA_TEAM_FIREWORKS_HIDE] = fireworksHideBuffer
    }
    if (data_array[GAME_DATA_TEAM_GAME_SPEED] !== gameSpeedBuffer) {
        data_array[GAME_DATA_TEAM_GAME_SPEED] = gameSpeedBuffer
    }
}
