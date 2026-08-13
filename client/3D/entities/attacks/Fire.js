import { ParticleEngine, Tween } from "../../models/ParticleEngine.js"
import smokeparticlePNG from "../../assets/particleTex/smokeparticle.png"
import { AdditiveBlending, Color, TextureLoader, Vector3 } from '../../3D/modules/three.module.js'
import { UPDATE } from "../../manager.js"
import { THR } from "../../3Dinit.js"
import { STATE } from "../../appData/gameData/state.js"
import { USER } from '../../index.js'

const matCandle = ParticleEngine.baseMat()
matCandle.blending = AdditiveBlending
matCandle.uniforms.pointTexture.value = new TextureLoader().load(smokeparticlePNG)

export const candle = {
    positionStyle: ParticleEngine.type.SPHERE,

    positionBase: new Vector3(0, 0.5, 12),
    // positionSpread: new Vector3(2, 2, 2),
    positionRadius: 0.1,

    velocityStyle: ParticleEngine.type.CUBE,
    velocityBase: new Vector3(0, 10, 20),
    velocitySpread: new Vector3(4, 0, 0),
    accelerationBase: new Vector3(0, 0, -30),

    material: matCandle,
    particleCount: 100,

    sizeTween: new Tween([0, 0.2, 0.95], [0, 5, 20]),
    colorTween: new Tween([0.3, 0.7], [new Color().setHSL(0.02, 1, 0.5), new Color().setHSL(0.05, 1, 0.2)]),
}

let engine
export const init_fireEnemyAttack = () => {
    engine = new ParticleEngine(candle)
    let power = 0
    USER.hpCb.add(
        (diff) => { if (diff < 0) power = Math.min(power + 0.1, 1) }
    )
    const update = () => {
        engine.velocityBase.x = Math.sin(THR.time) * 5
        power = Math.max(power - THR.deltaTime/2, 0)
        engine.opacityBase = power
    }
    STATE.waveCb.add(() => {
        engine.opacityBase = 0
        engine.start()
        UPDATE.add(update)
    })
    STATE.waveEndCb.add(() => {
        power = 0
        engine.opacityBase = 0
        engine.stop()
        UPDATE.delete(update)
    })
}