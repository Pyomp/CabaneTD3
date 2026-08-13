






import { ShaderMaterial } from "../modules/three.module.js"


new ShaderMaterial({
    uniforms: { pointTexture: { value: null }, },
    vertexShader: /* glsl */`
    attribute float customSize;
    void main()
    {
        vColor = customColor;

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
    }`,
    fragmentShader: /* glsl */`
    uniform sampler2D pointTexture;
    void main()
    {
        gl_FragColor = gl_FragColor * pointTexture;
    }`,
    transparent: true,
})




