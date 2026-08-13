



export class EvoBaseData {
    constructor(str, p) {
        this.str = str
        this.gold = p.gold || 0
        this.ruby = p.ruby || 0
        this.speed = p.speed || 0
        this.ki = p.ki || 0
        this.wave_jump = p.wave_jump || 0
        this.invincibility = p.invincibility || 0
    }
}

export const EVO = {
    gold1: new EvoBaseData("Gold +10%", { gold: 0.1 }),
    gold2: new EvoBaseData("Gold +20%", { gold: 0.2 }),
    gold3: new EvoBaseData("Gold +30%", { gold: 0.3 }),

    ruby1: new EvoBaseData("Ruby +10%", { ruby: 0.1 }),//3
    ruby2: new EvoBaseData("Ruby +20%", { ruby: 0.2 }),
    ruby3: new EvoBaseData("Ruby +30%", { ruby: 0.3 }),

    speed1: new EvoBaseData("Game Speed +1%", { speed: 0.01 }),//6
    speed2: new EvoBaseData("Game Speed +2%", { speed: 0.02 }),
    speed3: new EvoBaseData("Game Speed +3%", { speed: 0.03 }),

    ki1: new EvoBaseData("Double Ki chance +10%", { ki: 0.1 }),//9
    ki2: new EvoBaseData("Double Ki chance +20%", { ki: 0.2 }),
    ki3: new EvoBaseData("Double Ki chance +30%", { ki: 0.3 }),

    jump1: new EvoBaseData("Wave Jump chance +0.5%", { wave_jump: 0.005 }),//12
    jump2: new EvoBaseData("Wave Jump chance +1%", { wave_jump: 0.01 }),
    jump3: new EvoBaseData("Wave Jump chance +1.5%", { wave_jump: 0.015 }),

    invincibility1: new EvoBaseData("Invincibility +1s", { invincibility: 1 }),//15
    invincibility2: new EvoBaseData("Invincibility +2s", { invincibility: 2 }),
    invincibility3: new EvoBaseData("Invincibility +3s", { invincibility: 3 }),
}