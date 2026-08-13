import { Color } from '../../../../client/3D/modules/three.module.js' 

const _color = new Color()

export class Particle {

    constructor(
        position,
        velocity,
        acceleration1,
        acceleration2,
        color,
        time,
        delta_t,
        system,
    ) {
        let age = delta_t

        const position_base = [
            (Math.random() - .5) * 10,
            (Math.random() - .5) * 5,
            (Math.random() - .5) * 5,
        ]
        const velocity_base = [
            (Math.random() - .5) * 4,
            (Math.random() - .5) * 4,
            (Math.random() - .5) * 4,
        ]

        acceleration1[0] = (Math.random() - .5) * 20
        acceleration1[1] = (Math.random() - .5) * 20
        acceleration1[2] = (Math.random() - .5) * 20

        acceleration2[0] = (Math.random() - .5) * 20
        acceleration2[1] = (Math.random() - .5) * 20
        acceleration2[2] = (Math.random() - .5) * 20

        const acceleration_ratio = system.acceleration_ratio

        _color.setHSL(Math.random() * .1, 1, .6)
        color[0] = _color.r
        color[1] = _color.g
        color[2] = _color.b

        const die = () => {
            position[0] = position[1] = position[2] = 0
            velocity[0] = velocity[1] = velocity[2] = 0
        }

        const acceleration = [0, 0, 0]

        let half = false
        const reset = () => {
            half = false
            acceleration[0] = acceleration1[0]
            acceleration[1] = acceleration1[1]
            acceleration[2] = acceleration1[2]

            position[0] = position_base[0]
            position[1] = position_base[1]
            position[2] = position_base[2]

            velocity[0] = velocity_base[0]
            velocity[1] = velocity_base[1]
            velocity[2] = velocity_base[2]
        }
        reset()

        const update_position = (dt) => {
            velocity[0] += acceleration[0] * dt
            velocity[1] += acceleration[1] * dt
            velocity[2] += acceleration[2] * dt

            velocity[0] /= acceleration_ratio
            velocity[1] /= acceleration_ratio
            velocity[2] /= acceleration_ratio

            position[0] += velocity[0] * dt
            position[1] += velocity[1] * dt
            position[2] += velocity[2] * dt
        }

        const on_start = () => {
            if (age > 1) {
                age %= 1
                reset()
            }
        }
        system.addEventListener('start', on_start)

        this.alive = false

        this.update = (dt) => {
            age += dt

            if (this.alive === false) {
                if (system.stop_request === false && age > 1) {
                    this.alive = true
                } else {
                    return
                }
            }

            if (age > 1) {
                if (system.stop_request === true) {
                    this.alive = false
                    die()
                } else {
                    reset()
                    age %= 1
                    update_position(age)
                }
            } else {

                if (half === false && age > 0.5) {
                    half = true
                    acceleration[0] = acceleration2[0]
                    acceleration[1] = acceleration2[1]
                    acceleration[2] = acceleration2[2]
                }
                update_position(dt)
            }

            time[0] = age
        }
    }
}









