import { Sprite } from '../../../modules/three.module.js'
import { init_spark_3D } from './init_spark_3D.js'



let mats
const init = () => {
    mats = init_spark_3D()
}

export class Spark_3D extends Sprite {
    static init = init
    static destroy = () => { mats = undefined }

    constructor(color = "red") {
        super(mats[color])
    }
}
