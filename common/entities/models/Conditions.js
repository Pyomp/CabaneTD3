





import { cbH } from '../../../utils/utils.js'

export class Conditions {
    constructor() {
        this.on_change = new Set()

        const conditions = {}
        this.apply = (effect_id, ...param) => {
            effects_system[effect_id](...param)
            cbH(this.on_change)//event
        }
        this.delete = (id) => {
            cbH(this.on_change)//event
        }

        this.update = (dt) => {
            for (const key_c in conditions) {
                const data = conditions[key_c]
                data[CONDITION_DATA_TIME] -= dt
                if (data[CONDITION_DATA_TIME] < 0) {
                    delete conditions[key_c]
                    conditions_system_emit(ent)
                }
            }
        }
    }
}

export const effects_system = new Array(EFFECTS_LENGTH)

effects_system[EFFECTS_KNOCKBACK] = (ent, power) => {
    ent.knockback?.(power)
}
effects_system[EFFECTS_BUMP] = (ent, power) => {
    ent.bump?.(power)
}
effects_system[EFFECTS_SLOW] = (ent, power, time) => {
    if (ent.conditions === undefined) return
    if (ent.conditions[CONDITION_SLOW] === undefined) {
        ent.conditions[CONDITION_SLOW] = [time, power]
    } else {
        ent.conditions[CONDITION_SLOW][CONDITION_DATA_TIME] += time
        ent.conditions[CONDITION_SLOW][CONDITION_DATA_POWER] += power
    }
}

effects_system[EFFECTS_FREEZE] = (ent, time) => {
    if (ent.conditions === undefined) return
    if (ent.conditions[CONDITION_FREEZE] === undefined) {
        ent.conditions[CONDITION_FREEZE] = [time]
    } else {
        ent.conditions[CONDITION_FREEZE][CONDITION_DATA_TIME] += time
    }
}

effects_system[EFFECTS_STUN] = (ent, time) => {
    if (ent.conditions === undefined) return
    if (ent.conditions[CONDITION_STUN] === undefined) {
        ent.conditions[CONDITION_STUN] = [time]
    } else {
        ent.conditions[CONDITION_STUN][CONDITION_DATA_TIME] += time
    }
}

effects_system[EFFECTS_BREAK_DEF] = (ent, power, time) => {
    if (ent.conditions === undefined) return
    if (ent.conditions[CONDITION_DECREASE_DEF] === undefined) {
        ent.conditions[CONDITION_DECREASE_DEF] = [time, power]
    } else {
        ent.conditions[CONDITION_DECREASE_DEF][CONDITION_DATA_TIME] += time
        ent.conditions[CONDITION_DECREASE_DEF][CONDITION_DATA_POWER] += power
    }
}



