


import {
    AddEquation,
    BufferAttribute,
    BufferGeometry,
    CustomBlending,
    OneFactor,
    OneMinusSrcAlphaFactor,
    Points,
    ShaderMaterial,
    Texture,
} from '../../../../client/3D/modules/three.module.js'
import { default_parameters } from './default_parameters.js'

export class View {
    constructor(
        scene,
        updates,
        buffers,
        parameters = default_parameters,
    ) {

        this.count = parameters.count || default_parameters.count
        this.position_base = parameters.position_base || default_parameters.position_base
        this.position_spread = parameters.position_spread || default_parameters.position_spread

        const data_ui32a = new Uint32Array(buffers.data)
        const position_f32a = new Float32Array(buffers.position)
        const velocity_f32a = new Float32Array(buffers.velocity)
        const acceleration1_f32a = new Float32Array(buffers.acceleration1)
        const acceleration2_f32a = new Float32Array(buffers.acceleration2)
        const color_f32a = new Float32Array(buffers.color)
        const time_f32a = new Float32Array(buffers.time)

        const particleGeometry = new BufferGeometry()
        particleGeometry.setAttribute('position', new BufferAttribute(position_f32a, 3))
        particleGeometry.setAttribute('velocity', new BufferAttribute(velocity_f32a, 3))
        particleGeometry.setAttribute('acceleration1', new BufferAttribute(acceleration1_f32a, 3))
        particleGeometry.setAttribute('acceleration2', new BufferAttribute(acceleration2_f32a, 3))
        particleGeometry.setAttribute('color', new BufferAttribute(color_f32a, 3))
        particleGeometry.setAttribute('time', new BufferAttribute(time_f32a, 1))

        this.start = () => {
            updates.add(update)
            clearTimeout(timeout)
            points.visible = true
        }

        let timeout
        this.stop = () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                points.visible = false
                updates.delete(update)
            }, 1000 / parameters.time_scale)
        }

        const img = new Image(64, 64)
        img.src = new URL('./texture.svg', import.meta.url).href
        const tex = new Texture(img)
        tex.flipY = false
        img.onload = () => { tex.needsUpdate = true }

        const uniforms = {
            sync: { value: 0 },
            pointTexture: { value: tex }
        }

        const mat = new ShaderMaterial(
            {
                uniforms: uniforms,
                vertexShader:
                   /* glsl */ `
            attribute vec3 velocity;
            attribute vec3 acceleration1;
            attribute vec3 acceleration2;

            attribute vec3 color; 
            varying vec3 vColor;

            attribute float time;
            varying float vTime;

            uniform float sync;
            varying float vSync;

            varying vec2 vuv_offset;

            void main()
            {   
                vColor = color;
                vTime = time + sync;
                
                float a = mod(float(gl_VertexID), 4.);
                if( a == 0. ){
                    vuv_offset.x = 0.5;
                    vuv_offset.y = 0.5;
                } else if (a == 1.){
                    vuv_offset.x = 0.5;
                } else if (a == 2.){
                    vuv_offset.y = 0.5;
                }

                vec3 velocity_accelerated = velocity 
                    + (vTime < 0.5 ? acceleration1 : acceleration2)
                    * sync * ${parameters.time_scale};

                velocity_accelerated /= ${parameters.acceleration_ratio.toFixed(2)};

                vec4 mvPosition = modelViewMatrix * vec4( position + velocity_accelerated * sync * ${parameters.time_scale}, 1.0 );

                gl_PointSize *=  100.0 / length( mvPosition.xyz );
                gl_Position = projectionMatrix * mvPosition;
            }`,
                /////////////////////////////////////////////////
                fragmentShader: /* glsl */`
            uniform sampler2D pointTexture;
            varying float vTime;
            varying vec3 vColor;
            varying vec2 vuv_offset;

            void main()
            {
                if( vTime > 1. ) discard;

                vec2 uv = vec2(gl_PointCoord/2. + vuv_offset);
                gl_FragColor = texture2D( pointTexture, uv );

                float opacity = exp( -pow( (vTime - .5) , 2.) / 0.05 ) / 3.;

                gl_FragColor *= vec4(vColor, opacity);
                gl_FragColor.xyz *= gl_FragColor.w;
                gl_FragColor.w *= 0.9;      

            }`,
                transparent: true,
                blending: CustomBlending,
                blendEquation: AddEquation,
                blendSrc: OneFactor,
                blendDst: OneMinusSrcAlphaFactor,
                depthWrite: false,
            })

        const points = new Points(particleGeometry, mat)
        this.position = points.position
        scene.add(points)
        points.visible = false

        let last_update = 0
        const update = (dt) => {
            if (data_ui32a[0] === last_update) {

                mat.uniforms.sync.value += dt

            } else {
                mat.uniforms.sync.value = 0
                last_update = data_ui32a[0]
                particleGeometry.attributes.position.needsUpdate = true
                particleGeometry.attributes.velocity.needsUpdate = true
                particleGeometry.attributes.time.needsUpdate = true

                // particleGeometry.computeBoundingSphere()
            }
        }
    };
}
