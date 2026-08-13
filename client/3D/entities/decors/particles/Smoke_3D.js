import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Static_Init_Manager } from '../../../../../utils/Static_Init_Manager.js'
import { ParticleEngine, Tween } from '../../../modules/ParticleEngine.js'
import {
    Color,
    NormalBlending,
    Scene,
    Vector3
} from '../../../modules/three.module.js'


let smoke_config
const { init, destroy } = new Static_Init_Manager(
    (loader) => {
        const texture = loader.texture_load(new URL('../../../modules/particle_texture/smoke.png', import.meta.url).href)

        const matSmoke = ParticleEngine.baseMat()
        matSmoke.blending = NormalBlending
        matSmoke.uniforms.pointTexture.value = texture

        smoke_config = {
            positionStyle: ParticleEngine.type.SPHERE,
            // positionSpread: new Vector3(20, 2, 2),
            positionRadius: 0.1,

            velocityStyle: ParticleEngine.type.CUBE,
            velocityBase: new Vector3(0, 15, 0),
            velocitySpread: new Vector3(40, 0, 10),
            accelerationBase: new Vector3(0, 0, -5),

            material: matSmoke,
            particleCount: 100,

            angleBase: 0,
            angleSpread: 720,
            angleVelocityBase: 0,
            angleVelocitySpread: 720,

            sizeTween: new Tween([0, 1], [20, 150]),
            opacityTween: new Tween([0.4, 1], [0.5, 0]),
            colorTween: new Tween([0.4, 1], [new Color().setHSL(0, 0, 0.2), new Color().setHSL(0, 0, 0.5)]),
        }
    },
    () => {
        smoke_config.material.dispose()
        smoke_config = undefined
    }
)

export class Smoke_3D {
    static init = init
    static destroy = destroy

    /**
     * 
     * @param {Scene} scene 
     * @param {Vector3} position 
     * @param {number} duration 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(scene, position = new Vector3(0, 0, 20), duration, loop_manager) {

        const engine = new ParticleEngine(scene, loop_manager, position, smoke_config)

        let age = 0
        const update = (dt) => {
            age += dt
            if (age > duration) {
                dispose()
                return
            }
        }

        loop_manager.frame_updates.add(update)
        engine.start()

        const dispose = () => {
            loop_manager.frame_updates.delete(update)
            engine.dispose()
        }
    }
}