import { Event_State_Manager } from '../../common/systems/Event_State_Manager.js'
import { PLAYER_MOVE_SPEED } from '../../game_design/player_design.js'
import { PI05 } from '../../utils/math/math_utils.js'
import { Third_Controls } from '../3D/entities/player/Third_Controls.js'
import { Pad_Control } from '../models/pad/Pad_Control.js'







export class Pad_Manager {

    /**
     * 
    * @param {Event_State_Manager} event_state_manager 
    * @param {Third_Controls} third_controls 
     */
    constructor(
        event_state_manager,
        third_controls,
    ) {
        const pad = new Pad_Control()
        const pad_circle = pad.circle
        const move = event_state_manager.move
        const on_change = () => {
            move.angle = pad_circle.angle + third_controls.theta + PI05
            move.radius = pad_circle.radius * PLAYER_MOVE_SPEED
        }
        pad.on_change = on_change
    }
}






