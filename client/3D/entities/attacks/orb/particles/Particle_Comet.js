import { Loop_Manager } from '../../../../../../common/systems/Loop_Manager.js' 
import { Scene } from '../../../../modules/three.module.js' 
import { default_parameters } from './default_parameters.js'
import { Particle_Comet_Engine } from './Particle_Comet_Engine.js'
import { Particle_Comet_View } from './Particle_Comet_View.js'


export class Particle_Comet {

    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        loop_manager,

        p = {}
    ) {
        const parameters = JSON.parse(JSON.stringify({ ...default_parameters, ...p }))

        const buffers = {
            data: new ArrayBuffer(1 * 4),
            position: new ArrayBuffer(parameters.count * 3 * 4),
            velocity: new ArrayBuffer(parameters.count * 3 * 4),
            time: new ArrayBuffer(parameters.count * 1 * 4),
        }

        const view = new Particle_Comet_View(
            scene,
            loop_manager.frame_updates,
            buffers,
            parameters,
        )


        const engine = new Particle_Comet_Engine(
            loop_manager.updates_physics,
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
        this.dispose = ()=>{
            engine.dispose()
            view.dispose()
        }
    }
}
