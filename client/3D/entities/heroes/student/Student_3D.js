

import { Math_min, PI } from '../../../../../utils/math/math_utils.js'
import { Math_max } from '../../../../../utils/math/math_utils.js'
import { Object3D, Scene } from '../../../modules/three.module.js'
import { Student } from '../../../../../common/entities/Student.js'

export class Student_3D {

    /**
     * @param {Scene} scene
     * @param {Student} student_data 
     * @param {Object3D} obj3D 
     * @param {Loop_System} loop_system
     */
    constructor(
        scene,
        student_data,
        obj3D,
        loop_system,
    ) {
        obj3D.rotation.y = PI
        obj3D.position.copy(student_data.position)

        const on_state = () => {
            age = 0
        }

        const update = (dt) => {
            animations[student_data.state](dt)
        }

        const morph_object3D = obj3D.morphTargetInfluences

        let age = 0
        let idle_up = false
        const max_scale_y = 0.99+Math.random()*0.01
        const animations = {
            idle: (dt) => {
                if (idle_up === true) {
                    obj3D.scale.y += dt/40
                    if (obj3D.scale.y >= max_scale_y) {
                        obj3D.scale.y = max_scale_y
                        idle_up = false
                    }
                } else {
                    obj3D.scale.y -= dt/40
                    if (obj3D.scale.y <= 0.97) {
                        obj3D.scale.y = 0.97
                        idle_up = true
                    }
                }
            },
            attack: (dt) => {
                age += dt
                if (age >= 2) return
                morph_object3D[0] = age < 1 ? Math_min(1, age) : Math_max(2 - age, 0)
            }
        }

        student_data.on_state.add(on_state)
        loop_system.frame_updates.add(update)
        scene.add(obj3D)

        const dispose = () => {
            obj3D.material.dispose()
            scene.remove(obj3D)
            student_data.on_state.delete(on_state)
            loop_system.frame_updates.delete(update)
            student_data.on_dispose = undefined
        }

        student_data.on_dispose = dispose
    }
}
