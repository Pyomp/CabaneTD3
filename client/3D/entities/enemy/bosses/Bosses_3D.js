import { Cerbere } from '../../../../../common/entities/enemies/bosses/Cerbere.js'
import { Mino } from '../../../../../common/entities/enemies/bosses/Mino.js'
import { Titan } from '../../../../../common/entities/enemies/bosses/Titan.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Math_max } from '../../../../../utils/math/math_utils.js'
import { Header_3D } from '../../../components/Header_3D.js'
import { Mesh, Scene } from '../../../modules/three.module.js'
import { Bosses_3D_Init } from './init_bosses_3D.js'


export class Boss_3D {

    static init = Bosses_3D_Init.init
    static destroy = Bosses_3D_Init.destroy
    static models = Bosses_3D_Init.models

    /**
     * 
     * @param {Scene} scene 
     * @param {Cerbere|Titan|Mino} model 
     * @param {Mesh} mesh 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        model,
        mesh,
        loop_manager,
    ) {
        const header = new Header_3D()
        const header_hp_update = () => {
            header.hp = model.hp / model.max_hp
        }
        model.on_hp.add(header_hp_update)

        const s = mesh.scale
        const p = mesh.position
        const r = mesh.rotation
        s.set(1, 1, 1)
        p.set(model.position.x, 0, model.position.z)

        const update_position = () => {
            const dt_physics_raf = loop_manager.dt_physics_raf

            let x = model.position.x
            let y = model.position.y
            let z = model.position.z

            const velo_x = model.velocity.x * dt_physics_raf
            const velo_y = model.velocity.y * dt_physics_raf
            const velo_z = model.velocity.z * dt_physics_raf

            p.x = x + velo_x
            p.y = y + velo_y
            p.z = z + velo_z

            update_header()
        }
        const update_header = () => {
            header.set_position(p.x, p.y + 4, p.z)
        }

        let age = 0
        const animation = {
            idle: (dt) => {
                age = (age + dt * 2) % 2
                s.y = .9 + (age < 1 ? age : 2 - age) * .1
            },
            bump: update_position,
            knockback: update_position,
            walk: (dt) => {
                age = (age + dt * 2) % 2
                s.y = .9 + .1 * (age < 1 ? age : 2 - age)
                update_position()
            },
            attack: (dt) => {
                age += dt * 2
                p.y = Math_max(age < 1 ? age : 2 - age, 0)
                update_header()
            },
            win: (dt) => {
                age += dt * 10
                if (age > 40) dispose()
                const y = age % 2
                p.y = y < 1 ? y : 2 - y
                update_header()
            },
            die: (dt) => {
                age += dt * 2
                if (age > 1) { dispose(); return }
                if (age < .2) {
                    const scale = 1 + age
                    s.set(scale, scale, scale)
                } else {
                    const scale = 1.2 - ((age - 0.2) / 0.8 * 1.2)
                    s.set(scale, scale, scale)
                }
            },
        }

        const on_state = () => {
            age = 0
        }

        const update = (dt) => {
            animation[model.state](dt)
        }

        model.on_state.add(on_state)
        loop_manager.frame_updates.add(update)
        scene.add(mesh)
        const dispose = () => {
            model.on_state.delete(on_state)
            scene.remove(mesh)
            loop_manager.frame_updates.delete(update)
            model.on_hp.delete(header_hp_update)
            header.dispose()
        }
        // model.on_dispose = dispose
    }
}

