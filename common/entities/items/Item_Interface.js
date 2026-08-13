import { Math_random } from '../../../utils/math/math_utils.js'
import { DT_PHYSICS } from '../../constants.js'
import { Loop_Manager } from '../../systems/Loop_Manager.js'
import { Bag_Data } from '../../user_data/models/Bag_Data.js'







export class Item_Interface {
    on_dispose

    constructor(
        /** @type {{x:number, y: number, z:number}} */ position,
        /** @type {Item_Data} */  data,
        /** @type {Bag_Data} */ bag_data,
        /** @type {Loop_Manager} */ loop_manager,
    ) {
        this.position = position
        this.velocity = {
            x: (Math_random() < 0.5 ? 1 : -1) * (6 + Math_random() * 5),
            y: 5,
            z: 0,
        }
        this.data = data

        const update = () => {
            this.velocity.x /= 1.05
            this.velocity.y -= .2

            this.position.x += DT_PHYSICS * this.velocity.x
            this.position.y += DT_PHYSICS * this.velocity.y

            if (this.velocity.y < 0 && this.position.y < 1) {
                this.position.y = .3
                this.velocity.x = this.velocity.y = this.velocity.z = 0
                loop_manager.updates_physics.delete(update)
            }
        }

        loop_manager.updates_physics.add(update)

        this.dispose = () => {
            loop_manager.updates_physics.delete(update)
            this.on_dispose?.()
        }

        this.click = () => {
            const result = bag_data.add_item(undefined, this.data)
            if (result === true) this.dispose()
            return result
        }
    }
}







