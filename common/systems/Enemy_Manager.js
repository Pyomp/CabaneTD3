





import {
    TARGET_MODE_HIGHEST_HP,
    TARGET_MODE_LOWEST_HP,
    TARGET_MODE_NEAREST,
    TARGET_MODE_RANDOM,
    TARGET_MODE_STRONGEST
} from '../constants.js'

import { cbH } from '../../utils/utils.js'
import { Enemy_Abstract } from '../entities/enemies/models/Enemy_Abstract.js'

class Target {

    /** @param {Set<Enemy_Abstract>} instances */
    constructor(instances) {
        this.all = instances

        this[TARGET_MODE_HIGHEST_HP] = () => {
            let target
            let hp = 0
            for (const enemy of instances) {
                if (hp < enemy.hp) {
                    hp = enemy.hp
                    target = enemy
                }
            }
            return target
        }

        this[TARGET_MODE_LOWEST_HP] = () => {
            let target
            let hp = Infinity
            for (const enemy of instances) {
                if (hp > enemy.hp) {
                    hp = enemy.hp
                    target = enemy
                }
            }
            return target
        }

        this[TARGET_MODE_NEAREST] = () => {
            let target
            let dist = -Infinity
            for (const enemy of instances) {
                if (dist < enemy.position.z) {
                    dist = enemy.position.z
                    target = enemy
                }
            }
            return target
        }

        this[TARGET_MODE_RANDOM] = () => {
            const array = Array.from(instances)
            const rand = Math.floor(Math.random() * array.length)
            return array[rand]
        }

        this[TARGET_MODE_STRONGEST] = () => {
            let target
            let hp = 0
            for (const enemy of instances) {
                if (hp < enemy.hp) {
                    hp = enemy.hp
                    target = enemy
                }
            }
            return target
        }
    }
}

export class Enemy_Manager {
    on_occurrence = new Set()
    #occurrence = 0
    get occurrence() { return this.#occurrence }

    constructor(condition_system) {

        this.add = (enemy) => {
            condition_system.add(enemy)
            this.instances.add(enemy)
            this.#occurrence++
            cbH(this.on_occurrence)
        }
        this.delete = (enemy) => {
            condition_system.delete(enemy)
            this.instances.delete(enemy)
            this.#occurrence--
            cbH(this.on_occurrence)
        }

    }

    /** @type {Set<Enemy_Abstract>} */
    instances = new Set()


    target = new Target(this.instances)
}










