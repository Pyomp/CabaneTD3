



export class Impact_Single { }
export class Impact_AOE {
    constructor(range) {
        this.range = range
    }
}
export class Impact_Bounce {
    constructor(
        range,
        decrease_factor,
        max_nb_bounce
    ) {
        this.range = range
        this.decrease_factor = decrease_factor
        this.max_nb_bounce = max_nb_bounce
    }
}

class Attack_Design {
    static PROJECTIL = 0
    static GUIDED_PROJECTIL = 1
    static INSTANT = 2

    constructor(
        type = Attack_Design.GUIDED_PROJECTIL,
        impact = new Impact_Single(),
    ) {
        this.type = type
        this.impact = impact
    }
}

export const attacks_design = {
    orb: new Attack_Design(
        Attack_Design.GUIDED_PROJECTIL,
        new Impact_Single()
    ),
    laser: new Attack_Design(
        Attack_Design.INSTANT,
        new Impact_Single()
    ),
    thunder: new Attack_Design(
        Attack_Design.INSTANT,
        new Impact_Single()
    ),
    telephone: new Attack_Design(
        Attack_Design.GUIDED_PROJECTIL,
        new Impact_Single()
    ),
    frisbee: new Attack_Design(
        Attack_Design.GUIDED_PROJECTIL,
        new Impact_Single()
    ),
    paw: new Attack_Design(
        Attack_Design.GUIDED_PROJECTIL,
        new Impact_Single()
    ),
    plasma: new Attack_Design(
        Attack_Design.GUIDED_PROJECTIL,
        new Impact_Single()
    ),
    wheel: new Attack_Design(
        Attack_Design.GUIDED_PROJECTIL,
        new Impact_Single()
    ),

}







