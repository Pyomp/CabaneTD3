

import { Game_State } from '../../../common/State.js'
import { Stats_Manager } from '../../../common/systems/Stats_Manager.js'
import { Wallet_Data } from '../../../common/user_data/models/Wallet_Data.js'
import { Heroes_Image } from '../../ressources/heroes_image/Heroes_Image.js'
import { createHTMLElement } from '../utils/htmlElement.js'
import { i18nH } from '../utils/i18n.js'
import { goldIMG } from '../utils/icons/icons.js'
import { STYLE } from '../utils/style/Style.js'


export class Wave_Win_Lose_View {

    /**
     * 
     * @param {Heroes_Image} heroes_image 
     * @param {Wallet_Data} wallet_data
     * @param {Game_State} game_state
     * @param {Stats_Manager} stats_manager
     */
    constructor(
        heroes_image,
        wallet_data,
        game_state,
        stats_manager,
    ) {
        const TILE_SIZE = 80
        const IMG_SIZE = 0.6 * TILE_SIZE

        const avatar = {}
        for (const key in heroes_image) {
            const url = heroes_image[key]
            avatar[key] = createHTMLElement('img', {
                width: `${TILE_SIZE}px`,
                height: `${TILE_SIZE}px`,
            }, undefined, '', {
                src: url
            })
        }

        const container = createHTMLElement('div', {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column',
            transition: 'all .8s cubic-bezier(.1,1.6,.7, 1)',
            position: 'fixed',
            gap: '5px',
            top: '50%',
            left: '50%',
            background: STYLE.var.colorBackground,
            borderRadius: '5px',
            padding: '5px',
            transformOrigin: 'top left',
            transform: 'scale(0) translate(-50%, -50%)',
        })

        const container_style = container.style

        const title_span = createHTMLElement('span', {}, container)

        const gain_container = createHTMLElement('div', { display: 'flex', alignItems: 'center' }, container)
        createHTMLElement('span', {}, gain_container, 'gain')
        const gain_gold_span = createHTMLElement('span', { margin: '0 5px' }, gain_container)
        gain_container.appendChild(goldIMG(16, 16))

        const mvp_container = createHTMLElement('div', { display: 'flex', alignItems: 'center' }, container)
        createHTMLElement('span', {}, mvp_container, 'MVP')
        const tile_div = createHTMLElement('div', { display: 'flex' }, mvp_container)

        let wave_gold = 0
        let last_gold = wallet_data.gold
        const on_gold = () => {
            if (game_state.value !== Game_State.WAVE) return
            const dif = wallet_data.gold - last_gold
            if (dif > 0) wave_gold += dif
            last_gold = wallet_data.gold
        }
        wallet_data.on_gold.add(on_gold)

        const on_game_state_change = () => {
            if (game_state.value === Game_State.WIN) {
                display_wave_win_lose_view(true, wave_gold, stats_manager.get_mvp())
            } else if (game_state.value === Game_State.GAME_OVER) {
                display_wave_win_lose_view(false, wave_gold, stats_manager.get_mvp())
            }
            wave_gold = 0
        }
        game_state.on_change.add(on_game_state_change)

        const display_wave_win_lose_view = (win = true, gain = 0, mvp_name = 'student') => {
            i18nH(title_span, win === true ? 'victory' : 'defeat')
            gain_gold_span.innerHTML = gain
            tile_div.innerHTML = ''
            tile_div.appendChild(avatar[mvp_name])

            document.body.appendChild(container)
            container_style.transition = 'transform .8s cubic-bezier(.32,1.71,.55,1)'

            requestAnimationFrame(() => {
                container_style.transform = 'scale(1) translate(-50%, -50%)'
            })
            setTimeout(() => {
                container_style.transition = 'transform .8s cubic-bezier(.45,-0.47,1,.53)'
                requestAnimationFrame(() => {
                    container_style.transform = 'scale(0) translate(-50%, -50%)'
                    container.addEventListener('transitionend', () => {
                        container.remove()
                    }, { once: true })
                })
            }, 2000)
        }
    }
}

