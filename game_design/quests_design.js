





class Quest_Base_Data {
    static states = { inProgress: 0, recolt: 1, done: 2, };
    constructor(title, desc, goal, reward, cb) {
        this.title = title
        this.desc = desc
        this.goal = goal
        this.reward = reward
        this.cb = cb
    }
}

export const quests_design = {
    daily: {
        wave: new Quest_Base_Data(
            'waves', 'win_10_waves', 10, 'bonus_boutique_damage_+30_waves', (bonus) => {
                bonus.damage += 30
            }),
        mp: new Quest_Base_Data(
            'MP', 'use_100_mp', 100, 'bonus_boutique_loot_+30_waves', (bonus) => {
                bonus.loot += 30
            }),
        rebirth: new Quest_Base_Data(
            'rebirth', 'rebirth_1_time', 1, 'bonus_boutique_gold_+30_waves', (bonus) => {
                bonus.gold += 30
            }),
        ducky: new Quest_Base_Data(
            'ducky', 'say_hello_to_ducky', 1, 'bonus_boutique_spawn_+30_waves', (bonus) => {
                bonus.spawn += 30
            }),
        ult: new Quest_Base_Data(
            'ult', 'perform_2_ultimates', 2, 'bonus_boutique_speed_+30_waves', (bonus) => {
                bonus.speed += 30
            }),
    },
    weekly: {
        wave: new Quest_Base_Data(
            'waves', 'win_10_000_waves', 10_000, 'bonus_boutique_speed_+300_waves', (bonus) => {
                bonus.speed += 300
            })
    }
}
