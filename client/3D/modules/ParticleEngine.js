

import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'
import {
    AdditiveBlending,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Points,
    Scene,
    ShaderMaterial,
    Vector3
} from './three.module.js'

const vec3 = new Vector3()
const col = new Color()
export class Tween {
    constructor(timeArray, valueArray) {
        this.times = timeArray || []
        this.values = valueArray || []
        this.f = []
        for (let i = 0; i < this.times.length - 1; i++) {
            if (Array.isArray(this.values[0])) {
                let a = [], b = []
                for (let j = 0; j < this.values[0].length; j++) {
                    a.push((this.values[i + 1][j] - this.values[i][j]) / (this.times[i + 1] - this.times[i]))
                    b.push(this.values[i][j] - a[j] * this.times[i])
                }
                this.f.push((t) => {
                    const res = []
                    for (let i = 0; i < a.length; i++) {
                        res.push(t * a[i] + b[i])
                    }
                    return res
                })
            } else if (this.values[0].isVector3) {
                let a = [], b = []

                a.push((this.values[i + 1].x - this.values[i].x) / (this.times[i + 1] - this.times[i]))
                a.push((this.values[i + 1].y - this.values[i].y) / (this.times[i + 1] - this.times[i]))
                a.push((this.values[i + 1].z - this.values[i].z) / (this.times[i + 1] - this.times[i]))
                b.push(this.values[i].x - a[0] * this.times[i])
                b.push(this.values[i].y - a[1] * this.times[i])
                b.push(this.values[i].z - a[2] * this.times[i])
                this.f.push((t) => {
                    vec3.x = t * a[0] + b[0]
                    vec3.y = t * a[1] + b[1]
                    vec3.z = t * a[2] + b[2]
                    return vec3
                })
            } else if (this.values[0].isColor) {
                let a = [], b = []
                a.push((this.values[i + 1].r - this.values[i].r) / (this.times[i + 1] - this.times[i]))
                a.push((this.values[i + 1].g - this.values[i].g) / (this.times[i + 1] - this.times[i]))
                a.push((this.values[i + 1].b - this.values[i].b) / (this.times[i + 1] - this.times[i]))
                b.push(this.values[i].r - a[0] * this.times[i])
                b.push(this.values[i].g - a[1] * this.times[i])
                b.push(this.values[i].b - a[2] * this.times[i])
                this.f.push((t) => {
                    col.r = t * a[0] + b[0]
                    col.g = t * a[1] + b[1]
                    col.b = t * a[2] + b[2]
                    return col
                })
            } else {
                const a = (this.values[i + 1] - this.values[i]) / (this.times[i + 1] - this.times[i])
                const b = this.values[i] - a * this.times[i]
                this.f.push((t) => { return t * a + b })
            }
        }
    }
    lerp = function (t) {
        let i = 0
        while (t > this.times[i] && i < this.times.length) i++
        if (i === 0) return this.values[0].isVector3 ? vec3.copy(this.values[0]) :
            this.values[0].isColor ? col.copy(this.values[0]) : this.values[0]
        if (i === this.times.length) return this.values[0].isVector3 ? vec3.copy(this.values[this.times.length - 1]) :
            this.values[0].isColor ? col.copy(this.values[this.times.length - 1]) : this.values[this.times.length - 1]
        return this.f[i - 1](t)
    };
}

const randomVector3 = (base, spread) => {
    vec3.x = (Math.random() - 0.5) * spread.x + base.x
    vec3.y = (Math.random() - 0.5) * spread.y + base.y
    vec3.z = (Math.random() - 0.5) * spread.z + base.z
    return vec3
}

class Particle {
    constructor(engine, position, color, size, angle) {
        this.velocity = new Vector3()
        this.acceleration = new Vector3()

        this.angleVelocity = 0
        this.angleAcceleration = 0

        /**
         * Size géré par engine.base/spreadSize ou sizeTween
         * Opacité géré par engine.base/spreadOpacité ou opacityTween
         * Size géré par engine.base/spreadSize ou sizeTween
         */

        this.age = 0
        this.alive = false

        this.tweenUpdates = []
        if (engine.colorTween && engine.colorTween.times.length > 0) this.tweenUpdates.push(() => {
            engine.colorTween.lerp(this.age)
                .toArray(color)
        })
        if (engine.sizeTween && engine.sizeTween.times.length > 0) this.tweenUpdates.push(() => {
            size[0] = engine.sizeTween.lerp(this.age)
        })
        if (engine.opacityTween && engine.opacityTween.times.length > 0) this.tweenUpdates.push(() => {
            color[3] = engine.opacityTween.lerp(this.age)
        })
        const tweenUpdatesLength = this.tweenUpdates.length

        this.reset = (offsetAge) => {
            if (engine.velocityStyle === ParticleEngine.type.CUBE) {
                this.velocity.copy(randomVector3(engine.velocityBase, engine.velocitySpread))
            } else if (engine.velocityStyle === ParticleEngine.type.SPHERE) {
                const direction = vec3.subVectors(position, engine.positionBase)
                const speed = engine.speedBase + engine.speedSpread * (Math.random() - 0.5)
                this.velocity.copy(direction.normalize().multiplyScalar(speed))
            }

            this.acceleration.copy(randomVector3(engine.accelerationBase, engine.accelerationSpread))

            this.angleVelocity = engine.angleVelocityBase + engine.angleVelocitySpread * (Math.random() - 0.5)
            this.angleAcceleration = engine.angleAccelerationBase + engine.angleAccelerationSpread * (Math.random() - 0.5)

            this.age = offsetAge

            if (engine.positionStyle === ParticleEngine.type.CUBE) {
                randomVector3(engine.positionBase, engine.positionSpread).toArray(position)
            } else if (engine.positionStyle === ParticleEngine.type.SPHERE) {
                const z = (2 * Math.random() - 1) * engine.positionRadius
                const t = 6.2832 * Math.random()
                const r = Math.sqrt(1 - z * z) * engine.positionRadius
                position[0] = engine.positionBase.x + r * Math.cos(t)
                position[1] = engine.positionBase.y + r * Math.sin(t)
                position[2] = engine.positionBase.z + z
            }

            engine.positionBase.toArray(position)

            angle[0] = engine.angleBase + engine.angleSpread * (Math.random() - 0.5)

            randomVector3(engine.colorBase, engine.colorSpread)
            col.setHSL(vec3.x, vec3.y, vec3.z).toArray(color)

            if (engine.opacityTween && engine.opacityTween.times.length > 0) {
                color[3] = 0
            } else {
                color[3] = engine.opacityBase + engine.opacitySpread * (Math.random() - 0.5)
            }
            if (engine.sizeTween && engine.sizeTween.times.length > 0) {
                size[0] = 0
            } else {
                size[0] = engine.sizeBase + engine.sizeSpread * (Math.random() - 0.5)
            }
        }

        this.update = (dt) => {
            this.age += dt
            if (this.age > 1) {
                if (this.endReq) {
                    this.alive = false
                    this.endReq = false
                } else {
                    this.reset(this.age % 1)
                }
            } else {
                this.velocity.x += this.acceleration.x * dt
                this.velocity.y += this.acceleration.y * dt
                this.velocity.z += this.acceleration.z * dt

                this.angleVelocity += this.angleAcceleration * 0.01745329251 * dt

                position[0] += this.velocity.x * dt
                position[1] += this.velocity.y * dt
                position[2] += this.velocity.z * dt

                angle[0] += this.angleVelocity * 0.01745329251 * dt
                for (let i = 0; i < tweenUpdatesLength; i++)
                    this.tweenUpdates[i]()
            }
        }
        this.reset()
    }
}

export class ParticleEngine {
    static type = Object.freeze({ "CUBE": 1, "SPHERE": 2 });
    static baseMat = () => {
        return new ShaderMaterial(
            {
                uniforms: { pointTexture: { value: null }, },
                vertexShader:
                    `attribute vec4  customColor;
            attribute float customSize;
            attribute float customAngle;
            varying vec4  vColor;
            varying float vAngle;
            void main()
            {
                vColor = customColor;
                vAngle = customAngle;
        
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );
                gl_Position = projectionMatrix * mvPosition;
            }`,
                fragmentShader:
                    `uniform sampler2D pointTexture;
            varying vec4 vColor;
            varying float vAngle;
            void main()
            {
                gl_FragColor = vColor;
        
                float c = cos(vAngle);
                float s = sin(vAngle);
                vec2 rotatedUV = vec2(  c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,
                                        c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5); // rotate UV coordinates to rotate texture

                vec4 rotatedTexture = texture2D( pointTexture,  rotatedUV );

                gl_FragColor = gl_FragColor * rotatedTexture; // sets an otherwise white particle texture to desired color
            }`,
                transparent: true,
                blending: AdditiveBlending,
                depthWrite: false,
                vertexColors: true,
            })
    }
  
    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     * @param {Vector3} position 
     * @param {{}} p 
     */
    constructor(scene, loop_manager, position, p = {}) {
        this.timeScale = p.timeScale || 0.5

        this.positionStyle = p.positionStyle || ParticleEngine.type.CUBE

        this.positionBase = position || new Vector3()
        this.positionSpread = p.positionSpread || new Vector3()

        this.positionRadius = p.positionRadius || 0

        this.velocityStyle = p.velocityStyle || ParticleEngine.type.CUBE

        this.velocityBase = p.velocityBase || new Vector3()
        this.velocitySpread = p.velocitySpread || new Vector3()

        this.speedBase = p.speedBase || 0
        this.speedSpread = p.speedSpread || 0

        this.accelerationBase = p.accelerationBase || new Vector3()
        this.accelerationSpread = p.accelerationSpread || new Vector3()

        this.angleBase = p.angleBase || 0
        this.angleSpread = p.angleSpread || 0
        this.angleVelocityBase = p.angleVelocityBase || 0
        this.angleVelocitySpread = p.angleVelocitySpread || 0
        this.angleAccelerationBase = p.angleAccelerationBase || 0
        this.angleAccelerationSpread = p.angleAccelerationSpread || 0

        this.sizeBase = p.sizeBase || 0.0
        this.sizeSpread = p.sizeSpread || 0.0
        this.sizeTween = p.sizeTween || new Tween()

        this.colorBase = p.colorBase || new Vector3(1, 1, 1)
        this.colorSpread = p.colorSpread || new Vector3(0.0, 0.0, 0.0)
        this.colorTween = p.colorTween || new Tween()

        this.opacityBase = p.opacityBase || 0
        this.opacitySpread = p.opacitySpread || 0
        this.opacityTween = p.opacityTween || new Tween()

        const particleArray = []
        this.particleCount = p.particleCount || 100

        this.emitterAge = p.emitterAge || 0.0

        this.particleMaterial = p.material || ParticleEngine.baseMat()
        const particleGeometry = new BufferGeometry()
        particleGeometry.setAttribute('position', new Float32BufferAttribute(new Float32Array(this.particleCount * 3), 3))
        particleGeometry.setAttribute('customColor', new Float32BufferAttribute(new Float32Array(this.particleCount * 4), 4))
        particleGeometry.setAttribute('customSize', new Float32BufferAttribute(new Float32Array(this.particleCount), 1))
        particleGeometry.setAttribute('customAngle', new Float32BufferAttribute(new Float32Array(this.particleCount), 1))

        // let positions = [], colors = [], sizes = [], angles = []
        for (var i = 0; i < this.particleCount; i++) {
            particleArray.push(new Particle(
                this,
                particleGeometry.attributes.position.array.subarray(i * 3, i * 3 + 3),
                particleGeometry.attributes.customColor.array.subarray(i * 4, i * 4 + 4),
                particleGeometry.attributes.customSize.array.subarray(i, i + 1),
                particleGeometry.attributes.customAngle.array.subarray(i, i + 1)))
            // this.resetParticle(particleArray[i])
        }
        this.points = new Points(particleGeometry, this.particleMaterial)

        this.update = (dt) => {
            particleGeometry.attributes.position.needsUpdate = true
            particleGeometry.attributes.customColor.needsUpdate = true
            particleGeometry.attributes.customSize.needsUpdate = true
            particleGeometry.attributes.customAngle.needsUpdate = true
            this.updateCb(dt)
        }
        this.start = () => {
            if (this.updateCb !== _start && this.updateCb !== _life) {
                if (this.updateCb === _end) {
                    restartReq = true
                } else {
                    restartReq = false
                    scene.add(this.points)
                    this.updateCb = _start
                    loop_manager.frame_updates.add(this.update)
                }
            }
        }
        const _start = (dt) => {
            const dtScale = dt * this.timeScale
            for (let i = 0; i < this.particleCount; i++) {
                if (particleArray[i].alive) {
                    particleArray[i].update(dtScale)
                }
            }
            if (this.emitterAge < 1) {
                const endIndex = Math.min(Math.round(this.particleCount * (this.emitterAge + dtScale)), this.particleCount)
                for (let i = Math.round(this.particleCount * (this.emitterAge + 0));
                    i < endIndex; i++) {
                    particleArray[i].reset(0)
                    particleArray[i].alive = true
                }
                this.emitterAge += dtScale
            } else {
                particleGeometry.computeBoundingSphere()
                this.updateCb = _life
            }
        }
        const _life = (dt) => {
            const dtScale = dt * this.timeScale
            for (let i = 0; i < this.particleCount; i++) {
                particleArray[i].update(dtScale)
            }
        }
        const _end = (dt) => {
            const dtScale = dt * this.timeScale
            let aliveNb = 0
            for (let i = 0; i < this.particleCount; i++) {
                if (particleArray[i].alive) {
                    aliveNb++
                    particleArray[i].update(dtScale)
                }
            }
            if (aliveNb === 0) {
                this.points.parent.remove(this.points)
                this.emitterAge = 0
                this.updateCb = () => { }
                loop_manager.frame_updates.delete(this.update)
                if (disposeReq === true) {
                    scene.remove(this.points)
                    this.points.geometry.dispose()
                } else if (restartReq === true) {
                    this.start()
                }
                return true
            }
        }
        let restartReq = false
        this.stop = () => {
            if (this.updateCb === _start || this.updateCb === _life) {
                for (let i = 0, n = particleArray.length; i < n; i++) {
                    particleArray[i].endReq = true
                }
                this.updateCb = _end
            }
        }
        let disposeReq = false
        this.dispose = () => {
            this.stop()
            disposeReq = true
        }
    }
}
