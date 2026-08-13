

export const TYPE_NORMAL = 0
export const TYPE_FIGHT = 1
export const TYPE_FLYING = 2
export const TYPE_POISON = 3
export const TYPE_GROUND = 4
export const TYPE_ROCK = 5
export const TYPE_BUG = 6
export const TYPE_GHOST = 7
export const TYPE_STEEL = 8
export const TYPE_FIRE = 9
export const TYPE_WATER = 10
export const TYPE_GRASS = 11
export const TYPE_ELECTRIC = 12
export const TYPE_PSY = 13
export const TYPE_ICE = 14
export const TYPE_DRAGON = 15
export const TYPE_DARK = 16
export const TYPE_FAIRY = 17

const N = 1
const M = .5
const P = 2
const Z = 0

export const TYPE_TABLE = [
    [N, N, N, N, N, M, N, Z, M, N, N, N, N, N, N, N, N, N,],
    [P, N, M, M, N, P, M, Z, P, N, N, N, N, M, P, N, P, M,],
    [N, P, N, N, N, M, P, N, M, N, N, P, M, N, N, N, N, N,],
    [N, N, N, M, M, M, N, M, Z, N, N, P, N, N, N, N, N, P,],
    [N, N, Z, P, N, P, M, N, P, P, N, M, P, N, N, N, N, N,],
    [N, M, P, N, M, N, P, N, M, P, N, N, N, N, P, N, N, N,],
    [N, M, M, M, N, N, N, M, M, M, N, P, N, P, N, N, P, M,],
    [Z, N, N, N, N, N, N, P, N, N, N, N, N, P, N, N, M, N,],
    [N, N, N, N, N, P, N, N, M, M, M, N, M, N, P, N, N, P,],
    [N, N, N, N, N, M, P, N, P, M, M, P, N, N, P, M, N, N,],
    [N, N, N, N, P, P, N, N, N, P, M, M, N, N, N, M, N, N,],
    [N, N, M, M, P, P, M, N, M, M, P, M, N, N, N, M, N, N,],
    [N, N, P, N, Z, N, N, N, N, N, P, M, M, N, N, M, N, N,],
    [N, P, N, P, N, N, N, N, M, N, N, N, N, M, N, N, Z, N,],
    [N, N, P, N, P, N, N, N, M, M, M, P, N, N, M, P, N, N,],
    [N, N, N, N, N, N, N, N, M, N, N, N, N, N, N, P, N, Z,],
    [N, M, N, N, N, N, N, P, N, N, N, N, N, P, N, N, M, M,],
    [N, P, N, M, N, N, N, N, M, M, N, N, N, N, N, P, P, N,],
]

for (const a of TYPE_TABLE) Object.freeze(a)
Object.freeze(TYPE_TABLE)