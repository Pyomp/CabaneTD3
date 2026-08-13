import { mobs_design } from "../../../../game_design/entities/mobs_design.js"
import { Evo_Bonus_Manager } from "../../../systems/Evo_Bonus_Managers.js"
import { Loop_Manager } from "../../../systems/Loop_Manager.js"
import { Max_Hp_Manager } from "../../../systems/Max_Hp_Manager.js"
import { Physics } from "../../../Physics.js"
import { User_Data } from "../../../user_data/User_Data.js"
import { Enemy_Abstract } from "../models/Enemy_Abstract.js"

export class Sheep extends Enemy_Abstract {
    /**
     * @param {Vector3} pos
     * @param {Max_Hp_Manager} max_hp_manager 
     * @param {Loop_Manager} loop_manager
     * @param {Physics} physics
     * @param {User_Data} user_data
     * @param {Enemy_Manager} enemy_manager 
     * @param {Evo_Bonus_Manager} evo_bonus_manager 
     */
    constructor(
        pos,
        max_hp_manager,
        loop_manager,
        physics,
        user_data,
        enemy_manager,
        evo_bonus_manager,
    ) {

        super(
            pos,
            mobs_design.sheep,
            max_hp_manager.sheep,
            loop_manager,
            physics,
            user_data,
            enemy_manager,
            evo_bonus_manager,
        )

        Sheep.on_create?.(this)
    }
}