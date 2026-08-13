
import { ANIMATION_IDLE, animation_id_from_name } from '../../../game_design/animations_design.js'
import { Number_isInteger } from '../../../utils/utils.js'
import { AnimationClip, AnimationMixer, LoopOnce, LoopPingPong, LoopRepeat, Vector3 } from '../modules/three.module.js'
import { THR } from '../Three_Context.js'

/**
 * @param {AnimationMixer} mixer 
 * @param {Array.<AnimationClip>} animations 
 * @returns {Object.<number, AnimationClip>}
 */

export const init_actions = (mixer, animations) => {
    if (animations.length === 0) return () => { }

    const name = mixer.getRoot().name.toLowerCase()
    const name_length = name.length

    const actions = {}
    for (const anime of animations) {
        if (anime.name.substring(0, name_length).toLowerCase() !== name) continue
        anime.optimize()
        const clip = mixer.clipAction(anime)

        const split = anime.name.split('_')
        const loop_str = split[split.length - 1]
        const loop_three_const = loop_str === 'repeat' ? LoopRepeat : loop_str === 'pingpong' ? LoopPingPong : LoopOnce

        const action_name = anime.name.slice(name_length, loop_three_const === LoopOnce ? undefined : -loop_str.length - 1).toLowerCase()

        const action_id = animation_id_from_name[action_name]
        if (Number_isInteger(action_id) === false) continue

        actions[action_id] = clip
        clip.loop = loop_three_const
        if (clip.loop === LoopOnce) clip.clampWhenFinished = true
    }
    return actions
}

export class Action {
    constructor(mixer, animations) {
        const actions = init_actions(mixer, animations)
        let current = ANIMATION_IDLE
        let state = ANIMATION_IDLE
        actions[ANIMATION_IDLE].reset().play()
        let is_emote_playing = false

        const emoteCb = () => {
            actions[current].fadeOut(0.2)
            current = state

            actions[state]
                .reset()
                .fadeIn(0.2)
                .play()
            is_emote_playing = false
        }

        let action_resolve = () => { }

        const s_array = []
        const cb_anime_time = []
        this.add_time_listener = (anime_id, cb, s) => {
            if (cb_anime_time[anime_id] === undefined) {
                cb_anime_time[anime_id] = []
                s_array[anime_id] = []
            }
            if (s_array[anime_id] === undefined) console.log('yep')

            let i = 0
            while (s > s_array[anime_id][i]
                && i < cb_anime_time[anime_id].length)
                i++

            s_array[anime_id] = [...s_array[anime_id].slice(0, i), s, ...s_array[anime_id].slice(i)]
            cb_anime_time[anime_id] = [...cb_anime_time[anime_id].slice(0, i), cb, ...cb_anime_time[anime_id].slice(i)]
        }

        for (const [action_id, action] of Object.entries(actions)) {
            if (action.loop === LoopOnce) {
                this.add_time_listener(action_id, emoteCb, action._clip.duration)
            }
        }

        let on_time_index = 0
        const on_time = []
        const s_time = []
        let current_action = {}
        const update = () => {
            while (s_time[on_time_index] <= current_action.time) {
                on_time[on_time_index]()
                on_time_index++
                if (on_time_index === s_time.length) return true
            }
        }

        this.anim = (anime, fade = 0.2) => {
            if (anime === state) return
            if (actions[anime] === undefined) {
                console.warn(`model doesn't have action "${anime}"`)
                return
            }


            if (s_array[anime] !== undefined) {
                on_time_index = 0
                current_action = actions[anime]
                on_time.length = 0
                on_time.push(...cb_anime_time[anime]) // perf test vs let on_time = [...a] ~2 times quickly
                s_time.length = 0
                s_time.push(...s_array[anime])
                THR.updates.add(update)
            }

            if (actions[anime].loop !== LoopOnce) { // if state
                if (is_emote_playing === false) {
                    actions[current].fadeOut(fade)
                    current = anime

                    actions[anime]
                        .reset()
                        .fadeIn(fade)
                        .play()
                }
                state = anime
            } else {
                is_emote_playing = true
                actions[current].fadeOut(fade)
                current_action
                    .reset()
                    .fadeIn(fade)
                    .play()

                current = anime
            }
        }
    }
}


