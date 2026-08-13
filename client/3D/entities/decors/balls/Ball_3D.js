import { Ki_Ball } from '../../../../../common/entities/decors/Ki_Ball.js'
import { Mp_Ball } from '../../../../../common/entities/decors/Mp_Ball.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Third_Controls } from '../../player/Third_Controls.js'
import { init_ball_3D } from './init_ball_3D.js'





let models
export class Ball_3D {
    static init = (loader) => {
        models = init_ball_3D(loader)
    }
    static destroy = () => {
        models = undefined
    }

    /**
     * @param {Scene} scene 
     * @param {Ki_Ball | Mp_Ball} model 
     * @param {Loop_Manager} loop_manager 
     * @param {Third_Controls} third_controls 
     * @param {'ki'|'mp'} type
     */
    constructor(
        scene,
        model,
        loop_manager,
        third_controls,
        type
    ) {
        const obj3D = models[type].clone()
        const position = obj3D.position
        const rotation = obj3D.rotation

        const on_state = () => {
            if (model.state === 'dispose') {
                loop_manager.frame_updates.delete(update_scale)
                loop_manager.frame_updates.delete(appear_update)
                loop_manager.frame_updates.add(dispose_update)
            }
        }

        const update_position = (dt) => {
            const dt_physics_raf = loop_manager.dt_physics_raf

            position.copy(model.position)

            const velo_x = model.velocity.x * dt_physics_raf
            const velo_y = model.velocity.y * dt_physics_raf
            const velo_z = model.velocity.z * dt_physics_raf

            position.x += velo_x
            position.y += velo_y
            position.z += velo_z

            rotation.y += dt
        }

        const update_scale = () => {
            const rand_scale = Math.random() * .1 + .9
            obj3D.scale.set(rand_scale, rand_scale, rand_scale)
        }

        third_controls.obj3D_add_click(obj3D, model.click)

        model.on_state.add(on_state)
        scene.add(obj3D)

        obj3D.scale.set(0, 0, 0)
        const appear_update = (dt) => {
            obj3D.scale.addScalar(dt)
            if (obj3D.scale.x >= 1) {
                loop_manager.frame_updates.add(update_scale)
                return true
            }
        }
        loop_manager.frame_updates.add(appear_update)
        loop_manager.frame_updates.add(update_position)

        const dispose = () => {
            third_controls.obj3D_delete_click(obj3D, model.click)
            scene.remove(obj3D)
            model.on_state.delete(on_state)
            loop_manager.frame_updates.delete(appear_update)
            loop_manager.frame_updates.delete(dispose_update)
            loop_manager.frame_updates.delete(appear_update)
            loop_manager.frame_updates.delete(update_position)
            model.on_dispose = undefined
        }

        let up = true
        const dispose_update = (dt) => {
            if (up === false) {
                obj3D.scale.addScalar(-dt * 5)
                if (obj3D.scale.x < 0)
                    dispose()
            } else {
                obj3D.scale.addScalar(dt * 3)
                if (obj3D.scale.x > 1.2)
                    up = false
            }
        }

    }
}



//
const add_ball = (pos, type = MANA) => {

    const sphere = recup[type]?.shift() || models[type]?.clone()
    if (sphere === undefined) return

    count[type]++

    sphere.position.copy(pos)
    THR.scene.add(sphere)
    let agePop = 0
    let update_scale
    sphere.scale.set(0, 0, 0)
    const pop = () => {
        agePop += THR.dt * 4
        if (agePop > 1.5) {
            sphere.scale.set(1.5, 1.5, 1.5)
            update_scale = () => {
                const rand = (Math.random() * 0.05 + 0.95) * 1.5
                sphere.scale.set(rand, rand, rand)
            }
        } else {
            sphere.scale.set(agePop, agePop, agePop)
        }
    }
    update_scale = pop

    const dir = [Math.random() - 0.5, Math.random() / 2, Math.random() - 0.5]
    const rand = Math.random()
    const a = rand * 10 + 40,
        b = a / 2
    const update = () => {
        sphere.children[0].rotateY(-THR.dt)
        const c = THR.timestamp_s % a - b < 0 ? -0.01 : 0.01
        sphere.position.x += dir[0] * c
        sphere.position.y += dir[1] * c
        sphere.position.z += dir[2] * c
        update_scale()
    }

    THR.updates.add(update)
    obj3D_add_click(sphere, () => {
        THR.updates.delete(update)
        let age = 1
        THR.updates.add(() => {
            age -= THR.dt * 3
            if (age < 0) {
                count[type]--

                if (type === MANA) {
                    _game.mp += 10
                    popText(sphere.position, '+10', 0x66ffff)
                } else if (type === QI) {
                    _game.qi += 10
                    popText(sphere.position, '+10', 0xfff555)
                }

                THR.scene.remove(sphere)
                recup[type].push(sphere)
                return true
            } else {
                const scale = easing.back.out(age, 2) * 2
                sphere.scale.set(scale, scale, scale)
            }
        })
        obj3D_delete_click(sphere)
    })
}

const modelText = new Text()
modelText.fontSize = 0.8
modelText.anchorY = 'bottom'
modelText.anchorX = 'center'

const recupText = []
const popText = (pos, text = 'beh', color = 0x66FFFF) => {
    let textMesh = recupText.shift()
    if (textMesh === undefined) {
        textMesh = modelText.clone()
    }
    textMesh.color = color
    textMesh.position.copy(pos)
    textMesh.text = text
    THR.scene.add(textMesh)
    let age = THR.timestamp_s + 2
    THR.updates.add(() => {
        if (age < THR.timestamp_s) {
            textMesh.fillOpacity = 1
            recupText.push(textMesh)
            THR.scene.remove(textMesh)
            return true
        }
        textMesh.position.y += THR.dt
        textMesh.fillOpacity -= THR.dt / 2
        textMesh.quaternion.copy(THR.camera.quaternion)
    })
}
