import { heroes_design } from '../../game_design/entities/heroes_design.js'
import { topo_basic } from '../../game_design/topo.js'
import { Carna } from '../entities/heroes/Carna.js'
import { Claudette } from '../entities/heroes/Claudette.js'
import { Cyan } from '../entities/heroes/Cyan.js'
import { Employee } from '../entities/heroes/Employee.js'
import { Engineer } from '../entities/heroes/Engineer.js'
import { Flavo } from '../entities/heroes/Flavo.js'
import { Green } from '../entities/heroes/Green.js'
import { Hama } from '../entities/heroes/Hama.js'
import { Johan } from '../entities/heroes/Johan.js'
import { Kitsune_Fire } from '../entities/heroes/Kitsune_Fire.js'
import { Kitsune_Thunder } from '../entities/heroes/Kitsune_Thunder.js'
import { Kitsune_Water } from '../entities/heroes/Kitsune_Water.js'
import { Mama } from '../entities/heroes/Mama.js'
import { Nuraty } from '../entities/heroes/Nuraty.js'
import { Papa } from '../entities/heroes/Papa.js'
import { Red } from '../entities/heroes/Red.js'
import { Robin } from '../entities/heroes/Robin.js'
import { Susiku } from '../entities/heroes/Susiku.js'
import { User_Data } from '../user_data/User_Data.js'
import { Enemy_Manager } from './Enemy_Manager.js'
import { Loop_Manager } from './Loop_Manager.js'
import { Team_Bonus_Manager } from './Team_Bonus_Manager.js'


const class_dispatcher = {
    [heroes_design.johan.id]: Johan,
    [heroes_design.nuraty.id]: Nuraty,
    [heroes_design.susiku.id]: Susiku,
    [heroes_design.green.id]: Green,
    [heroes_design.red.id]: Red,
    [heroes_design.cyan.id]: Cyan,
    [heroes_design.kitsune_water.id]: Kitsune_Water,
    [heroes_design.kitsune_fire.id]: Kitsune_Fire,
    [heroes_design.kitsune_thunder.id]: Kitsune_Thunder,
    [heroes_design.hama.id]: Hama,
    [heroes_design.robin.id]: Robin,
    [heroes_design.claudette.id]: Claudette,
    [heroes_design.carna.id]: Carna,
    [heroes_design.flavo.id]: Flavo,
    [heroes_design.mama.id]: Mama,
    [heroes_design.papa.id]: Papa,
    [heroes_design.employee.id]: Employee,
    [heroes_design.engineer.id]: Engineer,
}


export class Heroes_Placement_Manager {

    /**
     * 
     * @param {User_Data} user_data 
     * @param {Loop_Manager} loop_manager 
     * @param {Enemy_Manager} enemy_manager 
     * @param {Team_Bonus_Manager} team_bonus_manager 
     */
    constructor(
        user_data,
        loop_manager,
        damage_system,
        enemy_manager,
        team_bonus_manager,
        game_state,
        wave_system,
        plant_bonus_manager,
    ) {
        const user_heroes_used = user_data.heroes_used

        this.heroes_used = []

        const update = () => {
            for (let i = 0; i < this.heroes_used.length; i++) {
                this.heroes_used[i].dispose()
            }
            this.heroes_used.length = 0

            for (let pos_id = 0; pos_id < user_heroes_used.array.length; pos_id++) {
                const hero_id = user_heroes_used[pos_id]

                if (hero_id !== -1) {

                    if (hero_id === heroes_design.employee.id) {
                        this.heroes_used.push(new class_dispatcher[hero_id](
                            topo_basic.cabane.heroes[pos_id],
                            loop_manager,
                            damage_system,
                            user_data,
                            enemy_manager,
                            game_state,
                            wave_system,
                        ))
                    } else if (hero_id === heroes_design.carna.id || hero_id === heroes_design.flavo.id) {
                        this.heroes_used.push(new class_dispatcher[hero_id](
                            topo_basic.cabane.heroes[pos_id],
                            loop_manager,
                            damage_system,
                            user_data,
                            enemy_manager,
                            game_state,
                            plant_bonus_manager,
                        ))
                    } else {
                        this.heroes_used.push(new class_dispatcher[hero_id](
                            topo_basic.cabane.heroes[pos_id],
                            loop_manager,
                            damage_system,
                            user_data,
                            enemy_manager,
                            game_state,
                            team_bonus_manager,
                        ))
                    }
                }
            }
        }

        user_heroes_used.on_change.add(update)
    }
}







