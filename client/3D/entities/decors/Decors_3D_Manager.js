import { Ki_Ball } from '../../../../common/entities/decors/Ki_Ball.js'
import { Mp_Ball } from '../../../../common/entities/decors/Mp_Ball.js'
import { Game_State } from '../../../../common/State.js'
import { Loop_Manager } from '../../../../common/systems/Loop_Manager.js'
import { Static_Init_Manager } from '../../../../utils/Static_Init_Manager.js'
import { Scene } from '../../modules/three.module.js'
import { Third_Controls } from '../player/Third_Controls.js'
import { Ball_3D } from './balls/Ball_3D.js'
import { Firework_3D } from './particles/Firework_3D.js'
import { Smoke_3D } from './particles/Smoke_3D.js'


const { init, destroy } = new Static_Init_Manager(
    (loader) => {
        Smoke_3D.init(loader)
        return Promise.all([
            Ball_3D.init(loader),
        ])
    },
    () => {
        Smoke_3D.destroy()
        Ball_3D.destroy()
    }
)

export class Decors_3D_Manager {
    static init = init
    static destroy = destroy

    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     * @param {Third_Controls} third_controls 
     * @param {Game_State} game_state 
     */
    constructor(
        scene,
        loop_manager,
        third_controls,
        game_state,
    ) {
        Ki_Ball.on_create = (model) => {
            new Ball_3D(scene, model, loop_manager, third_controls, 'ki')
        }
        Mp_Ball.on_create = (model) => {
            new Ball_3D(scene, model, loop_manager, third_controls, 'mp')
        }

        const on_game_state_change = () => {
            if (game_state.value === Game_State.WIN) {
                for (let i = 0; i < 4; i++) {
                    new Firework_3D(scene, loop_manager)
                }
            } else if (game_state.value === Game_State.GAME_OVER) {
                new Smoke_3D(scene, undefined, 3, loop_manager)
            }
        }
        game_state.on_change.add(on_game_state_change)

        this.dispose = () => {
            game_state.on_change.delete(on_game_state_change)
        }

    }
}












