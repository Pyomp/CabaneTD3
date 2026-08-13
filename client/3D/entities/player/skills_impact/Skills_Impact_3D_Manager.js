import { Player } from '../../../../../common/entities/Player.js'
import { Stars_3D } from './Stars_3D.js'
import { Wind_3D } from './Wind_3D.js'





export class Skills_Impact_3D_Manager {

    static init = (loader) => Promise.all([
        Stars_3D.init(loader),
        Wind_3D.init(loader),
    ])
    static destroy = () => {
        Stars_3D.destroy()
        Wind_3D.destroy()
    }

    /**
     * 
     * @param {Player} player 
     */
    constructor(
        player,
        scene,
        loop_manager,
    ) {
        const on_skill_impact = (pos) => {
            if (player.state === Player.LEFT) {
                new Stars_3D(scene, pos, loop_manager)
            } else if (player.state === Player.RIGHT) {
                new Stars_3D(scene, pos, loop_manager)
            } else if (player.state === Player.KNOCK) {
                new Wind_3D(scene, pos, loop_manager)
            }
        }

        player.addEventListener('skill_impact', on_skill_impact)
        this.dispose = () => {
            player.removeEventListener('skill_impact', on_skill_impact)
        }
    }
}













