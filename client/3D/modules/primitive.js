import { svgToImg } from "../../../utils/clientUtils.js"
import {
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    SphereGeometry,
    Vector3,
    Sprite,
    SpriteMaterial,
    Texture,
    DataTexture,
    LuminanceFormat,
    NearestFilter
} from "./three.module.js"

const hpBarModel = new Sprite(new SpriteMaterial({ color: 0xff0000 }))
hpBarModel.scale.set(0.7, 0.1, 1)
export const createHpBar = () => {
    return hpBarModel.clone(false)
}
export const planeGeometryGround = new PlaneGeometry()
planeGeometryGround.rotateX(-Math.PI / 2)
planeGeometryGround.translate(0, 0.01, 0)

export const planeGeometry = new PlaneGeometry()

export const greenBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 })
export const orangeBasicMaterial = new MeshBasicMaterial({ color: 0xfff000 })
export const redBasicMaterial = new MeshBasicMaterial({ color: 0xff0000 })

export const sphereGeometry = new SphereGeometry()

export const planeMesh = new Mesh(planeGeometryGround, orangeBasicMaterial)

export const vector3_up = new Vector3(0, 1, 0)
export const vector3_down = new Vector3(0, -1, 0)
export const vector3_front = new Vector3(0, 0, 1)

const sparkImage = new Image()
export const sparkTexture = new Texture(sparkImage)

svgToImg(`<svg width="128px" height="128px" version="1.1" viewBox="0 0 128 128"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
<radialGradient id="sparka" cx="64" cy="64" r="64"
gradientUnits="userSpaceOnUse">
<stop stop-color="#fff" offset="0" />
<stop stop-color="#fff" stop-opacity=".25" offset=".25" />
<stop stop-color="#fff" stop-opacity=".5" offset=".5" />
<stop stop-color="#fff" stop-opacity=".1" offset=".75" />
<stop stop-color="#fff" stop-opacity="0" offset="1" />
</radialGradient>
<circle cx="64" cy="64" r="64" fill="url(#sparka)"/>
</svg>
`, sparkImage).then(sparkTexture.needsUpdate = true)



export const gradient_map = new DataTexture(new Uint8Array([100, 170, 250]), 3, 1, LuminanceFormat)
gradient_map.minFilter = NearestFilter
gradient_map.magFilter = NearestFilter
gradient_map.generateMipmaps = false
