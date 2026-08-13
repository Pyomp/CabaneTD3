import {
    CONDITION_DATA_POWER,
    CONDITION_DATA_TIME,
    CONDITION_DECREASE_DEF,
    CONDITION_FREEZE,
    CONDITION_SLOW,
    CONDITION_STUN
} from '../../game_design/condition/condition_design.js'
import { EFFECTS_BREAK_DEF, EFFECTS_BUMP, EFFECTS_FREEZE, EFFECTS_KNOCKBACK, EFFECTS_LENGTH, EFFECTS_SLOW, EFFECTS_STUN } from '../../game_design/effects_design.js'

export class Effect_System {
    static KNOCKBACK = 0
    static SLOW = 1
    static FREEZE = 2
    static BUMP = 3
    static BREAK_DEF = 4
    static STUN = 5

    constructor(
        conditions_system
    ) {
        const effects_dispatcher = new Array(EFFECTS_LENGTH)

        effects_dispatcher[EFFECTS_KNOCKBACK] = (ent, power) => {
            ent.knockback?.(power)
        }
        effects_dispatcher[EFFECTS_BUMP] = (ent, power) => {
            ent.bump?.(power)
        }
        effects_dispatcher[EFFECTS_SLOW] = (ent, power, time) => {
            if (ent.conditions === undefined) return
            if (ent.conditions[CONDITION_SLOW] === undefined) {
                ent.conditions[CONDITION_SLOW] = [time, power]
            } else {
                ent.conditions[CONDITION_SLOW][CONDITION_DATA_TIME] += time
                ent.conditions[CONDITION_SLOW][CONDITION_DATA_POWER] += power
            }
            conditions_system.conditions_emit(ent)
        }

        effects_dispatcher[EFFECTS_FREEZE] = (ent, time) => {
            if (ent.conditions === undefined) return
            if (ent.conditions[CONDITION_FREEZE] === undefined) {
                ent.conditions[CONDITION_FREEZE] = [time]
            } else {
                ent.conditions[CONDITION_FREEZE][CONDITION_DATA_TIME] += time
            }
            conditions_system.conditions_emit(ent)
        }

        effects_dispatcher[EFFECTS_STUN] = (ent, time) => {
            if (ent.conditions === undefined) return
            if (ent.conditions[CONDITION_STUN] === undefined) {
                ent.conditions[CONDITION_STUN] = [time]
            } else {
                ent.conditions[CONDITION_STUN][CONDITION_DATA_TIME] += time
            }
            conditions_system.conditions_emit(ent)
        }

        effects_dispatcher[EFFECTS_BREAK_DEF] = (ent, power, time) => {
            if (ent.conditions === undefined) return
            if (ent.conditions[CONDITION_DECREASE_DEF] === undefined) {
                ent.conditions[CONDITION_DECREASE_DEF] = [time, power]
            } else {
                ent.conditions[CONDITION_DECREASE_DEF][CONDITION_DATA_TIME] += time
                ent.conditions[CONDITION_DECREASE_DEF][CONDITION_DATA_POWER] += power
            }
            conditions_system.conditions_emit(ent)
        }

        this.apply = (
            effect_id,
            ent,
            ...data
        ) => {
            effects_dispatcher[effect_id](ent, ...data)
        }
    }
}




