import { Cerbere } from '../../../../common/entities/enemies/bosses/Cerbere.js'
import { Mino } from '../../../../common/entities/enemies/bosses/Mino.js'
import { Titan } from '../../../../common/entities/enemies/bosses/Titan.js'
import { Bonhomme } from "../../../../common/entities/enemies/mobs/Bonhomme.js"
import { Champ } from "../../../../common/entities/enemies/mobs/Champ.js"
import { Sheep } from "../../../../common/entities/enemies/mobs/Sheep.js"
import { Slime } from "../../../../common/entities/enemies/mobs/Slime.js"
import { Yombi } from "../../../../common/entities/enemies/mobs/Yombi.js"
import { Boss_3D } from './bosses/Bosses_3D.js'
import { Enemy_3D } from "./Enemy_3D.js"
import { init_mobs_3D } from "./mobs/init_mobs_3D.js"





let instanced_meshes = {}
export class Enemy_3D_Manager {
    static init = async (loader) => {
        return Promise.all([
            init_mobs_3D(loader).then((res) => {
                instanced_meshes = { ...instanced_meshes, ...res }
            }),
            Boss_3D.init(loader)
        ])
    }

    static destroy = () => {
        instanced_meshes = {}
        Boss_3D.destroy()
    }

    constructor(
        scene,
        loop_manager,
    ) {
        for (const key in instanced_meshes) {
            scene.add(instanced_meshes[key])
        }

        const instances = {
            bonhomme: [],
            sheep: [],
            yombi: [],
            champ: [],
            slime: [],

            titan: [],
            mino: [],
            cerbere: [],
        }

        Bonhomme.on_create = (model) => {
            new Enemy_3D(model, instanced_meshes.bonhomme, instances.bonhomme, loop_manager)
        }
        Champ.on_create = (model) => {
            new Enemy_3D(model, instanced_meshes.champ, instances.champ, loop_manager)
        }
        Sheep.on_create = (model) => {
            new Enemy_3D(model, instanced_meshes.sheep, instances.sheep, loop_manager)
        }
        Slime.on_create = (model) => {
            new Enemy_3D(model, instanced_meshes.slime, instances.slime, loop_manager)
        }
        Yombi.on_create = (model) => {
            new Enemy_3D(model, instanced_meshes.yombi, instances.yombi, loop_manager)
        }

        Cerbere.on_create = (model) => {
            new Boss_3D(scene, model, Boss_3D.models.cerbere, loop_manager)
        }
        Titan.on_create = (model) => {
            new Boss_3D(scene, model, Boss_3D.models.titan, loop_manager)
        }
        Mino.on_create = (model) => {
            new Boss_3D(scene, model, Boss_3D.models.mino, loop_manager)
        }

    }

}

















