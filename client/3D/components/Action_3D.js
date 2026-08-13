

import {
    AnimationClip,
    AnimationMixer,
    LoopOnce,
    LoopPingPong,
    LoopRepeat,
} from '../modules/three.module.js'

export class Action_3D {

    /**
     * @param {AnimationMixer} mixer 
     * @param {Array.<AnimationClip>} animations 
     */
    constructor(mixer, animations) {
        const name = mixer.getRoot().name.toLowerCase()
        const name_length = name.length

        for (const anime of animations) {
            if (anime.name.substring(0, name_length).toLowerCase() !== name) continue
            anime.optimize()
            const clip = mixer.clipAction(anime)

            const split = anime.name.split('_')
            const loop_str = split[split.length - 1]
            const loop_three_const = loop_str === 'repeat' ? LoopRepeat : loop_str === 'pingpong' ? LoopPingPong : LoopOnce

            const action_name = anime.name.slice(name_length, loop_three_const === LoopOnce ? undefined : -loop_str.length - 1).toLowerCase()
            clip.clampWhenFinished = true
            this[action_name] = clip
            clip.loop = loop_three_const
        }
    }
}





