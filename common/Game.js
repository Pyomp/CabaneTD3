










import { Player } from './entities/Player.js'
import { Loop_Manager } from './systems/Loop_Manager.js'
import { Enemy_Manager } from './systems/Enemy_Manager.js'
import { Event_Action_Manager } from './systems/Event_Action_Manager.js'
import { Event_State_Manager } from './systems/Event_State_Manager.js'
import { Evo_Bonus_Manager } from './systems/Evo_Bonus_Managers.js'
import { Heroes_Placement_Manager } from './systems/Heroes_Placement_Manager.js'
import { Max_Hp_Manager } from './systems/Max_Hp_Manager.js'
import { Plant_Bonus_Manager } from './systems/Plant_Bonus_Manager.js'
import { Team_Bonus_Manager } from './systems/Team_Bonus_Manager.js'
import { Physics } from './Physics.js'
import { Game_State } from './State.js'
import { User_Data } from './user_data/User_Data.js'
import { Stats_Manager } from './systems/Stats_Manager.js'
import { Ball_System } from './systems/Ball_System.js'
import { Ultimate_System } from './systems/Ultimate_System.js'
import { Game_Settings_System } from './systems/Game_Settings_System.js'
import { Bonus_System } from './systems/Bonus_System.js'
import { Student_System } from './systems/Student_System.js'
import { Upgrade_System } from './systems/Upgrade_System.js'
import { Wave_System } from './systems/Wave_System.js'
import { Rebirth_System } from './systems/Rebirth_System.js'
import { Quest_System } from './systems/Quest_System.js'
import { Loot_System } from './systems/Loot_System.js'
import { array_get_random } from '../utils/utils.js'
import { Ult_Automation_System } from './systems/Ult_Automation_System.js'
import { Damage_System } from './systems/Damage_System.js'
import { Conditions_System } from './systems/Conditions_System.js'
import { Effect_System } from './systems/Effects_System.js'


export class Game {
    constructor() {
        this.user_data = new User_Data()
        this.game_state = new Game_State()

        const plant_bonus_manager = new Plant_Bonus_Manager()


        this.event_state_manager = new Event_State_Manager()
        this.plant_bonus_manager = new Plant_Bonus_Manager()
        this.evo_bonus_manager = new Evo_Bonus_Manager(this.user_data.heroes)
        this.team_bonus_manager = new Team_Bonus_Manager(this.user_data.heroes_used)
        const max_hp_manager = new Max_Hp_Manager(this.user_data)

        this.loop_manager = new Loop_Manager(
            this.user_data,
            this.evo_bonus_manager,
            plant_bonus_manager,
            this.team_bonus_manager,
            this.game_state
        )

        const condition_system = new Conditions_System(
            this.loop_manager.updates_physics
        )

        const effect_system = new Effect_System(
            condition_system
        )

        const enemy_manager = new Enemy_Manager(
            condition_system
        )

        this.loot_system = new Loot_System(
            this.user_data.game.bag,
            this.loop_manager,
        )

        this.stats_manager = new Stats_Manager(
            this.user_data.heroes,
            this.game_state,
            this.loop_manager,
        )

        const physics = new Physics(this.loop_manager)

        this.rebirth_system = new Rebirth_System(
            this.user_data,
            this.evo_bonus_manager,
        )

        this.wave_system = new Wave_System(
            enemy_manager,
            this.game_state,
            this.user_data,
            this.evo_bonus_manager,
            this.loop_manager,
            max_hp_manager,
            physics,
            this.loot_system,
        )


        const damage_system = new Damage_System(
            this.user_data.bonus,
            this.stats_manager,
            effect_system,
            enemy_manager,
        )

        const heroes_placement_manager = new Heroes_Placement_Manager(
            this.user_data,
            this.loop_manager,
            damage_system,
            enemy_manager,
            this.team_bonus_manager,
            this.game_state,
            this.wave_system,
            plant_bonus_manager,
        )

        this.upgrade_system = new Upgrade_System(
            this.user_data,
        )

        this.student_system = new Student_System(
            this.user_data,
            this.loop_manager,
            this.stats_manager,
            this.game_state,
            enemy_manager,
        )

        this.bonus_system = new Bonus_System(
            this.user_data
        )

        this.game_settings_system = new Game_Settings_System(this.user_data.game)

        this.ultimate_system = new Ultimate_System(
            this.user_data.game,
            heroes_placement_manager,
            this.team_bonus_manager,
            this.loop_manager,
        )

        this.ball_system = new Ball_System(
            this.user_data.game,
            this.loop_manager,
        )

        this.quest_system = new Quest_System(
            this.user_data,
            this.rebirth_system,
            this.ultimate_system,
            this.loop_manager
        )

        this.player = new Player(
            this.loop_manager,
            physics,
            this.user_data.game,
            enemy_manager,
            this.event_state_manager,
        )

        this.event_action_manager = new Event_Action_Manager(
            this.player,
        )

        new Ult_Automation_System(
            this.team_bonus_manager,
            this.loop_manager,
            this.ball_system,
            this.ultimate_system
        )
    }
}









