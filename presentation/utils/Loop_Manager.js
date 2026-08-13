

const DT_PHYSICS = 0.05

/**
 * @typedef {String} Coucou
*/

export class Loop_Manager {
    static DT_PHYSICS = DT_PHYSICS

    particles_updates = new Set()
    updates = new Set()
    now = 0
    dt_physics_raf = 0

    constructor() {

        this.update = (dt) => {
            this.now += dt
            this.dt_physics_raf += dt

            while (this.dt_physics_raf > DT_PHYSICS) {
                this.dt_physics_raf -= DT_PHYSICS

                for (const f of this.particles_updates)
                    if (f(DT_PHYSICS) === true)
                        this.particles_updates.delete(f)
            }

            for (const f of this.updates)
                if (f(dt) === true)
                    this.updates.delete(f)

        }
    }
}