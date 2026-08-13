import { Player } from '../entities/Player.js'










export class Event_Action_Manager {
    /**
     * 
     * @param {Player} player 
     */
    constructor(
        player
    ) {
        this.jump = () => { player.jump() }
        this.left = () => { player.left() }
        this.right = () => { player.right() }
        this.knock = () => { player.knock() }
        this.slide = () => { player.slide() }
    }
}







