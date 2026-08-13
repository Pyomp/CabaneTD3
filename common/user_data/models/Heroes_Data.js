


import { Hero_Data } from './Hero_Data.js'

export class Heroes_Data {
    johan = new Hero_Data()
    nuraty = new Hero_Data()
    susiku = new Hero_Data()

    green = new Hero_Data()
    red = new Hero_Data()
    cyan = new Hero_Data()

    kitsune_water = new Hero_Data()
    kitsune_fire = new Hero_Data()
    kitsune_thunder = new Hero_Data()

    hama = new Hero_Data()
    robin = new Hero_Data()
    claudette = new Hero_Data()

    carna = new Hero_Data()
    flavo = new Hero_Data()

    mama = new Hero_Data()
    papa = new Hero_Data()

    employee = new Hero_Data()
    engineer = new Hero_Data()

    toArray() {
        return [
            this.johan.toArray(),
            this.nuraty.toArray(),
            this.susiku.toArray(),
            this.green.toArray(),
            this.red.toArray(),
            this.cyan.toArray(),
            this.kitsune_water.toArray(),
            this.kitsune_fire.toArray(),
            this.kitsune_thunder.toArray(),
            this.hama.toArray(),
            this.robin.toArray(),
            this.claudette.toArray(),
            this.carna.toArray(),
            this.flavo.toArray(),
            this.mama.toArray(),
            this.papa.toArray(),
            this.employee.toArray(),
            this.engineer.toArray(),
        ]
    }

    keys() {
        return [
            'johan',
            'nuraty',
            'susiku',
            'green',
            'red',
            'cyan',
            'kitsune_water',
            'kitsune_fire',
            'kitsune_thunder',
            'hama',
            'robin',
            'claudette',
            'carna',
            'flavo',
            'mama',
            'papa',
            'employee',
            'engineer',
        ]
    }

    *[Symbol.iterator]() {
        yield this.johan
        yield this.nuraty
        yield this.susiku
        yield this.green
        yield this.red
        yield this.cyan
        yield this.kitsune_water
        yield this.kitsune_fire
        yield this.kitsune_thunder
        yield this.hama
        yield this.robin
        yield this.claudette
        yield this.carna
        yield this.flavo
        yield this.mama
        yield this.papa
        yield this.employee
        yield this.engineer
    }

    fromArray(array) {
        if (array?.constructor !== Array) return
        let i = 0
        this.johan.fromArray(array[i++])
        this.nuraty.fromArray(array[i++])
        this.susiku.fromArray(array[i++])
        this.green.fromArray(array[i++])
        this.red.fromArray(array[i++])
        this.cyan.fromArray(array[i++])
        this.kitsune_water.fromArray(array[i++])
        this.kitsune_fire.fromArray(array[i++])
        this.kitsune_thunder.fromArray(array[i++])
        this.hama.fromArray(array[i++])
        this.robin.fromArray(array[i++])
        this.claudette.fromArray(array[i++])
        this.carna.fromArray(array[i++])
        this.flavo.fromArray(array[i++])
        this.mama.fromArray(array[i++])
        this.papa.fromArray(array[i++])
        this.employee.fromArray(array[i++])
        this.engineer.fromArray(array[i++])
    }
}





