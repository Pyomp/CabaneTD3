





import { Stats_Manager } from '../../../common/systems/Stats_Manager.js'
import { Game_Data } from '../../../common/user_data/models/Game_Data.js'
import { OpacityAnimation } from '../utils/animations/opacityAnimation.js'
import { createHTMLElement } from '../utils/htmlElement.js'
import { STYLE } from '../utils/style/Style.js' 

export class Wave_View {
    /**
     * 
     * @param {Game_Data} game_data 
     * @param {Stats_Manager} stats_manager 
     */
    constructor(
        parent,
        game_data,
        stats_manager,
    ) {
        this.container = createHTMLElement('div', {
            marginTop: '5px',
        }, parent)

        const container_wave_nb = createHTMLElement('div', {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '5px',
            borderRadius: '10px',
            color: 'black',
            background: 'hsl(120, 100%, 70%)',
            width: 'fit-content',
            fontSize: '14px',
            height: 'fit-content',
        }, this.container)
        createHTMLElement('span', {}, container_wave_nb, 'wave')
        const wave_nb = createHTMLElement('span', {}, container_wave_nb)
        wave_nb.innerHTML = game_data.wave
        game_data.on_wave.add(() => {
            wave_nb.innerHTML = game_data.wave
        })

        const stats = createHTMLElement('div', {
            // position: 'relative',
            // top: '0px'
            padding: '5px',
            borderRadius: '10px',
            background: STYLE.var.colorBackground,
        })
        const dps = createHTMLElement('div', {}, stats)

        const wave_per_min = createHTMLElement('span', { marginRight: '5px' }, stats)
        createHTMLElement('span', {}, stats, 'wave_per_minute')

        const update_stats = () => {
            dps.innerHTML = stats_manager.dps.toFixed(1) + ' dps'
            wave_per_min.innerHTML = (stats_manager.session_wave_win_nb / (performance.now() / 60_000)).toFixed(1)
        }

        const { display, close } = OpacityAnimation(stats, this.container)

        let interval
        this.container.addEventListener('click', () => {
            if (stats.parentNode) {
                clearInterval(interval)
                close()
            } else {
                display()
                interval = setInterval(update_stats, 500)
            }
        })
    }
}






