



export class Particle {

    constructor(
        position,
        velocity,
        time,
        delta_t,
        system,
    ) {
        let age = delta_t
        
        const die = () => {
            position[0] = position[1] = position[2] = 0
            velocity[0] = velocity[1] = velocity[2] = 0
        }

        const acceleration = [0, 0, 0]

        const angle = Math.PI * 2 * Math.random()
        const velocity_base = {
            x: Math.sin(angle) * 1.2,
            z: Math.cos(angle) * 1.2,
        }

        const acc_base = [
            -velocity_base.x * 1.7,
            3,
            -velocity_base.z * 1.7,
        ]

        const reset = () => {
            acceleration[0] = acc_base[0]
            acceleration[1] = acc_base[1]
            acceleration[2] = acc_base[2]

            position[0] = 0
            position[1] = 0
            position[2] = 0

            velocity[0] = velocity_base.x
            velocity[1] = 0
            velocity[2] = velocity_base.z
        }
        // reset()


        const update_position = (dt) => {

            velocity[0] += acceleration[0] * dt
            velocity[1] += acceleration[1] * dt
            velocity[2] += acceleration[2] * dt

            // velocity[0] *= system.acceleration_factor
            // velocity[1] *= system.acceleration_factor
            // velocity[2] *= system.acceleration_factor

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
                update_position(dt)
            }

            time[0] = age
        }
    }
}









