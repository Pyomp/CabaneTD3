




import {
    BufferGeometry,
    Float32BufferAttribute,
    Points,
    ShaderMaterial,
    Sprite,
    SpriteMaterial
} from '../../../modules/three.module.js'

export const init_ball_3D = (loader) => {

    // object3D construction
    const mana_model = new Sprite(
        new SpriteMaterial({
            map: loader.texture_load(new URL('./manaBall.svg', import.meta.url).href),
            transparent: true, depthWrite: false,
        }))
    const ki_model = new Sprite(
        new SpriteMaterial({
            map: loader.texture_load(new URL('./kiBall.svg', import.meta.url).href),
            transparent: true, depthWrite: false,
        }))
    const particulesGeometry = new BufferGeometry()
    {
        const positions = [], sizes = []
        for (let i = 0; i < 100; i++) {
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos((Math.random() * 2 - 1))
            const r = Math.random() ** 0.5 / 2.5
            positions.push(r * Math.cos(theta) * Math.sin(phi), r * Math.cos(phi), r * Math.sin(theta) * Math.sin(phi))
            sizes.push(Math.random() * 0.2)
        }
        particulesGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
        particulesGeometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    }

    const particulesMaterial = new ShaderMaterial({
        uniforms: {
            pointTexture: { value: loader.texture_load(new URL('../../../modules/particle_texture/blur.svg', import.meta.url).href) },
        },
        vertexShader:
            `attribute float size;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                    gl_PointSize = size * ( 300.0 / -mvPosition.z );
                    gl_Position = projectionMatrix * mvPosition;
                }`,
        fragmentShader:
            `uniform sampler2D pointTexture;
                void main() {
                    gl_FragColor = vec4( 1,1,1, 0 );
                    gl_FragColor = (gl_FragColor + texture2D( pointTexture, gl_PointCoord ));
                }`,
        depthWrite: false,
        transparent: true
    })
    const particules = new Points(particulesGeometry, particulesMaterial)
    mana_model.add(particules)
    ki_model.add(particules.clone())

    return {
        mp: mana_model,
        ki: ki_model,
    }

}











