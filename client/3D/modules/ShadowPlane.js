import { intersected_objects } from '../Three_Context.js'
import { PI05 } from '../../../utils/utils.js'
import { svgToImg } from '../../../utils/clientUtils.js'
import { vector3_up } from './primitive.js'
// import { planeGeometry } from './baseGeometryAndMaterial.js'
import { Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from './three.module.js'

const vec3Down = { x: 0, y: -1, z: 0 }
const img = new Image()
export const tex = new Texture(img)

svgToImg(`<svg width="128px" height="128px" version="1.1" viewBox="0 0 128 128"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
<radialGradient id="sparka" cx="64" cy="64" r="64"
gradientUnits="userSpaceOnUse">
<stop stop-color="#000" stop-opacity=".5" offset="0" />
<stop stop-color="#000" stop-opacity=".5" offset="0.8" />
<stop stop-color="#000" stop-opacity="0" offset="1" />
</radialGradient>
<circle cx="64" cy="64" r="64" fill="url(#sparka)"/>
</svg>
`, img).then(tex.needsUpdate = true)

const planeGeometry = new PlaneGeometry()
planeGeometry.rotateX(-PI05)

export class ShadowPlane {
    constructor(scene, entPosition) {
        const mesh = new Mesh(
            planeGeometry,
            new MeshBasicMaterial({
                color: 0, map: tex, transparent: true,
            })
        )
        mesh.renderOrder = 2
        const mat = mesh.material
        const pos = mesh.position
        const rot = mesh.rot

        let entPos = entPosition

        this.setScale = (ratio) => {
            mesh.scale.set(ratio, ratio, 1)
        }
        this.setPositionVector = (position) => {
            entPos = position
            scene.add(mesh)
        }
        this.dispose = () => {
            scene.remove(mesh)
            mat.dispose()
        }
        this.update = () => {
            const raycastResult = intersected_objects(
                entPos,
                vec3Down,
                50
            )[0]

            if (raycastResult) {
                const objPoint = raycastResult.point
                const objNormal = raycastResult.face.normal
                pos.x = objPoint.x
                pos.y = objPoint.y + 0.02
                pos.z = objPoint.z

                mesh.quaternion.setFromUnitVectors(vector3_up, objNormal)

                mat.opacity = (1 - raycastResult.distance / 50)
            } else {
                mat.opacity = 0
            }

        }
    }
}