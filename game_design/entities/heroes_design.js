


import { EVO, EvoBaseData } from '../evo_design.js'
import { Model_Data } from './Model_Data_design.js'

class HeroBaseData {
    constructor(
        id,
        name,
        attack_speed = 2, // delta in second
        power = 1,
        team_name = 0,
        evolutions,

        model_height = 2,
        model_radius = 1,
    ) {
        this.id = id
        this.name = name
        this.attack_speed = attack_speed
        this.power = 1
        this.team_name = 0

        /** @type {[EvoBaseData]}*/
        this.evolutions = evolutions
        this.model_data = new Model_Data(model_height, model_radius)
    }
}

export const student_design = new HeroBaseData(0, 'student', 1, 0,
    [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
    2,// height
    1,// radius
)

/** @type {Object.<string,HeroBaseData>} */
export const heroes_design = {
    johan: new HeroBaseData(0, 'johan', 2, 1, 'magician',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    nuraty: new HeroBaseData(1, 'nuraty', 2, 1, 'magician',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    susiku: new HeroBaseData(2, 'susiku', 2, 1, 'magician',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    // witches
    green: new HeroBaseData(3, 'green', 2, 1, 'witch',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    red: new HeroBaseData(4, 'red', 2, 1, 'witch',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    cyan: new HeroBaseData(5, 'cyan', 2, 1, 'witch',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    // Kitsunes
    kitsune_water: new HeroBaseData(6, 'kitsune_water', 2, 1, 'kitsune',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    kitsune_fire: new HeroBaseData(7, 'kitsune_fire', 2, 1, 'kitsune',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    kitsune_thunder: new HeroBaseData(8, 'kitsune_thunder', 2, 1, 'kitsune',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    // animals
    hama: new HeroBaseData(9, 'hama', 2, 1, 'animal',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    robin: new HeroBaseData(10, 'robin', 2, 1, 'animal',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    claudette: new HeroBaseData(11, 'claudette', 2, 1, 'animal',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    // plants
    carna: new HeroBaseData(12, 'carna', 2, 1, 'plant',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    flavo: new HeroBaseData(13, 'flavo', 2, 1, 'plant',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    // cactus
    mama: new HeroBaseData(14, 'mama', 2, 1, 'cactus',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    papa: new HeroBaseData(15, 'papa', 2, 1, 'cactus',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    // worker
    employee: new HeroBaseData(16, 'employee', 2, 1, 'worker',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
    engineer: new HeroBaseData(17, 'engineer', 2, 1, 'worker',
        [EVO.gold1, EVO.ruby1, EVO.ki2, EVO.invincibility2, EVO.gold3],
        2,// height
        1,// radius
    ),
}