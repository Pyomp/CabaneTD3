


import {
    AmbientLight,
    Color,
    DirectionalLight,
    DoubleSide,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    NearestFilter,
    OctahedronGeometry,
    PlaneGeometry,
    RepeatWrapping,
    Scene,
    Texture,
} from '../../../modules/three.module.js'
// import { _heroes_used } from "../../../appData/_heroes_used.js"
// import { hero_view_scroll } from "../../../html/windows/upgrade/alliesUpgrades/Heroes_Upgrade.js.js"
// import { upgrade_window } from "../../../html/windows/upgrade/Upgrade_View.js"
import { Third_Controls } from "../../player/Third_Controls.js"
import { Milky_Way_Background } from './MilkyWay/Milky_Way.js'
import {  Coin_Coin_3D } from './Coin_Coin_3D.js'
import { Flowers_3D } from './Flowers_3D.js'
import { topo_basic } from "../../../../../game_design/topo.js"
import { Loader_Manager } from '../../../modules/Loader_Manager.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Quest_Data } from '../../../../../common/user_data/models/Quest_Data.js'
import { Heroes_Used_Data } from '../../../../../common/user_data/models/Heroes_Used_Data.js'
import { Quest_System } from '../../../../../common/systems/Quest_System.js'



let tex_base, tex_path, tex_grass, tex_tree
let group_field = new Group()
let coin_mesh
let stem_mesh, blossom_mesh

/**
 * 
 * @param {Loader_Manager} loader_manager 
 */
const init_terrain = async (loader_manager) => {
    tex_base = loader_manager.texture_load(new URL('./svg/basic.svg', import.meta.url).href)
    tex_base.flipY = false
    tex_base.magFilter = tex_base.minFilter = NearestFilter
    const material_base = new MeshLambertMaterial({ map: tex_base })

    tex_path = loader_manager.texture_load(new URL('./svg/path.svg', import.meta.url).href)
    tex_path.repeat.set(1, 5)
    tex_path.wrapS = tex_path.wrapT = RepeatWrapping

    tex_grass = loader_manager.texture_load(new URL('./svg/grass.svg', import.meta.url).href)
    tex_grass.repeat.set(5, 5)
    tex_grass.wrapS = tex_grass.wrapT = RepeatWrapping

    tex_tree = loader_manager.texture_load(new URL('./svg/tree.svg', import.meta.url).href)

    const gltf = await loader_manager.gltf_load_async(new URL('./basic.glb', import.meta.url).href)
    gltf.scene.children.forEach((child) => {
        if (child.name === 'field') {
            child.children.forEach((c) => {
                if (c.name === 'field_1') {
                    c.material.dispose()
                    c.material = material_base
                } else if (c.name === 'field_2') {
                    c.material.dispose()
                    c.material = new MeshLambertMaterial({ map: tex_path })
                } else if (c.name === 'field_3') {
                    c.material.dispose()
                    c.material = new MeshLambertMaterial({ map: tex_grass })
                } else if (c.name === 'field_4') {
                    c.material.dispose()
                    c.material = new MeshLambertMaterial({
                        map: tex_tree, vertexColors: true,
                        side: DoubleSide, alphaTest: .7,
                    })
                }
            })
            group_field.add(child)
            child.matrixAutoUpdate = false
        }
    })

    coin_mesh = gltf.scene.getObjectByName('coin')
    coin_mesh.material.dispose()
    coin_mesh.material = material_base

    stem_mesh = gltf.scene.getObjectByName('Stem')
    blossom_mesh = gltf.scene.getObjectByName('Blossom')
}

export class Terrain_Basic {
    static init = (loader_manager) => Promise.all([
        init_terrain(loader_manager),
        Milky_Way_Background.init(loader_manager),
    ])
    static destroy = () => {
        tex_base = undefined
        tex_path = undefined
        tex_grass = undefined
        tex_tree = undefined
        group_field.clear()
        coin_mesh = undefined
        stem_mesh = undefined
        blossom_mesh = undefined
    }

    /**
     * 
     * @param {Scene} scene 
     * @param {Third_Controls} third_controls 
     */
    constructor(
        scene,
        /** @type {Loop_Manager} */  loop_manager,
        /** @type {Third_Controls} */  third_controls,
        upgrade_view,
        /** @type {Heroes_Used_Data} */ heroes_used,
        /** @type {Quest_System} */ quest_system,
    ) {
        const ambient_light = new AmbientLight(0xffffff, 0.7)
        scene.add(ambient_light)

        const directional_light = new DirectionalLight(0xffffff, .8)
        directional_light.position.set(-15, 20, -30)
        scene.add(directional_light)

        // Lamp x6
        const geoLamp1 = new OctahedronGeometry(0.2)
        const geoLamp2 = new OctahedronGeometry(0.4)
        const LAMP_POST = [{//1
            h: 0, s: 1, l: 0.75,
            x: -4.6, y: 2.9, z: 10.1
        }, {//2
            h: 0.2, s: 1, l: 0.65,
            x: -4.6, y: 2.9, z: 3.7
        }, {//3
            h: 0.4, s: 1, l: 0.65,
            x: -4.6, y: 2.9, z: -3.4
        }, {//4
            h: 0.5, s: 1, l: 0.65,
            x: 4.9, y: 2.9, z: -3.4
        }, {//5
            h: 0.6, s: 1, l: 0.65,
            x: 4.9, y: 2.9, z: 3.7
        }, {//6
            h: 0.9, s: 1, l: 0.65,
            x: 4.9, y: 2.9, z: 10.1
        },]

        for (const lamp of LAMP_POST) {
            let color = new Color().setHSL(lamp.h, lamp.s, lamp.l)
            let lampObj = new Mesh(geoLamp1, new MeshBasicMaterial({ color: color }))
            lampObj.add(new Mesh(geoLamp2, new MeshBasicMaterial({ color: color, transparent: true, opacity: 0.3 })))
            lampObj.position.set(lamp.x, lamp.y, lamp.z)
            lampObj.updateMatrix()
            lampObj.matrixAutoUpdate = false
            scene.add(lampObj)
        }

        // roof school
        function roundRect(width, height, radius) {
            let matCanvas = document.createElement('canvas')
            matCanvas.width = width
            matCanvas.height = height
            let ctx = matCanvas.getContext('2d')
            let texture = new Texture(matCanvas)

            if (typeof radius === 'undefined') {
                radius = 20
            }
            if (typeof radius === 'number') {
                radius = { tl: radius, tr: radius, br: radius, bl: radius }
            } else {
                var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
                for (var side in defaultRadius) {
                    radius[side] = radius[side] || defaultRadius[side]
                }
            }

            let gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, height / 2)
            gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
            gradient.addColorStop(0.7, "rgba(255, 255, 255, 0)")
            gradient.addColorStop(0.75, "rgba(255, 255, 255, 0.2)")
            gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.9)")
            gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.2)")
            gradient.addColorStop(0.9, "rgba(255, 255, 255, 0)")

            ctx.arc(width / 2, width / 2, width / 2.2, 0, 2 * Math.PI)
            ctx.fillStyle = gradient
            ctx.fill()

            texture.needsUpdate = true
            return texture
        }

        const placementMatWhite = new MeshBasicMaterial({
            map: roundRect(100, 100),
            transparent: true,
            polygonOffset: true,
            polygonOffsetFactor: -4,
        })


        const placementGeo = new PlaneGeometry(topo_basic.cabane.profSize.x, topo_basic.cabane.profSize.z)

        for (let i = 0; i < topo_basic.cabane.heroes.length; i++) {
            const newPlacement = new Mesh(placementGeo, placementMatWhite)
            scene.add(newPlacement)

            third_controls.obj3D_add_click(newPlacement, () => {
                upgrade_view.window.display('upgrade')
                const hero_id = heroes_used[i]
                if (hero_id !== -1) {
                    upgrade_view.heroes_upgrade.hero_view_scroll[hero_id+1]()
                } else {
                    upgrade_view.heroes_upgrade.hero_view_scroll[0]()
                }
            })

            newPlacement.name = "prof" + i
            newPlacement.rotation.x = -Math.PI / 2
            newPlacement.position.x = topo_basic.cabane.heroes[i].x
            newPlacement.position.y = topo_basic.cabane.heroes[i].y
            newPlacement.position.z = topo_basic.cabane.heroes[i].z
            newPlacement.updateMatrix()
            newPlacement.matrixAutoUpdate = false
        }
        for (let i = 0; i < topo_basic.cabane.studentSelect.length; i++) {
            const newPlacement = new Mesh(placementGeo, placementMatWhite)
            scene.add(newPlacement)
            newPlacement.scale.multiplyScalar(2)
            newPlacement.name = "students"
            newPlacement.rotation.x = -Math.PI / 2
            newPlacement.position.x = topo_basic.cabane.studentSelect[i].x
            newPlacement.position.y = topo_basic.cabane.studentSelect[i].y
            newPlacement.position.z = topo_basic.cabane.studentSelect[i].z
            newPlacement.updateMatrix()
            newPlacement.matrixAutoUpdate = false
        }
        new Milky_Way_Background(scene)

        scene.add(group_field)

        const coin_coin = new Coin_Coin_3D(
            scene,
            third_controls,
            coin_mesh,
            quest_system,
        )
        const flowers = new Flowers_3D(scene, stem_mesh, blossom_mesh, loop_manager)

        const update = (dt) => {
            flowers.update(dt)
            coin_coin.update(dt)
        }
        loop_manager.frame_updates.add(update)

        this.dispose = () => {
            loop_manager.frame_updates.delete(update)
            flowers.dispose()
        }
    }
}











