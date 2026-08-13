import { Loop_Manager } from '../../../../common/systems/Loop_Manager.js'
import { Loot_System } from '../../../../common/systems/Loot_System.js'
import { Item_Image } from '../../../ressources/item_images/Item_Image.js'
import { Loader_Manager } from '../../modules/Loader_Manager.js'
import { SpriteMaterial, Texture } from '../../modules/three.module.js'
import { Third_Controls } from '../player/Third_Controls.js'
import { Item_3D } from './Item_3D.js'




let rank_mats, item_mats
export const init = (
   /** @type {Loader_Manager} */ loader_manager,
    /** @type {Item_Image} */ item_image
) => {
    const createCircleFadeTexture = (color = [255, 0, 0], size = 16) => {
        let matCanvas = document.createElement('canvas')
        matCanvas.width = matCanvas.height = size
        let ctx = matCanvas.getContext('2d')
        let texture = new Texture(matCanvas)
        const center = size / 2
        let gradient = ctx.createRadialGradient(center, center, 0, center, center, center - 1)
        gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`)
        gradient.addColorStop(0.6, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`)
        gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)
        ctx.arc(center, center, center, 0, 2 * Math.PI)
        ctx.fillStyle = gradient
        ctx.fill()

        texture.needsUpdate = true
        return texture
    }
    const tex = createCircleFadeTexture([255, 255, 255])
    rank_mats = [
        new SpriteMaterial({ color: 0x999999, transparent: true, depthWrite: false, map: tex }),
        new SpriteMaterial({ color: 0x44ff44, transparent: true, depthWrite: false, map: tex }),
        new SpriteMaterial({ color: 0x4444ff, transparent: true, depthWrite: false, map: tex }),
        new SpriteMaterial({ color: 0x7f00ff, transparent: true, depthWrite: false, map: tex }),
        new SpriteMaterial({ color: 0xffff00, transparent: true, depthWrite: false, map: tex }),
        new SpriteMaterial({ color: 0xff4444, transparent: true, depthWrite: false, map: tex }),
    ]
    item_mats = {}
    {
        const texture = loader_manager.texture_load(item_image.axe)
        item_mats['axe'] = new SpriteMaterial({ map: texture, transparent: true })
    } {
        const texture = loader_manager.texture_load(item_image.hammer)
        item_mats['hammer'] = new SpriteMaterial({ map: texture, transparent: true })
    } {
        const texture = loader_manager.texture_load(item_image.skull_staff)
        item_mats['skull_staff'] = new SpriteMaterial({ map: texture, transparent: true })
    } {
        const texture = loader_manager.texture_load(item_image.staff)
        item_mats['staff'] = new SpriteMaterial({ map: texture, transparent: true })
    } {
        const texture = loader_manager.texture_load(item_image.wood_stick)
        item_mats['wood_stick'] = new SpriteMaterial({ map: texture, transparent: true })
    } {
        const texture = loader_manager.texture_load(item_image.arrow)
        item_mats['arrow'] = new SpriteMaterial({ map: texture, transparent: true })
    }
}

export class Items_3D_Manager {
    static init = (loader_manager, item_image) => {
        init(loader_manager, item_image)
    }
    static destroy = () => {
        rank_mats = undefined
        item_mats = undefined
    }

    constructor(
        scene,
        /** @type {Loot_System} */ loot_system,
        /** @type {Loop_Manager} */ loop_manager,
        /** @type {Third_Controls} */ third_controls,
    ) {

        const disposes = []
        const add_item = (name) => {
            const cb = (item) => {
                new Item_3D(scene, item, loop_manager, third_controls,
                    item_mats[name],
                    rank_mats[item.data.rank]
                )
            }
            loot_system.addEventListener(name, cb)
            disposes.push(() => {
                loot_system.removeEventListener(name, cb)
            })
        }

        this.dispose = () => {
            for (const cb of disposes) {
                cb()
            }
            disposes.length = 0
        }

        [
            'axe',
            'hammer',
            'skull_staff',
            'staff',
            'wood_stick',
            'arrow',

        ].forEach((v) => { add_item(v) })
    }
}










