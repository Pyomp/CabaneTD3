


import {
    AddEquation,
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    CustomBlending,
    OneFactor,
    OneMinusSrcAlphaFactor,
    Points,
    Scene,
    ShaderMaterial,
    Texture,
} from '../../../../modules/three.module.js'
import { default_parameters } from './default_parameters.js'

export class Particle_Comet_View {


    constructor(
        scene,
        updates,
        buffers,
        parameters = default_parameters,
    ) {

        this.count = parameters.count || default_parameters.count
        this.position_base = parameters.position_base || default_parameters.position_base
        this.position_spread = parameters.position_spread || default_parameters.position_spread

        this.velocity_base = parameters.velocity_base || default_parameters.velocity_base
        this.velocity_spread = parameters.velocity_spread || default_parameters.velocity_spread

        this.acceleration_tween = parameters.acceleration_tween || default_parameters.acceleration_tween

        const data_ui32a = new Uint32Array(buffers.data)
        const position_f32a = new Float32Array(buffers.position)
        const velocity_f32a = new Float32Array(buffers.velocity)

        const time_f32a = new Float32Array(buffers.time)

        this.start = () => {
            updates.add(update)
            clearTimeout(timeout)
            points.visible = true
        }

        let timeout
        this.stop = (disposeReq = false) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                points.visible = false
                updates.delete(update)
                if (disposeReq === true) {
                    mat.dispose()
                    particleGeometry.dispose()
                }
            }, 1000 / parameters.time_scale)
        }

        this.dispose = () => {
            this.stop(true)
            delete this.stop
            delete this.start
        }

        const particleGeometry = new BufferGeometry()
        particleGeometry.setAttribute('position', new BufferAttribute(position_f32a, 3))
        particleGeometry.setAttribute('velocity', new BufferAttribute(velocity_f32a, 3))
        particleGeometry.setAttribute('time', new BufferAttribute(time_f32a, 1))

        const img = new Image(64, 64)
        img.src = new URL('./fire.svg', import.meta.url).href
        const tex = new Texture(img)
        tex.flipY = false
        img.onload = () => { tex.needsUpdate = true }

        const uniforms = {
            sync: { value: 0 },
            color: { value: parameters.color },
            size: { value: parameters.size },
            acceleration: { value: parameters.acceleration_tween.flat() },
            pointTexture: { value: tex }
        }

        const mat = new ShaderMaterial(
            {
                uniforms: uniforms,
                vertexShader:
                   /* glsl */ `
            attribute vec3 velocity;
            uniform float acceleration[${uniforms.acceleration.value.length}];
            uniform float size[${uniforms.size.value.length}];

            attribute float time;
            varying float vTime;

            uniform float sync;
            varying float vSync;

            varying vec2 vuv_offset;

            void main()
            {   
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
                

                // size
                int index = 0;
                while( vTime > size[index * 2] ) {
                    index++;
                    if((index * 2) >= ${uniforms.size.value.length}) break;
                }
               
                if(index == 0){ 
                    gl_PointSize = size[1];
                } else if (index >= ${uniforms.size.value.length} / 2 ) {
                    int i = ${uniforms.size.value.length} - 2;
                    gl_PointSize = size[i+1];
                } else {
                    float before_size = size[(index - 1) * 2 + 1];
                    float after_size = size[index * 2 + 1];
                    float x = ( vTime - size[ (index - 1) * 2 ] ) / ( size[ index  * 2 ] - size[ (index - 1) * 2 ] );
                    gl_PointSize = mix(before_size, after_size, x);
                }    
                //

                // acceleration tween
                index = 0;
                vec3 final_acceleration;

                while( vTime > acceleration[index * 4] ) {
                    index++;
                    if((index * 4) >= ${uniforms.acceleration.value.length}) break;
                }

                if(index == 0){ 

                    final_acceleration = vec3(acceleration[1], acceleration[2], acceleration[3]);

                } else if (index >= ${uniforms.acceleration.value.length} / 4 ) {

                    int i = ${uniforms.acceleration.value.length} - 4;
                    final_acceleration = vec3(acceleration[i+1], acceleration[i+2], acceleration[i+3]);

                } else {

                    vec3 before_acc = vec3(
                        acceleration[(index - 1) * 4 + 1],
                        acceleration[(index - 1) * 4 + 2],
                        acceleration[(index - 1) * 4 + 3]);

                    vec3 after_acc = vec3(
                        acceleration[index * 4 + 1],
                        acceleration[index * 4 + 2],
                        acceleration[index * 4 + 3]);

                    float x = ( vTime - acceleration[ (index - 1) * 4 ] ) / ( acceleration[ index  * 4 ] - acceleration[ (index - 1) * 4 ] );
                   
                    final_acceleration = mix(before_acc, after_acc, x);
                }                
                // 

                vec3 velocity_accelerated = velocity + final_acceleration * sync;
                vec4 mvPosition = modelViewMatrix * vec4( position + velocity_accelerated * sync, 1.0 );

                gl_PointSize *=  300.0 / length( mvPosition.xyz );
                gl_Position = projectionMatrix * mvPosition;
            }`,
                /////////////////////////////////////////////////
                fragmentShader: /* glsl */`
            uniform float color[${uniforms.color.value.length}]; 
            uniform sampler2D pointTexture;

            varying float vTime;
            varying vec2 vuv_offset;

            void main()
            {
                if( vTime > 1. ) discard;

                int index = 0;
                
                while( vTime > color[index * 5] ) {
                    index++;
                    if((index * 5) >= ${uniforms.color.value.length}) break;
                }
                
                vec2 uv = vec2(gl_PointCoord/2. + vuv_offset);
                gl_FragColor = texture2D( pointTexture, uv );
                
                if(index == 0){ 

                    gl_FragColor *= vec4(color[1], color[2], color[3], color[4]);

                } else if (index >= ${uniforms.color.value.length} / 5 ) {

                    int i = ${uniforms.color.value.length} - 5;
                    gl_FragColor *= vec4(color[i+1], color[i+2], color[i+3], color[i+4]);

                } else {

                    vec4 before_color = vec4(
                        color[(index - 1) * 5 + 1],
                        color[(index - 1) * 5 + 2],
                        color[(index - 1) * 5 + 3],
                        color[(index - 1) * 5 + 4]);

                    vec4 after_color = vec4(
                        color[index * 5 + 1],
                        color[index * 5 + 2],
                        color[index * 5 + 3],
                        color[index * 5 + 4]);

                    float x = ( vTime - color[ (index - 1) * 5 ] ) / ( color[ index  * 5 ] - color[ (index - 1) * 5 ] );
                   
                    gl_FragColor *= mix(before_color, after_color, x);
                    gl_FragColor.xyz *= gl_FragColor.w;
                    gl_FragColor.w *= 0.5;
                }                
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
