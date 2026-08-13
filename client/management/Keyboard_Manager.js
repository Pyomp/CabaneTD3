


import { Loop_Manager } from '../../common/systems/Loop_Manager.js'
import { Event_Action_Manager } from '../../common/systems/Event_Action_Manager.js'
import { Event_State_Manager } from '../../common/systems/Event_State_Manager.js'
import { Key_Code_Data } from '../../common/user_data/models/Key_Code_Data.js'
import { PLAYER_MOVE_SPEED } from '../../game_design/player_design.js'
import { PI, PI025, PI05, PI075 } from '../../utils/math/math_utils.js'
import { Third_Controls } from '../3D/entities/player/Third_Controls.js'
import { Input_Manager } from './Input_Manager.js'

export class Keyboard_Manager {

    /**
     * 
     * @param {Event_State_Manager} event_state_manager 
     * @param {Event_Action_Manager} event_action_manager
     * @param {Input_Manager} input_manager 
     * @param {Key_Code_Data} key_code_data 
     * @param {Loop_Manager} loop_system 
     * @param {Third_Controls} third_controls 
     */
    constructor(
        event_state_manager,
        event_action_manager,
        input_manager,
        key_code_data,
        loop_system,
        third_controls,
    ) {
        const move = event_state_manager.move
        const keycode_state = input_manager.keycode_state

        const update = () => {
            move.angle = third_controls.theta
            move.radius = 0
            // if (document.activeElement.tagName !== 'INPUT') {
            if (keycode_state[key_code_data.up] === true) {
                if (keycode_state[key_code_data.left] === true) move.angle -= PI075
                else if (keycode_state[key_code_data.right] === true) move.angle += PI075
                else move.angle -= PI

                move.radius = PLAYER_MOVE_SPEED
            } else if (keycode_state[key_code_data.down] === true) {
                if (keycode_state[key_code_data.left] === true) move.angle -= PI025
                else if (keycode_state[key_code_data.right] === true) move.angle += PI025
                move.radius = PLAYER_MOVE_SPEED
            } else {
                if (keycode_state[key_code_data.left] === true) {
                    move.angle -= PI05
                    move.radius = PLAYER_MOVE_SPEED
                } else if (keycode_state[key_code_data.right] === true) {
                    move.angle += PI05
                    move.radius = PLAYER_MOVE_SPEED
                }
            }
            // }
        }

        loop_system.frame_updates.add(update)
        this.dispose = () => {
            loop_system.frame_updates.delete(update)
        }

        input_manager.dispatcher.down['skill0'] = event_action_manager.jump

    }
}










