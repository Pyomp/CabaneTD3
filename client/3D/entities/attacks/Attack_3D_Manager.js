import { Bee } from '../../../../common/entities/attacks/Bee.js'
import { Orb } from '../../../../common/entities/attacks/Orb.js'
import { Spark } from '../../../../common/entities/attacks/Spark.js'
import { init_attacks_3D } from './gltf/init_attack_models.js'
import { Orb_3D } from './orb/Orb_3D.js'
import { Projectil_3D } from './models/Projectil_3D.js'
import { Spark_3D } from './spark/Spark_3D.js'
import { Thunder } from '../../../../common/entities/attacks/Thunder.js'
import { Thunder_3D } from './thunder/Thunder_3D.js'
import { Laser } from '../../../../common/entities/attacks/Laser.js'
import { Laser_3D } from './laser/Laser_3D.js'
import { Paw } from '../../../../common/entities/attacks/Paw.js'
import { Paw_3D } from './paw/Paw_3D.js'
import { Kitty } from '../../../../common/entities/attacks/Kitty.js'
import { Frisbee } from '../../../../common/entities/attacks/Frisbee.js'
import { Phone } from '../../../../common/entities/attacks/Phone.js'
import { Wheel } from '../../../../common/entities/attacks/Wheel.js'
import { Wheel_3D } from './wheel/Wheel_3D.js'
import { Wheel_Ult_3D } from './wheel/Wheel_Ult_3D.js'
import { Wheel_Ult } from '../../../../common/entities/attacks/Wheel_Ult.js'
import { Laser_Ult } from '../../../../common/entities/attacks/Laser_Ult.js'
import { Laser_Ult_3D } from './laser/Laser_Ult_3D.js'
import { WC_Ult_3D } from './WC_Ult_3D.js'
import { WC_Ult } from '../../../../common/entities/attacks/WC_Ult.js'
import { Orb_Ult } from '../../../../common/entities/attacks/Orb_Ult.js'
import { Orb_Ult_3D } from './orb/Orb_Ult_3D.js'
import { Thunder_Ult } from '../../../../common/entities/attacks/Thunder_Ult.js'
import { Thunder_Ult_3D } from './thunder/Thunder_Ult_3D.js'
import { Paw_Ult_3D } from './paw/Paw_Ult_3D.js'
import { Paw_Ult } from '../../../../common/entities/attacks/Paw_Ult.js'



let models = {}
const init = (loader) => Promise.all([
    init_attacks_3D(loader)
        .then((res) => {
            Thunder_3D.init(res)
            models = { ...models, ...res }
        }),
    Thunder_Ult_3D.init(loader),
    Spark_3D.init(),
    Orb_3D.init(loader), Orb_Ult_3D.init(loader),
    Laser_3D.init(), Laser_Ult_3D.init(),
    Paw_3D.init(), Paw_Ult_3D.init(),
    Wheel_3D.init(), Wheel_Ult_3D.init(),

])

const destroy = () => {
    models = {}
    Thunder_3D.destroy(); Thunder_Ult_3D.destroy()
    Spark_3D.destroy()
    Orb_3D.destroy(); Orb_Ult_3D.destroy()
    Laser_3D.destroy(); Laser_Ult_3D.destroy()
    Paw_3D.destroy(); Paw_Ult_3D.destroy()
    Wheel_3D.destroy(); Wheel_Ult_3D.destroy()
}

export class Attack_3D_Manager {
    static init = init
    static destroy = destroy

    constructor(
        scene,
        loop_manager,
        htmlelement_effect,
        scene_shaker,
    ) {
        Bee.on_create = (model) => {
            new Projectil_3D(scene, model, models['bee'].clone(), loop_manager)
        }
        Spark.on_create = (model) => {
            new Projectil_3D(scene, model, new Spark_3D(), loop_manager)
        }
        Orb.on_create = (model) => {
            new Projectil_3D(scene, model, new Orb_3D(model.color), loop_manager)
        }
        Thunder.on_create = (model) => {
            new Thunder_3D(scene, model, loop_manager)
        }
        Thunder_Ult.on_create = (model) => {
            new Thunder_Ult_3D(scene, model, loop_manager)
        }
        Laser.on_create = (model) => {
            new Laser_3D(scene, model, loop_manager)
        }
        Paw.on_create = (model) => {
            new Paw_3D(scene, model, loop_manager)
        }
        Paw_Ult.on_create = (model) => {
            new Paw_Ult_3D(scene, model, loop_manager)
        }
        Kitty.on_create = (model) => {
            new Projectil_3D(scene, model, models['cat'].clone(), loop_manager)
        }
        Frisbee.on_create = (model) => {
            new Projectil_3D(scene, model, models['frisbee'].clone(), loop_manager)
        }
        Phone.on_create = (model) => {
            new Projectil_3D(scene, model, models['phone'].clone(), loop_manager)
        }
        Wheel.on_create = (model) => {
            new Wheel_3D(scene, model, loop_manager)
        }
        Wheel_Ult.on_create = () => {
            new Wheel_Ult_3D(scene, loop_manager, htmlelement_effect, scene_shaker)
        }
        Laser_Ult.on_create = (model) => {
            new Laser_Ult_3D(scene, model, loop_manager, htmlelement_effect, scene_shaker)
        }
        WC_Ult.on_create = () => {
            new WC_Ult_3D(scene, models['wc'].clone(), models['phone'].clone(), loop_manager)
        }
        Orb_Ult.on_create = (model) => {
            new Orb_Ult_3D(scene, loop_manager, htmlelement_effect, scene_shaker, model.color)
        }
    }
}












