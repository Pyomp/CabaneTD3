






import { Guided_Projectile } from './models/Guided_Projectile.js'

export class Frisbee extends Guided_Projectile {
    constructor(
        pos,
        get_target,
        on_collision,
        loop_system,
        game_state,
    ) {
        super(
            pos,
            get_target,
            undefined,
            2,
            on_collision,
            loop_system,
            game_state,
            { x: (Math.random() - 0.5)*50, y: Math.random()*20, z: -20 },
        )

        Frisbee.on_create?.(this)
    }
}




