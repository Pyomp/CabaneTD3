
import { DT_PHYSICS } from './constants.js'
import { Loop_Manager } from './systems/Loop_Manager.js'

export class Physics {
    /**
     * @param {Loop_Manager} loop_system 
     */
    constructor(
        loop_system
    ) {
        const entities = new Set()
        this.add = entities.add.bind(entities)
        this.delete = entities.delete.bind(entities)

        const update = () => {
            for (const ent of entities) {
                const v = ent.velocity
                v.x /= 1.2
                v.z /= 1.2
                v.y -= 2

                ent.position.x += v.x * DT_PHYSICS
                ent.position.y += v.y * DT_PHYSICS
                ent.position.z += v.z * DT_PHYSICS

                if (ent.position.y < 0) {
                    ent.position.y = 0
                    v.y = 0
                }
            }
        }

        loop_system.updates_physics.add(update)
        this.dispose = () => {
            loop_system.updates_physics.delete(update)
        }
    }
}






