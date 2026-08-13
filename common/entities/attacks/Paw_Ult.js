import { Paw } from './Paw.js'


export class Paw_Ult {
    static on_create
    on_dispose

    constructor(
        pos,
        attacks_pos,
        get_target,
        get_power,
        loop_system,
        game_state,
        color,
    ) {
        this.position = pos

        let nb = 0
        let age = 0
        
        const update = (dt) => {
            age += dt
            while (nb < age * 10) {
                nb++
                new Paw(
                    attacks_pos,
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
        this.position = pos
        loop_system.frame_updates.add(update)
        Paw_Ult.on_create?.(this)
    }
}













