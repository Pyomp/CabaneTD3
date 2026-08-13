





import { EnemyBaseData } from './mobs_design.js'

export const bosses_design = {
    titan: new EnemyBaseData({
        id: 0,
        name: "titan",
        gold: 2,
        power: 2,
        hp: 5,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 2,
        boss: true,
        height: 5,
        radius: 2,
    }),
    mino: new EnemyBaseData({
        id: 1,
        name: "mino",
        gold: 2,
        power: 2,
        hp: 5,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 2,
        boss: true,
        height: 5,
        radius: 2,
    }),
    cerbere: new EnemyBaseData({
        id: 2,
        name: "cerbere",
        gold: 2,
        power: 2,
        hp: 5,
        attackSpeed: 1,
        moveSpeed: 1,
        range: 2,
        xp: 2,
        boss: true,
        height: 5,
        radius: 2,
    }),
}
