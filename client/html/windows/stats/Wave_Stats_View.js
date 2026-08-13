






import { Stats_Manager } from '../../../../common/systems/Stats_Manager.js'
import { Heroes_Data } from '../../../../common/user_data/models/Heroes_Data.js'
import { createHTMLElement } from '../../utils/htmlElement.js' 
import { pretty_print_number } from '../../utils/pretty_print_number.js' 
import { Heroes_Image } from '../../../ressources/heroes_image/Heroes_Image.js'
import { Stats_Line_View } from './Stats_Line_View.js'

export class Wave_Stats_View {

    /**
     * @param {Stats_Manager} stats_system 
     * @param {Heroes_Data} heroes_data 
     */
    constructor(
        stats_system,
        heroes_data,
       /** @type {Heroes_Image} */ heroes_image,
    ) {
        this.container = createHTMLElement('div', {})

        const hero_views = {}
        {
            for (const key in heroes_data) {

                const view = new Stats_Line_View(heroes_image[key])
                hero_views[key] = view
                const update_view = () => {
                    const damage = stats_system.heroes_damage[key]
                    view.damage.innerHTML = pretty_print_number(damage)
                    view.percent.innerHTML = `${(damage / stats_system.total_damage * 100).toFixed(1)}%`
                }
                update_view()
                stats_system.on_change.add(update_view)
            }
        }

        const students = new Stats_Line_View(heroes_image.student)
        {
            const update_view = () => {
                const damage = stats_system.students_damage
                students.damage.innerHTML = pretty_print_number(damage)
                students.percent.innerHTML = `${(damage / stats_system.total_damage * 100).toFixed(1)}%`
            }
            update_view()
            stats_system.on_change.add(update_view)
        }
        const no_data_view = createHTMLElement('div', {
            padding: '5px',
            width: '250px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '200px',
        }, undefined, 'no_data')

        const sort = () => {
            this.container.innerHTML = ''

            const heroes_stats = Object.entries(stats_system.heroes_damage)
                .filter(obj => obj[1] > 0)
                .sort((a, b) => b[1] - a[1])

            const student_damage = stats_system.students_damage
            const students_container = students.container

            for (const [hero_name, damage] of heroes_stats) {
                if (student_damage > 0
                    && !students_container.offsetParent
                    && damage < student_damage) {
                    this.container.appendChild(students_container)
                }
                this.container.appendChild(hero_views[hero_name].container)
            }

            if (student_damage > 0 && !students_container.offsetParent) {
                this.container.appendChild(students_container)
            }
            if (heroes_stats.length === 0 && !students_container.offsetParent) {
                this.container.appendChild(no_data_view)
            }
        }
        sort()
        stats_system.on_change.add(sort)

    }
}














