


import { Hero_Abstract } from '../../../../common/entities/heroes/models/Hero_Abstract.js'
import { PI } from '../../../../utils/math/math_utils.js'

export class Hero_3D {

    /**
     * @param {Hero_Abstract} hero 
     * @param {Loop_System} loop_system
     */
    constructor(
        scene,
        hero,
        obj3D, mixer, action,
        loop_system,
    ) {
        obj3D.rotation.y = PI
        obj3D.position.copy(hero.position)

        let last_state = hero.state
        action[last_state].play()
        
        const on_state = () => {
            action[last_state].fadeOut(0.2)
            last_state = hero.state
            action[last_state]
                .reset()
                .fadeIn(0.2)
                .play()
        }

        const update = (dt) => {
            mixer.update(dt)
        }

        hero.on_state.add(on_state)
        loop_system.frame_updates.add(update)
        scene.add(obj3D)
        
        const dispose = () => {
            scene.remove(obj3D)
            hero.on_state.delete(on_state)
            loop_system.frame_updates.delete(update)
            hero.on_dispose = undefined
        }

        hero.on_dispose = dispose
    }
}

