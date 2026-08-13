





import { Vector3 } from '../../../client/3D/modules/three.module.js'
import { cbH } from '../../../utils/utils.js'

export class Entity_Abstract {
    static on_create = null

    position = new Vector3()
    velocity = new Vector3()

    on_state = new Set()
    #state = 'idle'
    get state() { return this.#state }
    set state(a) {
        this.#state = a
        cbH(this.on_state)
    }
}

