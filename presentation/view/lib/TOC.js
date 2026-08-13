



import { createHTMLElement } from '../../utils/htmlElement.js'
import { Smooth_Scroll } from '../../utils/Smooth_Scroll.js'
import { STYLE } from '../../utils/style/Style.js'

class Point {
    constructor(
        point_size, bar_width,
        parent,
        name,
        smooth_scroll,
        section,
    ) {
        this.name = name
        this.section = section
        this.point = createHTMLElement('button', {
            position: 'absolute',
            transform: `translate(-${((point_size + 30) - bar_width) / 2}px, -${point_size / 2}px)`,
            width: `${point_size}px`,
            height: `${point_size}px`,
            borderRadius: '50%',
            '--padding-button': '15px',
            background: `radial-gradient(rgba(0,0,0,0) 55%, orange 60%)`
        }, parent)

        this.disable = () => {
            this.point.style.background =
                `radial-gradient(rgba(0,0,0,0) 55%, orange 60%)`
        }

        this.enable = () => {
            this.point.style.background =
                `radial-gradient(orange 30%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, orange 60%)`
        }

        const name_div = createHTMLElement('div', {
            position: 'absolute',
            right: 'calc(100% + 10px)',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '5px',
            color: 'orange',
            // textDecoration: 'underline',
            cursor: 'pointer',
            borderRadius: '5px',
            background: STYLE.var.colorBackground,
        }, undefined, name)

        const on_name_click = () => {
            smooth_scroll.target = section.offsetTop
        }
        this.point.addEventListener('click', on_name_click)

        this.display_name = () => {
            this.point.appendChild(name_div)
        }
        this.close_name = () => {
            name_div.remove()
        }
    }
}


export class TOC {

    constructor(
        parent,
        loop_manager,
    ) {
        const bar_width = 0

        this.container = createHTMLElement('nav', {
            position: 'absolute',
            right: '15px',
            top: '50%',
            padding: '30px',
            boxSizing: 'content-box',
            transform: `translateY(-50%)`,
            height: '500px',
            maxHeight: '90%',
            userSelect: 'none',
        })

        const points = []

        const update_position = () => {
            const l = points.length
            if (l < 2) return

            for (let i = 0; i < l; i++) {
                const point_style = points[i].point.style
                point_style.top = `${10 + (i / (l - 1)) * 80}%`
            }
        }

        const point_size = 20

        const smooth_scroll = new Smooth_Scroll(loop_manager.updates, parent)

        this.add = (name, container) => {

            points.push(new Point(
                point_size, bar_width,
                this.container,
                name,
                smooth_scroll,
                container,
            ))

            update_position()

        }

        const on_scroll = () => {
            let point_to_display
            const middle = innerHeight / 2
            for (const p of points) {
                p.disable()
                const { top } = p.section.getBoundingClientRect()
                if (top < middle) {
                    point_to_display = p
                }
            }
            point_to_display?.enable()
        }

        const on_resize = (e) => {
            if (innerWidth < 600) {
                if (this.container.parentNode) {
                    this.container.remove()
                    parent.removeEventListener('scroll', on_scroll)
                }
            } else {
                if (!this.container.parentNode) {
                    parent.addEventListener('scroll', on_scroll)
                    parent.appendChild(this.container)
                }
                on_scroll()
            }
        }
        on_resize()

        addEventListener('resize', on_resize)

        const on_enter = () => {
            for (const p of points) p.display_name()
        }
        this.container.addEventListener('pointerenter', on_enter)

        const on_leave = () => {
            for (const p of points) p.close_name()
        }
        this.container.addEventListener('pointerleave', on_leave)

    }
}













