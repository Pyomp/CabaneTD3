import { DT_PHYSICS } from '../constants.js'
import { Ki_Ball } from '../entities/decors/Ki_Ball.js'
import { Mp_Ball } from '../entities/decors/Mp_Ball.js'
import { Loop_Manager } from './Loop_Manager.js'






export class Ball_System {
    /**
     * 
     * @param {Loop_Manager} loop_manager
     */
    constructor(
        game_data,
        loop_manager,
    ) {
        this.ki_instances = new Set()

        let age = 0
        const update = () => {
            age += DT_PHYSICS
            if (age > 1) {
                age = 0
                if (Ki_Ball.count < 6) {
                    if (Mp_Ball.count < 6 && Math.random() < 0.5) {
                        new Mp_Ball({
                            x: (Math.random() - 0.5) * 20,
                            y: 5 + 5 * Math.random(),
                            z: (Math.random() - 0.5) * 20
                        }, game_data, loop_manager)
                    } else {
                        new Ki_Ball(
                            {
                                x: (Math.random() - 0.5) * 20,
                                y: 5 + 5 * Math.random(),
                                z: (Math.random() - 0.5) * 20
                            },
                            game_data, loop_manager,
                            this.ki_instances)
                    }
                } else if (Mp_Ball.count < 6) {
                    new Mp_Ball({
                        x: (Math.random() - 0.5) * 20,
                        y: 5 + 5 * Math.random(),
                        z: (Math.random() - 0.5) * 20
                    }, game_data, loop_manager)
                }
            }
        }

        loop_manager.updates_physics.add(update)
        this.dispose = () => {
            loop_manager.updates_physics.delete(update)
        }

    }
}







