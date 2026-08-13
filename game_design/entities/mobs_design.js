






import { Model_Data } from './Model_Data_design.js'

export const AVERAGE_ENEMY_POWER = 10
export const AVERAGE_ENEMY_ATTACK_SPEED = 2
export const AVERAGE_ENEMY_MOVE_SPEED = 2
export const AVERAGE_ENEMY_HP = 2
export const AVERAGE_ENEMY_GOLD = 1
export const AVERAGE_ENEMY_RANGE = 3
export const AVERAGE_ENEMY_XP = 1

export class EnemyBaseData {
    constructor(p = {
        id: 0,
        name: "bonhomme",
        gold: 1,
        power: 1,
        hp: 2,
        attackSpeed: 1,
        moveSpeed: 2,
        range: 2,
        xp: 1,
        height: 1,
        radius: 1,
    }) {
        this.id = p.id || 0
        this.name = p.name || "unknown"
        this.gold = p.gold || AVERAGE_ENEMY_GOLD
        this.power = p.power || AVERAGE_ENEMY_POWER
        this.hp = p.hp || AVERAGE_ENEMY_HP
        this.attackSpeed = p.attackSpeed || AVERAGE_ENEMY_ATTACK_SPEED
        this.moveSpeed = p.moveSpeed || AVERAGE_ENEMY_MOVE_SPEED // unit / second
        this.range = p.range || AVERAGE_ENEMY_RANGE
        this.xp = p.xp || AVERAGE_ENEMY_XP
        this.boss = p.boss || false
        this.model_data = new Model_Data(p.height || 2, p.radius || 1)
    }
}


export const mobs_design = {
    bonhomme: new EnemyBaseData({
        id: 0,
        name: "bonhomme",
        gold: 1,
        power: 1,
        hp: 2,
        attackSpeed: 1,
        moveSpeed: 2,
        range: 2,
        xp: 1,
        height: 1,
        radius: 1,
    }),
    yombi: new EnemyBaseData({
        id: 1,
        name: "yombi",
        gold: 1,
        power: 1,
        hp: 2,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 1,
        height: 1,
        radius: 1,
    }),
    slime: new EnemyBaseData({
        id: 2,
        name: "slime",
        gold: 1,
        power: 1,
        hp: 2,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 1,
        height: 1,
        radius: 1,
    }),
    champ: new EnemyBaseData({
        id: 3,
        name: "champ",
        gold: 1,
        power: 1,
        hp: 2,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 1,
        height: 1,
        radius: 1,
    }),
    sheep: new EnemyBaseData({
        id: 4,
        name: "sheep",
        gold: 1,
        power: 1,
        hp: 2,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 1,
        height: 1,
        radius: 1,
    })
}

