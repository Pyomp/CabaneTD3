import { mergeObjectsRec } from '../../../utils/utils.js'

const fade = 0.2
export const MouthMorphs = ['a', 'e', 'i', 'o', 'u', 'smile']
export const EyesMorphs = ['blink', 'smile']

export const get_morph = (obj3D) => {

    const targets = []
    const dic = {}


    obj3D.traverse((child) => {
        if (child.morphTargetInfluences) {
            targets.push(child.morphTargetInfluences)
            mergeObjectsRec(dic, child.morphTargetDictionary)
        }
    })

    const res = {}
    for (const key in dic) {
        const morph_index = dic[key]
        Object.defineProperty(res, key, {
            get: () => { return targets[0][morph_index] },
            set: (a) => {
                for (const target of targets) {
                    target[morph_index] = a
                }
            }
        })
    }

    return res
}




export class Morph {
    constructor(obj3D, updates) {
        const target = []
        const dic = {}

        obj3D.traverse((child) => {
            if (child.morphTargetInfluences) {
                target.push(child.morphTargetInfluences)
                const names = child.userData.targetNames
                for (let i = 0; i < names.length; i++)
                    dic[names[i]] = i
            }
        })

        const deleteMouthUpdates = new Set()
        const deleteEyesUpdates = new Set()
        const play2 = (name, value, deleteUpdateSet) => {
            const morphIndex = dic[name]
            if (morphIndex === undefined) return

            const update = (dt) => {
                const dtfade = dt / fade
                if (target[0][morphIndex] < value) {
                    for (const t of target)
                        t[morphIndex] += dtfade
                    if (target[0][morphIndex] > value) {
                        for (const t of target)
                            t[morphIndex] = value
                        deleteUpdateSet.delete(deleteUpdate)
                        return true
                    }
                } else {
                    for (const t of target)
                        t[morphIndex] -= dtfade
                    if (target[0][morphIndex] < value) {
                        for (const t of target)
                            t[morphIndex] = value
                        deleteUpdateSet.delete(deleteUpdate)
                        return true
                    }
                }
            }

            updates.add(update)
            const deleteUpdate = () => { updates.delete(update) }
            deleteUpdateSet.add(deleteUpdate)
        }

        this.reset = () => {
            for (const f of deleteMouthUpdates) { f() }
            deleteMouthUpdates.clear()

            for (const f of deleteEyesUpdates) { f() }
            deleteEyesUpdates.clear()

            for (const mouthName of MouthMorphs)
                play2(mouthName, 0, deleteMouthUpdates)

            for (const nameF of EyesMorphs)
                play2(nameF, 0, deleteEyesUpdates)

        }

        this.play = (name, valueP = 0.9) => {
            if (!obj3D.parent) return
            let value

            if (typeof valueP === 'string') value = +valueP
            else if (typeof valueP === 'number') value = valueP
            else return

            if (MouthMorphs.includes(name)) {
                for (const f of deleteMouthUpdates) { f() }
                deleteMouthUpdates.clear()
                for (const mouthName of MouthMorphs) {
                    if (name !== mouthName) play2(mouthName, 0, deleteMouthUpdates)
                    else play2(mouthName, value, deleteMouthUpdates)
                }
            } else if (EyesMorphs.includes(name)) {
                for (const f of deleteEyesUpdates) { f() }
                deleteEyesUpdates.clear()
                for (const nameF of EyesMorphs) {
                    if (name !== nameF) play2(nameF, 0, deleteEyesUpdates)
                    else play2(nameF, value, deleteEyesUpdates)
                }
            } else {
                console.warn('morph unknown')
            }
        }
    }
}
