





import { AmbientLight, DirectionalLight, PerspectiveCamera, RGBAFormat, Scene, WebGLRenderer } from '../client/3D/modules/three.module.js'
import { THR } from '../client/3D/Three_Context.js'
import { init_ent_animals } from './client/entities/heroes/animals/init_ent_animals.js'
import { init_ent_cactus } from './client/entities/heroes/cactus/init_ent_cactus.js'
import { init_ent_employee } from './client/entities/heroes/employee/init_ent_employee.js'
import { init_ent_engineer } from './client/entities/heroes/engineer/init_ent_engineer.js'
import { init_ent_kitsunes } from './client/entities/heroes/kitsune/init_ent_kitsunes.js'
import { init_ent_magicians } from './client/entities/heroes/magician/init_ent_magicians.js'
import { init_ent_plants } from './client/entities/heroes/plant/init_ent_plants.js'
import { init_ent_witches } from './client/entities/heroes/witch/init_ent_witches.js'
import { init_students_model } from './client/entities/heroes/student/Student.js'

const size = 256

//canvas
const render_canvas = document.createElement("canvas")
render_canvas.height = render_canvas.width = size

// renderer
const renderer = new WebGLRenderer({
    canvas: render_canvas,
    antialias: true,
    format: RGBAFormat,
    alpha: true,
})
renderer.setSize(size, size, true)

const scene = new Scene()
// camera
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
camera.aspect = 1

camera.position.set(-3, 2.2, 4)
camera.lookAt(0, 1, 0)
camera.updateProjectionMatrix()

const directional_light = new DirectionalLight(0xffffff, .5)
directional_light.position.set(-15, 10, 5)

scene.add(directional_light, new AmbientLight(0xffffff, .5))

const wait = (ms) => new Promise((res) => { setTimeout(res, ms) })

THR.canvas.remove()

    ;
(async () => {
    {
        const model = await init_students_model
        await wait(1_000)

        camera.position.set(-1, 1.5, 2)
        camera.lookAt(0, 1, 0)
        camera.updateProjectionMatrix()

        const mesh = model
        const c = document.createElement('canvas')
        c.width = c.height = size
        document.body.appendChild(c)
        const ctx = c.getContext('2d')

        scene.add(mesh)
        renderer.render(scene, camera)
        scene.remove(mesh)
        ctx.drawImage(render_canvas, 0, 0, size, size)
    }
    {
        const models = await init_ent_magicians()
        await wait(1_000)

        camera.position.set(-2.6, 3, 3.6)
        camera.lookAt(0, 1.75, 0)
        camera.updateProjectionMatrix()

        for (const key in models) {
            const mesh = models[key][0]

            const c = document.createElement('canvas')
            c.id = key
            c.width = c.height = size
            document.body.appendChild(c)
            const ctx = c.getContext('2d')

            scene.add(mesh)
            renderer.render(scene, camera)
            scene.remove(mesh)
            ctx.drawImage(render_canvas, 0, 0, size, size)
        }
    }
    {
        const models = await init_ent_witches()
        await wait(1_000)

        camera.position.set(-2.6, 3, 3.6)
        camera.lookAt(0, 1.75, 0)
        camera.updateProjectionMatrix()

        for (const key in models) {
            const mesh = models[key][0]

            const c = document.createElement('canvas')
            c.width = c.height = size
            document.body.appendChild(c)
            const ctx = c.getContext('2d')

            scene.add(mesh)
            renderer.render(scene, camera)
            scene.remove(mesh)
            ctx.drawImage(render_canvas, 0, 0, size, size)
        }
    }
    {
        const models = await init_ent_animals()
        await wait(1_000)

        camera.position.set(-2, 2.2, 3)
        camera.lookAt(0, 1.3, 0)
        camera.updateProjectionMatrix()

        for (const key in models) {
            const mesh = models[key][0]

            const c = document.createElement('canvas')
            c.width = c.height = size
            document.body.appendChild(c)
            const ctx = c.getContext('2d')

            scene.add(mesh)
            renderer.render(scene, camera)
            scene.remove(mesh)
            ctx.drawImage(render_canvas, 0, 0, size, size)
        }
    }
    {
        const models = await init_ent_kitsunes()
        await wait(1_000)

        camera.position.set(-2, 2.2, 3)
        camera.lookAt(0, 1.3, 0)
        camera.updateProjectionMatrix()

        for (const key in models) {
            const mesh = models[key][0]

            const c = document.createElement('canvas')
            c.width = c.height = size
            document.body.appendChild(c)
            const ctx = c.getContext('2d')

            scene.add(mesh)
            renderer.render(scene, camera)
            scene.remove(mesh)
            ctx.drawImage(render_canvas, 0, 0, size, size)
        }
    }
    {
        const models = await init_ent_plants()
        await wait(1_000)

        camera.position.set(-2, 2.2, 3)
        camera.lookAt(0, 1.3, 0)
        camera.updateProjectionMatrix()

        for (const key in models) {
            const mesh = models[key][0]

            const c = document.createElement('canvas')
            c.width = c.height = size
            document.body.appendChild(c)
            const ctx = c.getContext('2d')

            scene.add(mesh)
            renderer.render(scene, camera)
            scene.remove(mesh)
            ctx.drawImage(render_canvas, 0, 0, size, size)
        }
    }
    {
        const models = await init_ent_cactus()
        await wait(1_000)

        camera.position.set(-2, 2.2, 3)
        camera.lookAt(0, 1.3, 0)
        camera.updateProjectionMatrix()

        for (const key in models) {
            const mesh = models[key][0]

            const c = document.createElement('canvas')
            c.width = c.height = size
            document.body.appendChild(c)
            const ctx = c.getContext('2d')

            scene.add(mesh)
            renderer.render(scene, camera)
            scene.remove(mesh)
            ctx.drawImage(render_canvas, 0, 0, size, size)
        }
    }
    {
        const model = await init_ent_engineer()
        await wait(1_000)

        camera.position.set(-2, 2.2, 3)
        camera.lookAt(0, 1.3, 0)
        camera.updateProjectionMatrix()

        const mesh = model

        const c = document.createElement('canvas')
        c.width = c.height = size
        document.body.appendChild(c)
        const ctx = c.getContext('2d')

        scene.add(mesh)
        renderer.render(scene, camera)
        scene.remove(mesh)
        ctx.drawImage(render_canvas, 0, 0, size, size)
    }
    {
        const model = await init_ent_employee()
        await wait(1_000)

        camera.position.set(-2, 2.2, 3)
        camera.lookAt(0, 1.3, 0)
        camera.updateProjectionMatrix()

        const mesh = model[0]

        const c = document.createElement('canvas')
        c.width = c.height = size
        document.body.appendChild(c)
        const ctx = c.getContext('2d')

        scene.add(mesh)
        renderer.render(scene, camera)
        scene.remove(mesh)
        ctx.drawImage(render_canvas, 0, 0, size, size)
    }
})()











