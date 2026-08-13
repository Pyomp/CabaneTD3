import { CONDITION_DATA_POWER, CONDITION_DATA_TIME, CONDITION_DECREASE_DEF, CONDITION_FREEZE, CONDITION_SLOW, CONDITION_STUN } from '../../game_design/condition/condition_design.js'







export class Conditions_System {

    constructor(
        updates,
    ) {
        updates.add(this.#update)
        this.dispose = () => {
            updates.delete(this.#update)
        }
    }

    #set = new Set()

    delete(ent) {
        delete ent.conditions
        this.#set.delete(ent)
    }

    add(ent) {
        ent.conditions = {}
        this.#set.add(ent)
    }

    #update = (dt) => {
        for (const ent of this.#set) {
            const conditions = ent.conditions
            for (const key_c in conditions) {
                const data = conditions[key_c]
                data[CONDITION_DATA_TIME] -= dt
                if (data[CONDITION_DATA_TIME] < 0) {
                    delete conditions[key_c]
                    this.conditions_emit(ent)
                }
            }
        }
    }

    conditions_emit = (ent) => {
        const c = ent.conditions

        ent.move_speed = 1
        ent.attack_speed = 1
        ent.color = 0xffffff
        ent.def = 1

        if (c[CONDITION_DECREASE_DEF] !== undefined) {
            ent.color = 0x00ff00
            ent.def -= c[CONDITION_DECREASE_DEF]
        }

        if (c[CONDITION_STUN] !== undefined) {
            ent.color = 0xffff00
            ent.move_speed = 0
            ent.attack_speed = 0
        } else {
            if (c[CONDITION_FREEZE] !== undefined) {
                ent.color = 0x0000ff
                ent.move_speed = 0
                ent.attack_speed = 0
            } else if (c[CONDITION_SLOW] !== undefined) {
                ent.color = 0x00ffff
                const power = c[CONDITION_SLOW][CONDITION_DATA_POWER]
                ent.move_speed = power
                ent.attack_speed = power
            }
        }
        ent.emit('conditions')
    }
}












