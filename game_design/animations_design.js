







export const ANIMATION_IDLE = 0
export const ANIMATION_RUN = 1
export const ANIMATION_ATTACK = 2
export const ANIMATION_SLIDE = 3
export const ANIMATION_WALK = 4
export const ANIMATION_ULT = 5
export const ANIMATION_JUMP = 6
export const ANIMATION_LOOKAROUND = 7
export const ANIMATION_ATTACK_LEFT = 8
export const ANIMATION_ATTACK_RIGHT = 9
export const ANIMATION_KNOCKBACK = 10
export const ANIMATION_BUMP = 11
export const ANIMATION_WIN = 12
export const ANIMATION_DIE = 13
export const ANIMATION_LENGTH = 14


class Animation_Design {
    constructor(id, name) {
        this.name = name
        animation_id_from_name[name] = id
        animation_design[id] = this
    }
}

export const animation_id_from_name = {}

/** @type {[Animation_Design]} */
export const animation_design = new Array(ANIMATION_LENGTH)

new Animation_Design(
    ANIMATION_IDLE,
    'idle'
)
new Animation_Design(
    ANIMATION_RUN,
    'run'
)
new Animation_Design(
    ANIMATION_ATTACK,
    'attack'
)
new Animation_Design(
    ANIMATION_SLIDE,
    'slide'
)
new Animation_Design(
    ANIMATION_WALK,
    'walk'
)
new Animation_Design(
    ANIMATION_ULT,
    'ult'
)
new Animation_Design(
    ANIMATION_JUMP,
    'jump'
)
new Animation_Design(
    ANIMATION_LOOKAROUND,
    'lookaround'
)
new Animation_Design(
    ANIMATION_ATTACK_LEFT,
    'attackleft'
)
new Animation_Design(
    ANIMATION_ATTACK_RIGHT,
    'attackright'
)


