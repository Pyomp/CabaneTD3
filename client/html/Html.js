





import { Game } from '../../common/Game.js'
import { isDev } from '../../env.js'
import { Third_Controls } from '../3D/entities/player/Third_Controls.js'
import { Three_Context } from '../3D/Three_Context.js'
import { Info_Player_View } from './hud/Info_Player_View.js'
import { Repeat_Speed_Button_View } from './hud/Repeat_Speed_Button_View.js'
import { Wallet_View } from './hud/Wallet_View.js'
import { Wave_Button } from './hud/Wave_Button.js'
import { Wave_View } from './hud/Wave_View.js'
import { Canvas_Picture_In_Picture } from './models/Canvas_Picture_In_Picture.js'
import { Hint_Info_View } from './models/Hint_Info_View.js'
import { Lv_Progress_View_Effect } from './models/Lv_Progress_View_Effect.js'
import { Heroes_Image } from '../ressources/heroes_image/Heroes_Image.js'
import { Skills_View } from './skills/Skills_View.js'
import { createHTMLElement, setStyle } from './utils/htmlElement.js'
import { Home_View } from './windows/home/Home_View.js'
import { Inventory_View } from './windows/inventory/Inventory_View.js'
import { Modo_View } from './windows/modo/Modo_View.js'
import { Quest_View } from './windows/quest/Quest_View.js'
import { Settings_View } from './windows/settings/Settings_View.js'
import { Stats_View } from './windows/stats/Stats_View.js'
import { Upgrade_View } from './windows/upgrade/Upgrade_View.js'
import { Static_Init_Manager } from '../../utils/Static_Init_Manager.js'
import { Skill_Image } from '../ressources/skill_image/Skill_Image.js'
import { Wave_Win_Lose_View } from './events/Wave_Win_Lose_View.js'
import { Wave_Bar_View } from './events/Wave_Bar_View.js'

let skill_image, item_image
const { init, destroy } = new Static_Init_Manager(
    (item_image_p) => {
        item_image = item_image_p
        skill_image = new Skill_Image()
        Upgrade_View.init(item_image_p)
        Inventory_View.init(item_image_p)
    },
    () => {
        skill_image = undefined
        Upgrade_View.destroy()
        Inventory_View.destroy()
    }
)

export class Html {
    static init = init
    static destroy = destroy

    /**
     * 
     * @param {Three_Context} three_context
     * @param {Game} game
     * @param {Third_Controls} third_controls
     */
    constructor(
        three_context,
        game,

        third_controls,
        htmlelement_effect,
        scene_shaker,

        input_manager,
    ) {
        const icon_style = {
            height: '30px',
            width: '30px',
            padding: '5px',
        }

        const lv_progress_view_effect = new Lv_Progress_View_Effect(game.user_data.game)

        this.heroes_image = new Heroes_Image()
        new Wave_Win_Lose_View(
            this.heroes_image,
            game.user_data.wallet,
            game.game_state,
            game.stats_manager
        )

        new Wave_Bar_View(
            document.body,
            game.user_data.game,
            game.game_state,
            game.loop_manager,
        )

        //////// LEFT ////////////
        const info_player_view = new Info_Player_View(game.user_data.game)

        const header_container_left = createHTMLElement('div', {
            position: 'fixed', top: '2px', left: '2px',
            width: '150px'
        }, document.body)

        header_container_left.appendChild(info_player_view.lv_view)
        header_container_left.appendChild(info_player_view.hp_view)
        header_container_left.appendChild(info_player_view.mp_view)
        header_container_left.appendChild(info_player_view.ki_view)

        const buttons_container = createHTMLElement('div', {
            display: 'flex',
            flexWrap: 'wrap',
            width: '150px',
        }, header_container_left)

        const home_view = new Home_View(
            this.heroes_image,
            item_image,
            skill_image,
        )
        setStyle(home_view.icon, icon_style)
        buttons_container.appendChild(home_view.icon)

        const canvas_picture_in_picture = new Canvas_Picture_In_Picture(three_context.canvas)
        const settings_view = new Settings_View(
            canvas_picture_in_picture,
            game,
            three_context,

            third_controls,
            htmlelement_effect,
            scene_shaker,

            input_manager
        )
        setStyle(settings_view.icon, icon_style)
        buttons_container.appendChild(settings_view.icon)

        const inventory_view = new Inventory_View(game.user_data.game.bag, game.upgrade_system)
        setStyle(inventory_view.icon, icon_style)
        buttons_container.appendChild(inventory_view.icon)

        const quest_view = new Quest_View(game.user_data.quest, game.quest_system)
        setStyle(quest_view.icon, icon_style)
        buttons_container.appendChild(quest_view.icon)

        this.upgrade_view = new Upgrade_View(
            game.user_data,
            game.upgrade_system,
            game.rebirth_system,
            game.bonus_system,
            this.heroes_image,
            lv_progress_view_effect,
            game.evo_bonus_manager,
        )
        setStyle(this.upgrade_view.icon, icon_style)
        buttons_container.appendChild(this.upgrade_view.icon)

        const wave_button = new Wave_Button(
            buttons_container,
            icon_style,
            game.game_state,
            game.wave_system,
        )
        wave_button.container.id = 'tuto_1_5'

        const stats_view = new Stats_View(
            game.stats_manager,
            game.user_data.heroes,
            this.heroes_image,
        )
        setStyle(stats_view.icon, icon_style)
        buttons_container.appendChild(stats_view.icon)

        if (isDev === true) {
            const modo_view = new Modo_View(game.user_data)
            buttons_container.appendChild(modo_view.icon)
        }

        // //////// RIGHT ////////
        const header_container_right = createHTMLElement('div', {
            position: 'fixed', top: '2px', right: '2px',
            display: 'flex', height: '20px',
        }, document.body)

        new Wave_View(
            header_container_right,
            game.user_data.game,
            game.stats_manager,
        )

        const wallet_container = createHTMLElement('div', {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
        }, header_container_right)

        const hint_info_view = new Hint_Info_View()

        new Wallet_View(
            wallet_container,
            game.user_data.wallet,
        )

        new Repeat_Speed_Button_View(
            wallet_container,
            icon_style,
            game.user_data.game,
            game.game_settings_system,
            lv_progress_view_effect,
        )

        // wallet_container.appendChild(popup_button_view)

        new Skills_View(
            document.body,
            game.player,
            game.ultimate_system,
            input_manager,
            skill_image,
            hint_info_view,
        )

    }
}










