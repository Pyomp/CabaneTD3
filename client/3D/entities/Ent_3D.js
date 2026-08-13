




import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'
import { AnimationClip, AnimationMixer, LoopOnce, LoopPingPong, LoopRepeat, Object3D, Scene } from "../modules/three.module.js"

export class Ent_3D {
    // static init = init
    // static destroy = destroy

    /**
     * 
     * @param {Scene} scene 
     * @param {} model 
     * @param {Loop_Manager} loop_system 
     * @param {Object3D} obj3D 
     * @param {[AnimationClip]} animations 
     */
    constructor(
        scene,
        model,
        loop_system,
        obj3D,
        animations,
    ) {
        const mixer = new AnimationMixer(obj3D)
        const clips = {}
        for (const anim of animations) {
            anim.optimize()

            const action = mixer.clipAction(anim)
            
            const split = anim.name.split('_')

            const loop_str = split[split.length - 1]
            action.loop = loop_str === 'repeat' ? LoopRepeat : loop_str === 'pingpong' ? LoopPingPong : LoopOnce
            if (action.loop === LoopOnce) {
                clips[split.join('_').toLowerCase()] = action
                action.clampWhenFinished = true
            } else {
                clips[split.slice(0, split.length - 1).join('_').toLowerCase()] = action
            }
        }

        const position = obj3D.position

        let last_state = model.state

        const on_state = () => {

            clips[last_state].fadeOut(.2)

            last_state = model.state

            clips[last_state]
                .reset()
                .fadeIn(.2)
                .play()
                
        }

        const update = (dt) => {
            const dt_physics_raf = loop_system.dt_physics_raf

            position.copy(model.position)

            const velo_x = model.velocity.x * dt_physics_raf
            const velo_y = model.velocity.y * dt_physics_raf
            const velo_z = model.velocity.z * dt_physics_raf

            position.x += velo_x
            position.y += velo_y
            position.z += velo_z
            if (position.y < 0) {
                position.y = 0
            }
            if (obj3D.rotation.y !== model.rotation) obj3D.rotation.y = model.rotation
            mixer.update(dt)
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

