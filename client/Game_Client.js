






import { Game } from '../common/Game.js'
import { Gui_3D } from './3D/Gui_3D.js'
import { Html } from './html/Html.js'
import { User_Data_Storage } from './management/User_Data_Storage.js'
import { Input_Manager } from './management/Input_Manager.js'
import { Keyboard_Manager } from './management/Keyboard_Manager.js'
import { Terrain_Basic } from './3D/entities/terrains/basic/Basic.js'
import { Item_Image } from './ressources/item_images/Item_Image.js'
import { Static_Init_Manager } from '../utils/Static_Init_Manager.js'
import { Tuto_System } from './html/tuto/Tuto_System.js'
import { MOBILE } from './html/utils/browser_info.js'
import { Lv_Up_View } from './html/events/Lv_Up_View.js'
import { Pad_Manager } from './management/Pad_Manager.js'

let item_image
const { init, destroy } = new Static_Init_Manager(
    (loader_manager) => {
        item_image = new Item_Image()
        return Promise.all([
            Gui_3D.init(loader_manager, item_image),
            Html.init(item_image),
        ])
    },
    () => {
        item_image = undefined
        Gui_3D.destroy()
        Html.destroy()
    }
)

export class Game_Client {
    static init = init
    static destroy = destroy

    constructor() {

        const game = new Game()

        const gui_3D = new Gui_3D(
            document.body,
            game,
        )

        const input_manager = new Input_Manager(
            gui_3D.three_context.canvas,
            game.user_data.keyCode
        )

        const html = new Html(
            gui_3D.three_context,
            game,
            gui_3D.third_controls,
            gui_3D.htmlelement_effect,
            gui_3D.scene_shaker,
            input_manager,
            game.player,
            game.ultimate_system,
        )

        const terrain_3D = new Terrain_Basic(
            gui_3D.three_context.scene,
            game.loop_manager,
            gui_3D.third_controls,
            html.upgrade_view,
            game.user_data.heroes_used,
            game.quest_system,
        )

        if (MOBILE === true) {
            new Pad_Manager(
                game.event_state_manager,
                gui_3D.third_controls,
            )
        } else {
            new Keyboard_Manager(
                game.event_state_manager,
                game.event_action_manager,
                input_manager,
                game.user_data.keyCode,
                game.loop_manager,
                gui_3D.third_controls,
            )
        }

        const app_storage = new User_Data_Storage(game.user_data)

        new Lv_Up_View(
            game.user_data.game,
            html.heroes_image,
        )

        new Tuto_System(
            game.loop_manager,
            game.user_data.game,
        )
    }
}













