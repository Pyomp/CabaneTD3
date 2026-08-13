







import { Quest_System } from '../../../../../common/systems/Quest_System.js'
import { Quest_Data } from '../../../../../common/user_data/models/Quest_Data.js'
import { PI2 } from '../../../../../utils/math/math_utils.js'
import { Object3D } from '../../../modules/three.module.js'
// import { dialogDiv } from '../../decors/Dialog.ent.js'
import { Third_Controls } from '../../player/Third_Controls.js'

export class Coin_Coin_3D {

    /**
     * @param {Third_Controls} third_controls 
     * @param {Quest_Data} quest_data 
     * @param {Object3D} obj3D 
     */
    constructor(
        scene,
        third_controls,
        obj3D,
        /** @type {Quest_System} */ quest_system,
    ) {
        obj3D.position.x = 1.3

        const pivot = new Object3D()
        pivot.add(obj3D)
        pivot.position.set(12.8, 0, -4.3)

        let is_dialog_displayed = false
        const on_click = () => {
            quest_system.click_ducky()
            if (is_dialog_displayed === false) {
                is_dialog_displayed = true
            }
        }

        third_controls.obj3D_add_click(obj3D, on_click)

        const r_pivot = pivot.rotation
        this.update = (dt) => {
            r_pivot.y = (r_pivot.y - dt) % PI2
        }

        scene.add(pivot)
        this.dispose = () => {
            scene.remove(pivot)
            third_controls.obj3D_delete_click(obj3D)
        }
    }
}
