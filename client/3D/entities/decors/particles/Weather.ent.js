import { AdditiveBlending, TextureLoader, Vector3 } from '../../3D/modules/three.module.js'
import sparkPNG from "../../assets/particleTex/spark.png"
import rainPNG from "../../assets/particleTex/raindrop2flip.png"
import snowflakePNG from "../../assets/particleTex/snowflake.png"
import { eT } from "../../systems/eventTimer.js"

import { ParticleEngine, Tween } from "../../models/ParticleEngine.js"
import { THR } from "../../3Dinit.js"

const matFireflies = ParticleEngine.baseMat()
matFireflies.blending = AdditiveBlending
matFireflies.uniforms.pointTexture.value = new TextureLoader().load(sparkPNG)
const fireflies = {
    positionStyle: ParticleEngine.type.CUBE,
    positionBase: new Vector3(0, 15, 0),
    positionSpread: new Vector3(70, 30, 70),

    velocityStyle: ParticleEngine.type.CUBE,
    velocityBase: new Vector3(0, 0, 0),
    velocitySpread: new Vector3(15, 5, 15),

    material: matFireflies,

    sizeBase: 7,
    sizeSpread: 6,
    opacityTween: new Tween([0, 0.2, 0.25, 0.50, 0.55, 0.65, 0.7, 0.95, 1],
        [0.2, 0.2, 1, 1, 0.2, 0.2, 1, 1, 0.2,]),
    colorBase: new Vector3(0.30, 1.0, 0.6), // H,S,L
    colorSpread: new Vector3(0.3, 0.0, 0.0),

    timeScale: 0.1,

    particleCount: 100,
}

const matRain = ParticleEngine.baseMat()
matRain.blending = AdditiveBlending
matRain.uniforms.pointTexture.value = new TextureLoader().load(rainPNG)
export const rain = {
    positionStyle: ParticleEngine.type.CUBE,
    positionBase: new Vector3(0, 50, 0),
    positionSpread: new Vector3(70, 0, 70),

    velocityStyle: ParticleEngine.type.CUBE,
    velocityBase: new Vector3(0, -60, 0),
    velocitySpread: new Vector3(10, 50, 10),
    accelerationBase: new Vector3(0, -10, 0),

    material: matRain,

    sizeBase: 2,
    sizeSpread: 0.5,
    colorBase: new Vector3(0.66, 1.0, 0.7), // H,S,L
    colorSpread: new Vector3(0.00, 0.0, 0.2),
    opacityBase: 0.8,

    timeScale: 1,

    particleCount: 200,
}

const matSnow = ParticleEngine.baseMat()
matSnow.blending = AdditiveBlending
matSnow.uniforms.pointTexture.value = new TextureLoader().load(snowflakePNG)
export const snow = {
    positionStyle: ParticleEngine.type.CUBE,
    positionBase: new Vector3(0, 50, 0),
    positionSpread: new Vector3(70, 0, 70),

    velocityStyle: ParticleEngine.type.CUBE,
    velocityBase: new Vector3(0, -45, 0),
    velocitySpread: new Vector3(40, 1, 40),
    accelerationBase: new Vector3(0, -10, 0),

    angleBase: 0,
    angleSpread: 720,
    angleVelocityBase: 0,
    angleVelocitySpread: 100,

    material: matSnow,

    sizeTween: new Tween([0, 0.1], [0.1, 2]),
    colorBase: new Vector3(0.66, 1.0, 0.9), // H,S,L
    opacityTween: new Tween([0.7, 1], [0.8, 0]),

    timeScale: 0.03,

    particleCount: 100,
}

const effects = [fireflies, snow]

export class Weather {
    constructor() {
        this.engine = new ParticleEngine(effects[1])
        this.obj3D = this.engine.points
        this.engine.start()

        this.current = 0

        eT.hCb.push(() => {
            this.engine.stop()
            this.current = (this.current + 1) % 2
        })
    }
    update = () => {
        if (this.engine.update()) {
            this.engine = new ParticleEngine(effects[this.current])
            this.engine.start()
        }
    };
}