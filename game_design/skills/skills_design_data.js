

export const SKILL_JUMP = 0
export const SKILL_KNOCK = 1
export const SKILL_LEFT = 2
export const SKILL_RIGHT = 3
export const SKILL_SLIDE = 4
export const SKILL_ULTIMATE = 5
export const SKILL_LENGTH = 6

/** @type {[Skill_Design_Data]} */
export const skills_design_data = new Array(SKILL_LENGTH)

class Skill_Design_Data {
    constructor(id, p) {
        this.mp = p.mp ?? 0
        this.qi = p.qi ?? 0
        this.power = p.power ?? 1
        skills_design_data[id] = this
    }
}
new Skill_Design_Data(SKILL_JUMP, {})
new Skill_Design_Data(SKILL_KNOCK, {
    mp: 5,
    power: 2,
})
new Skill_Design_Data(SKILL_LEFT, {
    mp: 2,
    power: 1,
})
new Skill_Design_Data(SKILL_RIGHT, {
    mp: 2,
    power: 1,
})
new Skill_Design_Data(SKILL_SLIDE, {})
new Skill_Design_Data(SKILL_ULTIMATE, { qi: 10 })
















