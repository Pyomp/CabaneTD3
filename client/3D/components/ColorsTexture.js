import { Color, Texture } from '../modules/three.module.js'
import { svgToCanvas } from '../../../utils/clientUtils.js'
import { REGEX } from '../../../utils/REGEX.js'
import { mergeObjectsRec } from '../../../utils/utils.js'


/**
 * - data from 3D init (svg plain text, name of custom color)  
 * - update texture: colorsTextureManager.setColor(colors)
 * - handle network
*/

const colorThreeJsBuff = new Color()
export class ColorsTexture {

    constructor(object3D, data) {

        this.colorsName = data.colorsName
        const modelName = object3D.name
        let _3D_COLORS = { [modelName]: [] }
        
        // create texture 
        const canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 128
        const tex = new Texture(canvas)

        // clone materials and set texture
        object3D.traverse((child) => {
            if (child.material) {
                child.material = child.material.clone()
                child.material.map = tex
            }
        })

        // update texture following this.colors or param
        let isFromMe = false
        this.update = async () => {
            if (isFromMe) return

            if (!_3D_COLORS[modelName] || _3D_COLORS[modelName].length !== this.colorsName.length) {
                const colorsBuff = []
                for (let i = 0; i < data.colorsName.length; i++) {
                    if (_3D_COLORS[modelName] && REGEX.color_hex.test(_3D_COLORS[modelName][i])) {
                        colorsBuff.push(_3D_COLORS[modelName][i])
                    } else {
                        colorsBuff.push(colorThreeJsBuff.setHSL(Math.random(), 1, 0.7).getHexString())
                    }
                }
                isFromMe = true
                mergeObjectsRec(_3D_COLORS[modelName], colorsBuff)
                isFromMe = false
            }

            let str = data.svg
            for (let i = 0; i < _3D_COLORS[modelName].length; i++)
                str = str.replace(`#color${i}`, '#' + _3D_COLORS[object3D.name][i])

            await svgToCanvas(str, canvas)

            tex.needsUpdate = true
        }

        this.update()
 
        this.dispose = () => {
            tex.dispose()
        }
    }
}


