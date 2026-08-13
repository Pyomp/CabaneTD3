import { Game_Data } from '../../user_data/models/Game_Data.js'
import { Ball_Abstract } from './Ball_Abstract.js'


export class Ki_Ball extends Ball_Abstract {
    static count = 0

    /**
     * @param {Vector3} pos 
     * @param {Game_Data} game_data 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        pos,
        game_data,
        loop_manager,
        instances
    ) {
        super(pos, loop_manager)
        Ki_Ball.count++

        instances.add(this)
        this.click = () => {
            Ki_Ball.count--
            game_data.ki += 10
            instances.delete(this)
            this.dispose()
        }
        Ki_Ball.on_create?.(this)
    }
}











