import { Scene } from '../../../../client/3D/modules/three.module.js' 
import { default_parameters } from './default_parameters.js'
import { Engine } from './Engine.js'
import { View } from './View.js'


export class Particle_Firefly {

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(
        scene,
        updates_particles,
        updates_frame,
        p = {}
    ) {
        const parameters = JSON.parse(JSON.stringify({ ...default_parameters, ...p }))

        const buffers = {
            data: new ArrayBuffer(1 * 4),
            position: new ArrayBuffer(parameters.count * 3 * 4),
            velocity: new ArrayBuffer(parameters.count * 3 * 4),
            acceleration1: new ArrayBuffer(parameters.count * 3 * 4),
            acceleration2: new ArrayBuffer(parameters.count * 3 * 4),
            color: new ArrayBuffer(parameters.count * 3 * 4),
            time: new ArrayBuffer(parameters.count * 1 * 4),
        }

        const engine = new Engine(
            updates_particles,
            buffers,
            parameters,
        )

        const view = new View(
            scene,
            updates_frame,
            buffers,
            parameters,
        )

        this.set_position = (x, y, z) => {
            engine.set_position(x, y, z)
        }

        this.start = () => {
            engine.start()
            view.start()
        }

        this.stop = () => {
            engine.stop()
            view.stop()
        }
    }
}
