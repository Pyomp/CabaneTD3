








import {
    Color,
    DynamicDrawUsage,
    InstancedMesh,
    Matrix4,
    MeshLambertMaterial,
    Scene,
} from '../../../modules/three.module.js'

class Flower {
    constructor(
        position,
        stemMesh,
        blossomMesh,
        index,
    ) {
        let age = Math.random() * 120
        const matrix = new Matrix4()
        const matrix_elements = matrix.elements
        matrix_elements[12] = position.x
        matrix_elements[13] = position.y
        matrix_elements[14] = position.z

        if (age < 100) {
            matrix_elements[0] = matrix_elements[5] = matrix_elements[10] = 1
        } else {
            matrix_elements[0] = matrix_elements[5] = matrix_elements[10] = 0
        }

        this.update = (dt) => {
            age = (age + dt) % 140
            if (age < 4) {
                matrix_elements[0] = matrix_elements[5] = matrix_elements[10] = age / 4
            } else if (age > 100 && age < 104) {
                matrix_elements[0] = matrix_elements[5] = matrix_elements[10] = (104 - age) / 4
            }

            stemMesh.setMatrixAt(index, matrix)
            blossomMesh.setMatrixAt(index, matrix)
        }
    }
}

export class Flowers_3D {
    constructor(
        /** @type {Scene} */ scene,
        _stemMesh,
        _blossomMesh,
    ) {
        const count = 100
        const stemGeometry = _stemMesh.geometry.clone()
        const blossomGeometry = _blossomMesh.geometry.clone()

        const mat = new MeshLambertMaterial({})
        const stemMesh = new InstancedMesh(stemGeometry, mat, count)
        const blossomMesh = new InstancedMesh(blossomGeometry, mat, count)

        // Assign random colors to the blossoms.
        const color = new Color()

        const flowers = []
        for (let i = 0; i < count; i++) {

            const pos = i < 80 ?
                {
                    x: 9.5 + Math.random() + i / 30,
                    y: 0,
                    z: 3 + Math.random() + (i / 2) % 5
                } : {
                    x: (5 + 12 * Math.random()) * (Math.random() < 0.5 ? -1 : 1),
                    y: 0,
                    z: 20 * Math.random() - 10
                }

            flowers.push(new Flower(
                pos,
                stemMesh,
                blossomMesh,
                i
            ))

            // color.setHex(0xff0000)
            color.setHSL(Math.random(), 1, .7)
            blossomMesh.setColorAt(i, color)
            color.setHSL(0.35, .8, .6)
            stemMesh.setColorAt(i, color)
        }

        this.update = (dt) => {
            for (let i = 0; i < count; i++) {
                flowers[i].update(dt)
            }
            stemMesh.instanceMatrix.needsUpdate = true
            blossomMesh.instanceMatrix.needsUpdate = true
        }

        stemMesh.instanceMatrix.setUsage(DynamicDrawUsage)
        blossomMesh.instanceMatrix.setUsage(DynamicDrawUsage)

        scene.add(stemMesh, blossomMesh)

        this.dipose = () => {
            flowers.length = 0
            scene.remove(stemMesh, blossomMesh)
            mat.dispose()
            stemGeometry.dispose()
            blossomGeometry.dispose()
            stemMesh.dispose()
            blossomMesh.dispose()
        }
    }
}









