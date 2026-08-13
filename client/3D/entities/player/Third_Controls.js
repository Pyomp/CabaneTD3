


import { Camera, Raycaster, Vector2, Vector3 } from '../../../3D/modules/three.module.js'
import { cbH, createTimeoutRefresh } from '../../../../utils/utils.js'
import { PI2 } from '../../../../utils/math/math_utils.js'

export class Third_Controls {

    on_offset_y = new Set()
    #offset_y = 1
    get offset_y() { return this.#offset_y }
    set offset_y(a) {
        if (this.#offset_y !== a
            && Number.isFinite(a)
        ) {
            this.#offset_y = a
            cbH(this.on_offset_y)
        }
    }

    on_sensitivity = new Set()
    #sensitivity = 4
    get sensitivity() { return this.#sensitivity }
    set sensitivity(a) {
        if (this.#sensitivity !== a
            && Number.isFinite(a)
            && a >= 1
        ) {
            this.#sensitivity = a
            cbH(this.on_sensitivity)
        }
    }
    toArray = () => [
        this.#offset_y,
        this.#sensitivity
    ]
    fromArray = (array) => {
        if (array?.constructor !== Array) return
        this.offset_y = array[0]
        this.sensitivity = array[1]
    }

    /**
     * 
     * @param {Camera} camera 
     * @param {HTMLCanvasElement} domElement 
     * @param {Vector3} target 
     * @param {Set<function>} on_before_render 
     */
    constructor(
        camera,
        domElement,
        on_before_render
    ) {
        let phi = .8, r = 40,
            phi_wanted = phi, r_wanted = r
        this.theta = 0

        const minPolarAngle = 0.1
        const maxPolarAngle = 3
        const minDistCam = 1
        const maxDistCam = 20
        let is_event = false
        let target = new Vector3()
        this.set_cam_target = (targetP) => { target = targetP }

        let dir_x = 5, dir_y = 5, dir_z = 5

        const cam_halfNear = camera.near / 2
        const cam_p = camera.position
        let min_r = 9
        let max_r = min_r * 5

        const update = (dt) => {
            // const dt = Math.min(THR.dt * 5, 1)
            const target_offseted = target.y + this.offset_y
            if (is_event === true) {
                phi = phi_wanted
                r_wanted = min_r * 4
                r = r_wanted
            } else {
                dir_x = cam_p.x - target.x
                dir_y = cam_p.y - target_offseted
                dir_z = cam_p.z - target.z

                r_wanted = (dir_x ** 2 + dir_y ** 2 + dir_z ** 2) ** .5
                phi = Math.acos(dir_y / r_wanted)
                if (r_wanted < min_r) r_wanted = min_r
                else if (r_wanted > max_r) r_wanted = max_r

                this.theta = Math.atan2(dir_x, dir_z)

                const phi_diff = phi_wanted - phi

                if (phi_diff > 0.1) phi = phi + phi_diff * dt * .1
                else if (phi_diff < 0.01) phi = phi + phi_diff * dt * 1

                if (phi < 0.1) phi = 0.1
                if (phi > 1.55) phi = 1.55

                r = r + (r_wanted - r) * dt / 2
            }

            const sinPhiRadius = Math.sin(phi) * r
            dir_x = sinPhiRadius * Math.sin(this.theta)
            dir_y = Math.cos(phi) * r
            dir_z = sinPhiRadius * Math.cos(this.theta)

            cam_p.x = target.x + dir_x
            cam_p.y = dir_y + target_offseted
            cam_p.z = target.z + dir_z

            if (cam_p.y < cam_halfNear) cam_p.y = cam_halfNear
            camera.lookAt(target.x, target_offseted, target.z)
        }

        let p1, p1X, p1Y
        let p2, p2X, p2Y
        let dist = 0

        const obj3D_to_check = []
        const on_canvas_cb = []
        this.obj3D_delete_click = (obj3D) => {
            const index = obj3D_to_check.indexOf(obj3D)
            if (index === -1) return
            obj3D_to_check.splice(index, 1)
            on_canvas_cb.splice(index, 1)
        }
        this.obj3D_add_click = (obj3D, cb) => {
            if (obj3D_to_check.includes(obj3D) === true) return
            obj3D_to_check.push(obj3D)
            on_canvas_cb.push(cb)
        }

        const raycaster = new Raycaster()
        const pointer = new Vector2()

        const on_obj3D_click = (event) => {
            pointer.x = (event.clientX / innerWidth) * 2 - 1
            pointer.y = - (event.clientY / innerHeight) * 2 + 1
            raycaster.setFromCamera(pointer, camera)
            const intersects = raycaster.intersectObjects(obj3D_to_check, false)
            if (intersects?.[0]) {
                const index = obj3D_to_check.indexOf(intersects[0].object)
                on_canvas_cb[index]()
                return true
            }
        }

        const on_pointerdown = (e) => {
            if (on_obj3D_click(e) === true) return

            if (p1 === undefined) {
                is_event = true
                domElement.setPointerCapture(e.pointerId)
                p1 = e.pointerId; p1X = e.clientX; p1Y = e.clientY
            } else if (p2 === undefined) {
                domElement.setPointerCapture(e.pointerId)
                p2 = e.pointerId; p2X = e.clientX; p2Y = e.clientY
                dist = ((p1X - p2X) ** 2 + (p1Y - p2Y) ** 2) ** .5
            }
        }

        const onEnd = (e) => {
            const id = e.pointerId
            domElement.releasePointerCapture(id)
            if (p1 === id) {
                p1 = p2
                p1X = p2X
                p1Y = p2Y
                p2 = undefined
                is_event = !!p1
            } else if (p2 === id) {
                p2 = undefined
            }
        }

        const on_pointermove = (e) => {
            const id = e.pointerId
            if (p1 === id || p2 === id) {
                if (p2) { // zoom
                    if (p1 === id) { p1X = e.clientX; p1Y = e.clientY }
                    else if (p2 === id) { p2X = e.clientX; p2Y = e.clientY }

                    const newDist = ((p1X - p2X) ** 2 + (p1Y - p2Y) ** 2) ** .5
                    const delta = newDist - dist
                    dist = newDist

                    min_r += -delta * 0.01 * min_r
                    if (min_r < minDistCam) min_r = minDistCam
                    else if (min_r > maxDistCam) min_r = maxDistCam
                    max_r = min_r * 5

                } else {
                    const dx = e.clientX - p1X
                    const dy = e.clientY - p1Y
                    p1X = e.clientX; p1Y = e.clientY // save last mouse position
                    const deltaTheta = dx * this.sensitivity / domElement.clientHeight // yes, height
                    const deltaPhi = dy * this.sensitivity / domElement.clientHeight // rotate Up
                    this.theta = (this.theta - deltaTheta) % PI2
                    phi_wanted = (phi_wanted - deltaPhi) % PI2
                    if (phi_wanted < minPolarAngle) phi_wanted = minPolarAngle; else if (phi_wanted > maxPolarAngle) phi_wanted = maxPolarAngle
                }
            }
        }

        const is_event_to_false_delay = createTimeoutRefresh(() => {
            if (document.pointerLockElement === null)
                is_event = false
        }, 500)

        const onWheel = (e) => {
            if (e.target !== domElement) return
            const delta = (-e.wheelDelta * r) / 5000
            min_r += delta
            if (min_r < minDistCam) min_r = minDistCam
            else if (min_r > maxDistCam) min_r = maxDistCam
            max_r = min_r * 5

            if (!is_event) {
                is_event_to_false_delay()
                is_event = true
            }
        }


        domElement.addEventListener('pointerdown', on_pointerdown)
        domElement.addEventListener('lostpointercapture', onEnd)
        domElement.addEventListener('pointermove', on_pointermove)
        addEventListener('wheel', onWheel)
        on_before_render.add(update)
        this.dispose = () => {
            domElement.removeEventListener('pointerdown', on_pointerdown)
            domElement.removeEventListener('lostpointercapture', onEnd)
            domElement.removeEventListener('pointermove', on_pointermove)
            on_before_render.delete(update)
            removeEventListener('wheel', onWheel)
        }
    }
}

// ---------------------------------------------------------------------------------

