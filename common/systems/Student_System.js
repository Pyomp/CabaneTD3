





import { topo_basic } from "../../game_design/topo.js"
import { Student } from "../entities/Student.js"
import { Loop_Manager } from "./Loop_Manager.js"
import { Enemy_Manager } from "./Enemy_Manager.js"
import { Game_State } from "../State.js"
import { User_Data } from "../user_data/User_Data.js"

export class Student_System {
    /**
     * @param {User_Data} user_data 
     * @param {Loop_Manager} loop_manager
     * @param {Game_State} game_state 
     * @param {Enemy_Manager} enemy_manager 
     */
    constructor(
        user_data,
        loop_manager,
        stats_manager,
        game_state,
        enemy_manager,
    ) {
        let student_nb = 0
        const game = user_data.game
        const update = () => {
            while (student_nb < game.lv) {
                new Student(
                    topo_basic.cabane.students[student_nb],
                    loop_manager,
                    stats_manager,
                    game_state,
                    user_data,
                    enemy_manager,
                )
                student_nb++
            }
        }
        game.on_lv.add(update)
        this.dispose = () => {
            game.on_lv.delete(update)
        }
    }
}








