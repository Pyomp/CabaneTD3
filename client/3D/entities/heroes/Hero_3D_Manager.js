



import { Carna } from '../../../../common/entities/heroes/Carna.js'
import { Claudette } from '../../../../common/entities/heroes/Claudette.js'
import { Cyan } from '../../../../common/entities/heroes/Cyan.js'
import { Employee } from '../../../../common/entities/heroes/Employee.js'
import { Engineer } from '../../../../common/entities/heroes/Engineer.js'
import { Flavo } from '../../../../common/entities/heroes/Flavo.js'
import { Green } from '../../../../common/entities/heroes/Green.js'
import { Hama } from '../../../../common/entities/heroes/Hama.js'
import { Johan } from '../../../../common/entities/heroes/Johan.js'
import { Kitsune_Fire } from '../../../../common/entities/heroes/Kitsune_Fire.js'
import { Kitsune_Thunder } from '../../../../common/entities/heroes/Kitsune_Thunder.js'
import { Kitsune_Water } from '../../../../common/entities/heroes/Kitsune_Water.js'
import { Mama } from '../../../../common/entities/heroes/Mama.js'
import { Nuraty } from '../../../../common/entities/heroes/Nuraty.js'
import { Papa } from '../../../../common/entities/heroes/Papa.js'
import { Red } from '../../../../common/entities/heroes/Red.js'
import { Robin } from '../../../../common/entities/heroes/Robin.js'
import { Susiku } from '../../../../common/entities/heroes/Susiku.js'
import { Loop_Manager } from '../../../../common/systems/Loop_Manager.js'
import { Scene } from '../../modules/three.module.js'
import { init_animals_3D } from './animals/init_animals_3D.js'
import { init_cactus_3D } from './cactus/init_cactus_3D.js'
import { init_employee_3D } from './employee/init_employee_3D.js'
import { Engineer_3D } from './engineer/Engineer_3D.js'
import { init_engineer_3D } from './engineer/init_engineer_3D.js'
import { Hero_3D } from './Hero_3D.js'
import { init_kitsunes_3D } from './kitsune/init_kitsune_3D.js'
import { init_magicians_3D } from './magician/init_magician_3D.js'
import { init_plant_3D } from './plant/init_plant_3D.js'
import { init_witch_3D } from './witch/init_witch_3D.js'

/** @type {Object.<string, [Mesh, AnimationMixer, Action_3D]>} */
let models = {}

const init = async (loader) => {
    return Promise.all([
        init_animals_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_cactus_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_employee_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_engineer_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_kitsunes_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_magicians_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_plant_3D(loader).then((a) => { models = { ...models, ...a } }),
        init_witch_3D(loader).then((a) => { models = { ...models, ...a } }),
    ])
}

const destroy = () => {
    models = {}
}

export class Hero_3D_Manager {
    static init = init
    static destroy = destroy


    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        loop_manager,
    ) {

        Johan.on_create = (model) => {
            new Hero_3D(scene, model, ...models['johan'], loop_manager)
        }
        Nuraty.on_create = (model) => {
            new Hero_3D(scene, model, ...models['nuraty'], loop_manager)
        }
        Susiku.on_create = (model) => {
            new Hero_3D(scene, model, ...models['susiku'], loop_manager)
        }

        Green.on_create = (model) => {
            new Hero_3D(scene, model, ...models['green'], loop_manager)
        }
        Red.on_create = (model) => {
            new Hero_3D(scene, model, ...models['red'], loop_manager)
        }
        Cyan.on_create = (model) => {
            new Hero_3D(scene, model, ...models['cyan'], loop_manager)
        }

        Kitsune_Water.on_create = (model) => {
            new Hero_3D(scene, model, ...models['kitsune_water'], loop_manager)
        }
        Kitsune_Fire.on_create = (model) => {
            new Hero_3D(scene, model, ...models['kitsune_fire'], loop_manager)
        }
        Kitsune_Thunder.on_create = (model) => {
            new Hero_3D(scene, model, ...models['kitsune_thunder'], loop_manager)
        }

        Hama.on_create = (model) => {
            new Hero_3D(scene, model, ...models['hama'], loop_manager)
        }
        Robin.on_create = (model) => {
            new Hero_3D(scene, model, ...models['robin'], loop_manager)
        }
        Claudette.on_create = (model) => {
            new Hero_3D(scene, model, ...models['claudette'], loop_manager)
        }

        Carna.on_create = (model) => {
            new Hero_3D(scene, model, ...models['carna'], loop_manager)
        }
        Flavo.on_create = (model) => {
            new Hero_3D(scene, model, ...models['flavo'], loop_manager)
        }

        Mama.on_create = (model) => {
            new Hero_3D(scene, model, ...models['mama'], loop_manager)
        }
        Papa.on_create = (model) => {
            new Hero_3D(scene, model, ...models['papa'], loop_manager)
        }

        Employee.on_create = (model) => {
            new Hero_3D(scene, model, ...models['employee'], loop_manager)
        }
        Engineer.on_create = (model) => {
            new Engineer_3D(scene, model, models['engineer'], loop_manager)
        }

    }
}










