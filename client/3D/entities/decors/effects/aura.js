import { USER } from '../index.js'
import { cbH } from '../../../utils/utils.js'
import { THR } from '../3Dinit.js'

import { HEROES, allies } from "../heroes/allies_manager.js"
import { DoubleSide, MeshLambertMaterial, TextureLoader } from '../../3D/modules/three.module.js'

import auraSprite from "../assets/textures/png/auraSprite.png"
import { TextureAnimator } from "../models/TextureAnimator.js"
import { UPDATE } from "../manager.js"


export const auras = []
export const init_aura = () => {
    for (let i = 0; i < 12; i++) {
        auras.push({
            obj3D: THR.getGltfObj("aura", true)[0],
            update: () => { }
        })

        //position
        auras[i].obj3D.position.x = THR.topo.school.prof[i].x
        auras[i].obj3D.position.y = THR.topo.school.prof[i].y
        auras[i].obj3D.position.z = THR.topo.school.prof[i].z

        auras[i].obj3D.visible = false
        THR.scene.add(auras[i].obj3D)
    }
    new TextureLoader().load(auraSprite, (texture) => {
        for (let i = 0; i < 12; i++) {
            // texture
            auras[i].obj3D.material = new MeshLambertMaterial(
                {
                    transparent: true, map: texture.clone(), side: DoubleSide,
                    depthWrite: false, reflectivity: 0, refractionRatio: 0,
                }); auras[i].obj3D.material.map.needsUpdate = true
            auras[i].textureAnimator = new TextureAnimator(auras[i].obj3D.material.map, 8, 8, 64, 1 / 30)
            auras[i].update = () => {
                if (auras[i].obj3D.visible) {
                    auras[i].textureAnimator.update()
                }
            }
        }
        updateAlliesPlacement(USER.heroesUsed)
    })
}

export function updateAlliesPlacement(heroesUsed) {
    cbH(USER.heroesUsedCb)
    for (let i = 0; i < 12; i++) {
        auras[i].obj3D.visible = false
        UPDATE.delete(auras[i].update)
    };
    for (let i = 0; i < allies.container.length; i++) {
        if (allies.container[i].obj3D.parent) { allies.container[i].obj3D.parent.remove(allies.container[i].obj3D) }
    } allies.container.length = 0

    // TEAM_BONUS.update(heroesUsed)

    for (let i = 0; i < heroesUsed.length; i++) {
        if (heroesUsed[i] != 0) { // 0 = EMPTY.id
            let entity = HEROES.tab[heroesUsed[i]]
            allies.container.push(entity)
            entity.reset()
            THR.sceneOutline.add(entity.obj3D)

            if (USER.heroes[HEROES.tab[heroesUsed[i]].baseData.id].evo === 1) {
                auras[i].obj3D.visible = true
                UPDATE.add(auras[i].update)
                auras[i].obj3D.material.emissive.set(0x44ff44)
            } else if (USER.heroes[HEROES.tab[heroesUsed[i]].baseData.id].evo === 2) {
                auras[i].obj3D.visible = true
                UPDATE.add(auras[i].update)
                auras[i].obj3D.material.emissive.set(0x44ffff)
            } else if (USER.heroes[HEROES.tab[heroesUsed[i]].baseData.id].evo === 3) {
                auras[i].obj3D.visible = true
                UPDATE.add(auras[i].update)
                auras[i].obj3D.material.emissive.set(0xee44ee)
            } else if (USER.heroes[HEROES.tab[heroesUsed[i]].baseData.id].evo === 4) {
                auras[i].obj3D.visible = true
                UPDATE.add(auras[i].update)
                auras[i].obj3D.material.emissive.set(0xffff44)
            } else if (USER.heroes[HEROES.tab[heroesUsed[i]].baseData.id].evo === 5) {
                auras[i].obj3D.visible = true
                UPDATE.add(auras[i].update)
                auras[i].obj3D.material.emissive.set(0xff3333)
            }
            entity.obj3D.rotation.y = Math.PI
            entity.obj3D.position.x = THR.topo.school.prof[i].x
            entity.obj3D.position.y = THR.topo.school.prof[i].y + 0.01
            entity.obj3D.position.z = THR.topo.school.prof[i].z
        }
    }
}