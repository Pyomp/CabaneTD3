

import {
    InstancedMesh,
    Matrix4,
    PlaneGeometry,
    ShaderMaterial,
    Vector3
} from '../modules/three.module.js'
import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'

const instances = new Set()
let instanced_mesh
export class Header_3D {
    static init = (scene) => {
        const header_material = new ShaderMaterial({
            uniforms: {},
            vertexShader: /* glsl */ `     
            varying vec2 vUv;
            varying float vHp;
            void main()
            {   
                vUv = uv;
                vHp = instanceMatrix[0][0];
        
                vec4 finalPosition;
                finalPosition = modelMatrix * viewMatrix * instanceMatrix * vec4(.0, .0, .0, 2.0);
                finalPosition.x += position.x;
                finalPosition.y += position.y + .5;
                gl_Position = projectionMatrix * finalPosition;
            }`,
            fragmentShader: /* glsl */ `
        
            varying float vHp;
            varying vec2 vUv;
        
            const float max = pow(.2, 4.);
        
            void main() {
                vec4 color;
                float vignette = (vUv.x - .02) * (vUv.y - .02) * (0.98 - vUv.x) * (.20 - vUv.y);
                if(vUv.y < .2){
                    if(vUv.x < vHp){
                        color = vec4(1., 0., 0., 1.);
                    } else {
                        color = vec4(0.1, 0.1, 0.1, 1.);
                    }
                }
                gl_FragColor += color * smoothstep(0., 0.0002, vignette);
                if (gl_FragColor.a < 0.6) discard;
            }
            `,

            // alphaTest: 0.1,
            // transparent: true,
        })

        const planeGeometry = new PlaneGeometry(1, 1)
        instanced_mesh = new InstancedMesh(planeGeometry, header_material, 10000)
        instanced_mesh.count = 0
        scene.add(instanced_mesh)
        instanced_mesh.onBeforeRender = () => {
            if (instanced_mesh.count !== 0) instanced_mesh.instanceMatrix.needsUpdate = true
        }
    }

    #matrix = new Matrix4()
    #matrix_elements = this.#matrix.elements
    set hp(a) {
        if (this.#matrix_elements[0] === a) return
        this.#matrix_elements[0] = a
    }

    static destroy = () => {
        instanced_mesh = undefined
    }

    /**
     * @param {Vector3} vec3_to_follow 
     * @param {number} offset_y 
     * @param {Loop_Manager} loop_manager 
     */
    constructor() {
        this.mesh_id = instanced_mesh.count
        instanced_mesh.count++
        this.#matrix_elements[5] = 10

        this.set_position = (x, y, z) => {
            this.#matrix_elements[12] = x
            this.#matrix_elements[13] = y
            this.#matrix_elements[14] = z
            instanced_mesh.setMatrixAt(this.mesh_id, this.#matrix)
        }

        instances.add(this)
        this.dispose = () => {
            for (const h of instances) if (this.mesh_id < h.mesh_id) h.mesh_id--
            instances.delete(this)
            instanced_mesh.count--
        }
    }
}
