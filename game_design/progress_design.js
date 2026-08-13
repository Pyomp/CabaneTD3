






import { isDev } from '../env.js'

export const progress_heroes_design = {

    student: 0,
    johan: 0,
    nuraty: 1,
    susiku: 2,

    green: 3,
    red: 5,
    cyan: 6,

    kitsune_water: 7,
    kitsune_fire: 8,
    kitsune_thunder: 9,

    hama: 10,
    robin: 11,
    claudette: 12,

    carna: 13,
    flavo: 14,

    mama: 15,
    papa: 16,

    employee: 17,
    engineer: 18,
}

export const PROGRESS_INTERFACE_QUESTS = 0
export const PROGRESS_INTERFACE_REBIRTH = 1
export const PROGRESS_INTERFACE_EQUI = 2
export const PROGRESS_INTERFACE_EVO = 3
export const PROGRESS_INTERFACE_TARG = 4
export const PROGRESS_INTERFACE_STATS = 5
export const PROGRESS_INTERFACE_REPEAT = 6
export const PROGRESS_INTERFACE_SPEED = 7
export const PROGRESS_INTERFACE_LABO = 8
export const progress_interface_design = {
    quest: 1,
    rebirth: 5,
    equi: 8,
    evo: 9,
    targ: 10,
    stats: 11,
    repeat: isDev === true ? 0 : 6,
    speed: 6,
    labo: 3,
}

