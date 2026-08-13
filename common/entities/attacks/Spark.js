import { Guided_Projectile } from "./models/Guided_Projectile.js"


export class Spark extends Guided_Projectile {
    /**
  * 
  * @param {Vector3} pos 
  * @param {()=>{}} get_target 
  * @param {()=>{}} get_power 
  * @param {Loop_Manager} loop_system 
  */
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
            1,
            on_collision,
            loop_system,
            game_state,
        )

        Spark.on_create?.(this)
    }
}












