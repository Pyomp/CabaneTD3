












import {
    SKILL_JUMP,
    SKILL_KNOCK,
    SKILL_LEFT,
    SKILL_LENGTH,
    SKILL_RIGHT,
    SKILL_SLIDE,
    SKILL_ULTIMATE
} from './skills_design_data.js'

/** @type {[Skill_Design_View]} */
export const skills_design_view = new Array(SKILL_LENGTH)

class Skill_Design_View {
    constructor(id, name, desc) {
        this.name = name
        this.desc = desc
        skills_design_view[id] = this
    }
}

new Skill_Design_View(SKILL_JUMP, 'jump', 'jump_desc')
new Skill_Design_View(SKILL_KNOCK, 'knock', 'knock_desc')
new Skill_Design_View(SKILL_LEFT, 'left', 'left_desc')
new Skill_Design_View(SKILL_RIGHT, 'right', 'right_desc')
new Skill_Design_View(SKILL_SLIDE, 'slide', 'slide_desc')
new Skill_Design_View(SKILL_ULTIMATE, 'ult', 'ult_desc')





