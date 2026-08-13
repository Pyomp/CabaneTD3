






import { Guided_Projectile } from './models/Guided_Projectile.js'

export class Orb extends Guided_Projectile {
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
            undefined,
            2,
            on_collision,
            loop_system,
            game_state,
        )
        this.color = color
        Orb.on_create?.(this)
    }
}




