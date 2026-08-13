import { Thunder } from './Thunder.js'

export class Thunder_Ult {
    static on_create
    on_dispose

    constructor(
        pos,
        get_target,
        get_power,
        loop_system,
        game_state,
        color,
    ) {
        this.position = pos
        this.color = color
        let nb = 0
        let age = 0

        const attack_pos = { x: pos.x, y: pos.y + 1, z: pos.z }
        const update = (dt) => {
            age += dt
            while (nb < age * 10) {
                nb++
                new Thunder(
                    attack_pos,
                    get_target,
                    get_power,
                    loop_system,
                    game_state,
                    color,
                )
                if (nb === 20) {
                    this.on_dispose?.()
                    return true
                }
            }
        }

        loop_system.frame_updates.add(update)
        Thunder_Ult.on_create?.(this)
    }
}













