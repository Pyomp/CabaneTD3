import { Enemy_Abstract } from '../../../../common/entities/enemies/models/Enemy_Abstract.js'
import { Loop_Manager } from '../../../../common/systems/Loop_Manager.js'
import { Math_max } from '../../../../utils/math/math_utils.js'
import { delete_from_array, empty_function } from '../../../../utils/utils.js'
import { Header_3D } from '../../components/Header_3D.js'
import { Color, InstancedMesh, Matrix4 } from '../../modules/three.module.js'

const color = new Color()
export class Enemy_3D {

    /**
     * 
     * @param {Enemy_Abstract} enemy_model 
     * @param {number} instanced_id 
     * @param {InstancedMesh} instanced_mesh 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        enemy_model,
        instanced_mesh,
        instances,
        loop_manager,
    ) {
        const header = new Header_3D()
        const header_hp_update = () => {
            header.hp = enemy_model.hp / enemy_model.max_hp
        }
        enemy_model.on_hp.add(header_hp_update)

        const matrix = new Matrix4()
        const matrix_elements = matrix.elements

        const position = enemy_model.position
        const velocity = enemy_model.velocity

        const offset_y = enemy_model.bounding_box.max.y

        const update_position = () => {
            const dt_physics_raf = loop_manager.dt_physics_raf

            let x = position.x
            let y = position.y
            let z = position.z

            const velo_x = velocity.x * dt_physics_raf
            const velo_y = velocity.y * dt_physics_raf
            const velo_z = velocity.z * dt_physics_raf

            const final_x = x + velo_x
            const final_y = y + velo_y
            const final_z = z + velo_z
            matrix.setPosition(final_x, final_y, final_z)
            update_header()
        }

        const update_header = () => {
            header.set_position(
                matrix_elements[12],
                matrix_elements[13] + offset_y,
                matrix_elements[14]
            )
        }

        let age = 0
        const animation = {
            idle: (dt) => {
                age = (age + dt * 2) % 2
                matrix_elements[5] = .9 + (age < 1 ? age : 2 - age) * .1
            },
            bump: update_position,
            knockback: update_position,
            walk: (dt) => {
                update_position()
                age = (age + dt) % 0.4
                const sin_approx = (age < 0.2 ? age : 0.4 - age) - 0.1
                matrix_elements[1] = -sin_approx
                matrix_elements[4] = sin_approx
            },
            attack: (dt) => {
                age += dt * 2
                matrix_elements[13] = Math_max(age < 1 ? age : 2 - age, 0)
                update_header()
            },
            win: (dt) => {
                age += dt * 10
                if (age > 40) dispose()
                const y = age % 2
                matrix_elements[13] = y < 1 ? y : 2 - y
                update_header()
            },
            die: (dt) => {
                age += dt * 2
                if (age > 1) { dispose(); return }
                if (age < .2) {
                    const scale = 1 + age
                    matrix_elements[0] = scale
                    matrix_elements[5] = scale
                    matrix_elements[10] = scale
                } else {
                    const scale = 1.2 - ((age - 0.2) / 0.8 * 1.2)
                    matrix_elements[0] = scale
                    matrix_elements[5] = scale
                    matrix_elements[10] = scale
                }
            },
        }

        const on_state = () => {
            age = 0
        }

        const update = (dt) => {
            animation[enemy_model.state](dt)
            instanced_mesh.setMatrixAt(this.instanced_id, matrix)
        }

        const on_conditions = () => {
            instanced_mesh.setColorAt(this.instanced_id, color.setHex(enemy_model.color))
            instanced_mesh.instanceColor.needsUpdate = true
        }

        enemy_model.addEventListener('conditions', on_conditions)

        enemy_model.on_state.add(on_state)
        loop_manager.frame_updates.add(update)
        instances.push(this)
        this.instanced_id = instanced_mesh.count++
        this.on_dispose = empty_function
        
        update_position()
        instanced_mesh.setColorAt(this.instanced_id, color.setHex(0xffffff))
        instanced_mesh.instanceColor.needsUpdate = true

        const dispose = () => {
            instanced_mesh.count--
            for (let i = this.instanced_id + 1; i < instances.length; i++) {
                instances[i].instanced_id--
            }
            delete_from_array(instances, this)

            enemy_model.removeEventListener('conditions', on_conditions)
            enemy_model.on_state.delete(on_state)
            loop_manager.frame_updates.delete(update)
            enemy_model.on_hp.delete(header_hp_update)
            header.dispose()
        }
        // enemy_model.on_dispose = dispose
    }
}








