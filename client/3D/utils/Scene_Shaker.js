



import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'
import { cbH } from '../../../utils/utils.js'
import { Scene } from '../modules/three.module.js'

export class Scene_Shaker {

    on_shaker_disabled = new Set()
    #shaker_disabled = 0
    get shaker_disabled() { return this.#shaker_disabled }
    set shaker_disabled(a) {
        if (this.#shaker_disabled != a) {
            this.#shaker_disabled ^= 1
            cbH(this.on_shaker_disabled)
        }
    }

    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_system 
     */
    constructor(
        scene,
        loop_system,
    ) {
        let shake = 0
        const shake_map = new Map()
        const update = () => {
            if (this.shaker_disabled === 1) shake_map.clear()
        }

        this.set_shake = (ref, value) => {
            if (this.#shaker_disabled === 1) return
            shake_map.set(ref, value)
            update_shake()
        }
        this.unset_shake = (ref) => {
            if (this.#shaker_disabled === 1) return
            shake_map.delete(ref)
            update_shake()
        }
        this.toArray = () => [
            this.#shaker_disabled
        ]
        this.fromArray = (array) => {
            if (array?.constructor !== Array) return
            this.shaker_disabled = array[0]
        }

        const update_shake = () => {
            if (shake_map.size === 0) {
                scene.position.set(0, 0, 0)
                loop_system.frame_updates.delete(update_frame_shake)
            } else {
                shake = 0
                for (const value of shake_map.values())
                    if (value > shake) shake = value

                loop_system.frame_updates.add(update_frame_shake)
            }
        }
        const update_frame_shake = () => {
            scene.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
                .normalize()
                .multiplyScalar(shake)
        }

        this.on_shaker_disabled.add(update)

        this.dispose = () => {
            loop_system.frame_updates.delete(update_frame_shake)
            this.on_shaker_disabled.delete(update)
        }
    }
}





