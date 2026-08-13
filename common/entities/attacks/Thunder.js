







import { Instant_Attack } from './models/Instant_Attack.js'

export class Thunder extends Instant_Attack {
    constructor(
        pos,
        get_target,
        on_collision,
        loop_system,
        game_state,
        color,
    ) {

        super(
            pos,
            get_target,
            on_collision,
            loop_system,
            0,
            game_state,
        )

        this.color = color

        Thunder.on_create?.(this)
    }
}




