


import { Game } from '../../common/Game.js'
import { Static_Init_Manager } from '../../utils/Static_Init_Manager.js'
import { HTMLElement_Effect } from '../html/utils/HTMLElement_Effect.js'
import { Header_3D } from './components/Header_3D.js'
import { Attack_3D_Manager } from './entities/attacks/Attack_3D_Manager.js'
import { Decors_3D_Manager } from './entities/decors/Decors_3D_Manager.js'
import { Enemy_3D_Manager } from './entities/enemy/Enemy_3D_Manager.js'
import { Ent_3D } from './entities/Ent_3D.js'
import { Hero_3D_Manager } from './entities/heroes/Hero_3D_Manager.js'
import { Student_3D_Manager } from './entities/heroes/student/Student_3D_Manager.js'
import { Items_3D_Manager } from './entities/items/Items_3D_Manager.js'
import { Puwu } from './entities/player/puwu/Puwu.js'
import { Skills_Impact_3D_Manager } from './entities/player/skills_impact/Skills_Impact_3D_Manager.js'
import { Third_Controls } from './entities/player/Third_Controls.js'
import { Weapon_3D } from './entities/player/weapons/weapons.js'
import { Terrain_Basic } from './entities/terrains/basic/Basic.js'
import { Three_Context } from './Three_Context.js'
import { Scene_Shaker } from './utils/Scene_Shaker.js'

const { init, destroy } = new Static_Init_Manager(
    (loader_manager, item_image) => Promise.all([
        Terrain_Basic.init(loader_manager),
        Puwu.init(loader_manager),
        Hero_3D_Manager.init(loader_manager),
        Student_3D_Manager.init(loader_manager),
        Enemy_3D_Manager.init(loader_manager),
        Attack_3D_Manager.init(loader_manager),
        Decors_3D_Manager.init(loader_manager),
        Items_3D_Manager.init(loader_manager, item_image),
        Weapon_3D.init(loader_manager),
        Skills_Impact_3D_Manager.init(loader_manager),
    ]),
    () => {
        Terrain_Basic.destroy()
        Puwu.destroy()
        Hero_3D_Manager.destroy()
        Student_3D_Manager.destroy()
        Enemy_3D_Manager.destroy()
        Attack_3D_Manager.destroy()
        Decors_3D_Manager.destroy()
        Items_3D_Manager.destroy()
        Weapon_3D.destroy()
        Skills_Impact_3D_Manager.destroy()
    }
)

export class Gui_3D {
    static init = init
    static destroy = destroy

    /**
     * 
     * @param {HTMLElement} parent 
     * @param {Game} game 
     */
    constructor(
        parent,
        game,
    ) {
        this.three_context = new Three_Context(parent)
        this.three_context.update = game.loop_manager.update

        this.htmlelement_effect = new HTMLElement_Effect(this.three_context.canvas)

        this.scene_shaker = new Scene_Shaker(
            this.three_context.scene,
            game.loop_manager,
        )

        Header_3D.init(this.three_context.scene)

        this.third_controls = new Third_Controls(
            this.three_context.camera,
            this.three_context.canvas,
            this.three_context.on_before_render
        )

        const puwu = new Puwu()
        puwu.set_weapon(Weapon_3D.models.baseball_bat)
        this.third_controls.set_cam_target(puwu.mesh.position)

        const player_3D = new Ent_3D(
            this.three_context.scene,
            game.player,
            game.loop_manager,
            puwu.mesh,
            puwu.animations
        )

        new Hero_3D_Manager(this.three_context.scene, game.loop_manager,)
        new Student_3D_Manager(this.three_context.scene, game.loop_manager)
        new Enemy_3D_Manager(this.three_context.scene, game.loop_manager)
        new Attack_3D_Manager(
            this.three_context.scene,
            game.loop_manager,
            this.htmlelement_effect,
            this.scene_shaker,
        )
        new Items_3D_Manager(
            this.three_context.scene,
            game.loot_system,
            game.loop_manager,
            this.third_controls
        )
        new Decors_3D_Manager(
            this.three_context.scene,
            game.loop_manager,
            this.third_controls,
            game.game_state
        )
        new Skills_Impact_3D_Manager(
            game.player,
            this.three_context.scene,
            game.loop_manager,
        )
    }
}











