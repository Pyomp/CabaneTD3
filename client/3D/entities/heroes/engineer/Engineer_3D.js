import { Engineer } from '../../../../../common/entities/heroes/Engineer.js'
import { PI } from '../../../../../utils/math/math_utils.js'


export class Engineer_3D {
    /**
         * @param {Scene} scene
         * @param {Engineer} model 
         * @param {Object3D} obj3D 
         * @param {Loop_System} loop_system
         */
    constructor(
        scene,
        model,
        obj3D,
        loop_system,
    ) {
        obj3D.rotation.y = PI
        obj3D.position.copy(model.position)

        const wheel = obj3D.getObjectByName("wheel")
        const w_p = wheel.position
        const w_r = wheel.rotation
        const wheelOffset = wheel.position.y
        // wheel.z = 0.6
        const moon = obj3D.getObjectByName("moon")

        const on_state = () => {
            age = 0
            if (model.state === 'idle') {
                w_p.y = wheelOffset
            }
        }

        let age_levitation = 0
        const update = (dt) => {
            moon.rotateX(-dt / 3)
            moon.rotateY(-dt / 2)
            moon.rotateZ(dt / 3)
            wheel.rotateY(dt * 4)
            age_levitation = (age_levitation + dt) % 4
            obj3D.position.y = model.position.y + (age_levitation < 2 ? age_levitation : 4 - age_levitation)*.05
            animations[model.state](dt)
        }

        let age = 0
        const animations = {
            idle: () => { },
            attack: (dt) => {
                age += dt
                if (age > 2) { return }
                if (age < 1) {
                    w_p.y = wheelOffset + age / 2
                } else {
                    w_p.y = wheelOffset + 1.5 - age
                }
            },
            ult: (dt) => {

            }
        }

        model.on_state.add(on_state)
        loop_system.frame_updates.add(update)
        scene.add(obj3D)

        const dispose = () => {
            scene.remove(obj3D)
            model.on_state.delete(on_state)
            loop_system.frame_updates.delete(update)
            model.on_dispose = undefined
        }

        model.on_dispose = dispose
    }
}



