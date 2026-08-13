import { Loop_Manager } from '../../../common/systems/Loop_Manager.js'
import { i18nH } from '../utils/i18n.js'
import { arrow2IMG } from '../utils/icons/icons.js'

export class Tuto_Focus_View {
    /**
     * 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        loop_manager
    ) {
        const background_div = document.createElement('div')

        const bg_style = background_div.style
        {
            bg_style.position = 'fixed'
            bg_style.top = '0'
            bg_style.left = '0'
            bg_style.width = '100%'
            bg_style.height = '100%'
            bg_style.background = 'rgba(0,0,0,0.5)'
            bg_style.zIndex = '888'
        }
        const arrow = arrow2IMG(100, 100)

        const arrow_s = arrow.style
        // s.background = 'black'
        // s.height = '10px'
        // s.width = '50px'
        arrow_s.position = 'absolute'
        arrow_s.left = '-20px'
        arrow_s.top = '-3px'
        arrow_s.transformOrigin = 'right center'

        let arrow_angle = 0
        let sin_arrow = 0
        let cos_arrow = 1
        const ARROW_PX_ANIMATION = -10
        let age = 0
        const arrow_update = (dt) => {
            age = (age + dt) % 2
            const dist = (age < 1 ? age : 2 - age) * ARROW_PX_ANIMATION
            arrow_s.transform = `translate(${sin_arrow * dist}px, ${cos_arrow * dist}px) rotate(${arrow_angle}rad)`
        }

        background_div.appendChild(arrow)

        let on_skip = () => { }
        const skip = document.createElement('div')
        {
            const s = skip.style
            s.padding = '5px'
            s.position = 'absolute'
            s.top = '0'
            s.left = '0'
            skip.addEventListener('click', () => {
                dispose()
                on_skip()
                on_skip = () => { }
            })
        }
        background_div.appendChild(skip)
        const skip_button = document.createElement('button')
        skip.appendChild(skip_button)
        {
            const s = skip_button.style
            s.background = 'hsl(190, 90%, 60%)'
            s.padding = '5px 10px'
            i18nH(skip_button, 'skip')
        }

        const dispose = () => {
            background_div.remove()
            loop_manager.frame_updates.delete(arrow_update)
        }

        /**
         * 
         * @param {Element} element_html 
         * @param {()=>{}} on_success 
         */
        this.tuto_view = (element_html, on_success, on_skip_p = () => { }) => {
            on_skip = on_skip_p
            document.body.appendChild(background_div)
            const placement = () => {

                const { width, height, top, right, bottom, left } = element_html.getBoundingClientRect()
                const max_width_height = Math.max(width, height)
                const center_x = (left + right) / 2
                const center_y = (bottom + top) / 2

                { // clip radial gradient
                    bg_style.background = `radial-gradient(ellipse ${width}px ${height}px at ${center_x}px ${center_y}px, `
                        + `rgba(0,0,0,0) ${max_width_height / 2}px, rgba(0,0,0,0.6) ${max_width_height / 2 + 10}px)`

                    const precision = 18
                    let c = [...Array(precision)].map((_, i) => {
                        const a = -i / (precision - 1) * Math.PI * 2
                        const x = Math.cos(a) * width / 2 + center_x
                        const y = Math.sin(a) * height / 2 + center_y
                        return `${x}px ${y}px`
                    })

                    bg_style.clipPath = `polygon(100% 0, 100% 100%, 0 100%, 0 0, 100% 0, ${c.join(',')})`
                }
                { // arrow placement
                    const x = (center_x < (innerWidth / 2) ? right : left)
                    const y = (center_y < (innerHeight / 2) ? bottom : top)
                    arrow.style.left = `${x - arrow.scrollWidth}px`
                    arrow.style.top = `${y - arrow.scrollHeight / 2}px`

                    const dist_x = center_x - x
                    const dist_y = center_y - y
                    arrow_angle = Math.atan2(dist_y, dist_x)
                    sin_arrow = Math.sin(arrow_angle)
                    cos_arrow = Math.cos(arrow_angle)
                    loop_manager.frame_updates.add(arrow_update)
                }
                { // skip placement
                    if (left < skip.offsetWidth
                        && top < skip.offsetHeight) {
                        skip.style.left = ''
                        skip.style.right = '0'
                    } else {
                        skip.style.right = ''
                        skip.style.left = '0'
                    }
                }
            }
            placement()
            addEventListener('resize', placement)

            background_div.onclick = (e) => {
                e.preventDefault()
                e.stopPropagation()
            }
            element_html.addEventListener('click', () => {
                dispose()
                on_success()
            }, { once: true })
        }
    }
}



