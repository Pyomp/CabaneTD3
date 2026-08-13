

import { Event_Dispatcher } from '../../../../../../utils/Event_Dispatcher.js' 
import { Array_Tween } from '../../../../../../utils/math/Tween.js' 
import { default_parameters } from './default_parameters.js'
import { Particle } from './Particle.js'

export class Particle_Comet_Engine extends Event_Dispatcher {

    #stop_request = true
    get stop_request() { return this.#stop_request }
    set stop_request(a) {

        this.#stop_request = a
        if (this.#stop_request === true) {
            this.emit('stop')
        } else {
            this.emit('start')
        }
    }

    /**
     * 
     * @param {Set} updates 
     * @param { Object.< string, SharedArrayBuffer | ArrayBuffer > } buffers 
     */
    constructor(
        updates,
        buffers,
        parameters = default_parameters,
    ) {
        super()
        const time_scale = parameters.time_scale || default_parameters.time_scale
        const count = parameters.count || default_parameters.count

        this.speed_base = parameters.speed_base || default_parameters.speed_base

        this.acceleration_factor = parameters.acceleration_factor || 1
        this.acceleration_tween = new Array_Tween(parameters.acceleration_tween || default_parameters.acceleration_tween)

        const data_ui32a = new Uint32Array(buffers.data)

        // shader attributes
        const position_f32a = new Float32Array(buffers.position)
        const velocity_f32a = new Float32Array(buffers.velocity)
        const time_f32a = new Float32Array(buffers.time)

        /** @type {[Particle]} */
        const particles = []

        for (let i = 0; i < count; i++) {
            particles.push(
                new Particle(
                    position_f32a.subarray(i * 3, i * 3 + 3),
                    velocity_f32a.subarray(i * 3, i * 3 + 3),
                    time_f32a.subarray(i, i + 1),
                    i / count,
                    this,
                )
            )
        }

        const update = (dt) => {

            data_ui32a[0] = Date.now()
            const dt_scaled = time_scale * dt
            for (let i = 0; i < particles.length; i++) {

                particles[i].update(dt_scaled)

            }
        }

        let particles_stopped = 0
        const update_stop = (dt) => {
            data_ui32a[0] = Date.now()

            particles_stopped = 0
            const dt_scaled = time_scale * dt
            for (let i = 0; i < particles.length; i++) {

                particles[i].update(dt_scaled)

                if (particles[i].alive === false)

                    particles_stopped++
            }

            if (particles_stopped === count) {
                updates.delete(update_stop)
                if (dispose_resolve) dispose_resolve()
            }
        }

        this.set_position = (x, y, z) => {
            this.position_base.x = x
            this.position_base.y = y
            this.position_base.z = z
        }

        this.start = () => {
            this.stop_request = false
            updates.delete(update_stop)
            updates.add(update)
        }

        this.stop = () => {
            this.stop_request = true
            updates.delete(update)
            updates.add(update_stop)
        }

        let dispose_resolve
        this.dispose = async () => {
            this.start = () => { }
            await new Promise((resolve) => {
                this.stop()
                this.stop = () => { }
                dispose_resolve = resolve
            })
            updates.delete(update)
            updates.delete(update_stop)
        }
    }
}









