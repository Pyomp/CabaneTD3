import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Game_Data } from '../../user_data/models/Game_Data.js'
import { Ball_Abstract } from './Ball_Abstract.js'

export class Mp_Ball extends Ball_Abstract {
    static count = 0

    /**
     * @param {Vector3} pos 
     * @param {Game_Data} game_data 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        pos,
        game_data,
        loop_manager
    ) {
        super(pos, loop_manager)
        Mp_Ball.count++
        this.click = () => {
            Mp_Ball.count--
            game_data.mp += 10
            this.dispose()
        }
        Mp_Ball.on_create?.(this)
    }
}











