import { Loop_Manager } from '../../../../common/systems/Loop_Manager.js'
import { Scene, Sprite } from '../../modules/three.module.js'
import { Third_Controls } from '../player/Third_Controls.js'

export class Item_3D {

    constructor(
        /** @type {Scene} */ scene,
        /** @type {} */ model,
        /** @type {Loop_Manager} */ loop_manager,
        /** @type {Third_Controls} */ third_controls,
        mat_item,
        mat_rank,
    ) {
        const obj3D = new Sprite(mat_item)
        obj3D.renderOrder = 1
        obj3D.add(new Sprite(mat_rank))
        obj3D.scale.set(3, 3, 3)

        const position = obj3D.position
        position.set(model.position)

        const update_position = (dt) => {
            const dt_physics_raf = loop_manager.dt_physics_raf

            position.copy(model.position)

            const velo_x = model.velocity.x * dt_physics_raf
            const velo_y = model.velocity.y * dt_physics_raf
            const velo_z = model.velocity.z * dt_physics_raf

            position.x += velo_x
            position.y += velo_y
            position.z += velo_z
        }
        loop_manager.frame_updates.add(update_position)

        third_controls.obj3D_add_click(obj3D, model.click)
        scene.add(obj3D)
        this.dispose = () => {
            scene.remove(obj3D)
            loop_manager.frame_updates.delete(update_position)
            third_controls.obj3D_delete_click(obj3D)
        }
        model.on_dispose = this.dispose
    }
}









