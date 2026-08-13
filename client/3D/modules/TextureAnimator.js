
import { RepeatWrapping } from './three.module.js'

export class TextureAnimator {
    constructor(
        texture,
        tilesHoriz,
        tilesVert,
        numTiles,
        tile_display_duration
    ) {
        texture.wrapS = texture.wrapT = RepeatWrapping
        texture.repeat.set(1 / tilesHoriz - 0.001, 1 / tilesVert - 0.001)

        // how long has the current image been displayed?
        let next_tile = tile_display_duration

        // which image is currently being displayed?
        let currentTile = 0
        texture.offset.y = (tilesVert - Math.floor(currentTile / tilesHoriz) - 1) / tilesVert

        let age = 0
        this.update = (dt) => {
            age += dt
            if (next_tile < age) {
                next_tile = age + tile_display_duration
                currentTile = (currentTile + 1) % numTiles
                const currentColumn = currentTile % tilesHoriz
                texture.offset.x = currentColumn / tilesHoriz
                if (currentColumn === 0) {
                    const currentRow = tilesVert - Math.floor(currentTile / tilesHoriz + 0.001) - 1
                    texture.offset.y = currentRow / tilesVert + 0.001
                }
                texture.needsUpdate = true
            }
        }
    }
}

export const createSprite = (imgs, width, height, tilesHoriz) => {
    const canvas = document.createElement('canvas')
    canvas.width = width * tilesHoriz
    const len = imgs.length
    canvas.height = height * Math.floor(len / tilesHoriz)
    const ctx = canvas.getContext('2d')

    for (let i = 0; i < len; i++) {
        const img = imgs[i]
        ctx.drawImage(img,
            (i % tilesHoriz) * width,
            Math.floor(i / tilesHoriz) * height,
            width,
            height)
    }

    return canvas
}