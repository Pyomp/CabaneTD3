







import { cbH } from '../../../utils/utils.js'
import { GLTFLoader } from './GLTFLoader.js'
import { CubeTextureLoader, TextureLoader } from './three.module.js'

export class Loader_Manager {
    on_current = new Set()
    #current = 0
    get current() { return this.#current }
    set current(a) {
        this.#current = a
        cbH(this.on_current)
    }

    constructor() {
        let total = 0

        const gltf_loader = new GLTFLoader()
        this.gltf_load_async = (url) => new Promise((resolve) => {
            total++
            this.current++
            gltf_loader.load(
                url,
                (gltf) => { this.current--; resolve(gltf) },
                undefined,
                () => { this.current--; resolve() },
            )
        })

        const texture_load = new TextureLoader()
        this.texture_load = (url) => {
            const tex = texture_load.load(url)
            tex.flipY = false
            return tex
        }
        this.texture_load_async = (url) => new Promise((resolve) => {
            total++
            this.current++
            texture_load.load(
                url,
                (texture) => { this.current--; texture.flipY = false; resolve(texture) },
                undefined,
                () => { this.current--; resolve() },
            )
        })

        const texture_cube_load = new CubeTextureLoader()
        this.texture_cube_load = (urls) => texture_cube_load.load(urls)
        this.texture_cube_load_async = (urls) => new Promise((resolve) => {
            total++
            this.current = 1
            texture_cube_load.load(
                urls,
                (texture) => { this.current--; resolve(texture) },
                undefined,
                () => { this.current--; resolve() },
            )
        })

        this.get_percent = () => {
            if (total === 0) return 100
            return 100 * this.#current / total
        }
    }
}









