import fs from 'fs'
import svgo from 'svgo'

export const build_image_for_texture = () => {
    let htmlFile = `nameSVG, nameIMG, nameCANVAS<br><div style="display: flex; flex-wrap: wrap;">`
    let jsFile = `
const div = document.createElement('div')
const createSVGElement = (svgStr) => {
    div.innerHTML = svgStr
    return div.firstChild
}

export const svgToImg = (rawSVG, resolution) => {
    const img = new Image(resolution, resolution)
    return new Promise((resolve) => {
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (err) => {
            console.log(err)
            resolve()
        }
        img.src = "data:image/svg+xml;base64," + btoa(rawSVG)
    })
}

export const svgToCanvas = (rawSVG, resolution,  canvas = document.createElement('canvas')) => {
    const buffImage = new Image( resolution, resolution)
    return new Promise((resolve) => {
        buffImage.onload = () => {
            canvas.width = buffImage.width
            canvas.height = buffImage.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(buffImage, 0, 0)

            resolve(canvas)
        }
        buffImage.onerror = (err) => {
            console.log(err)
            resolve()
        }
        buffImage.src = "data:image/svg+xml;base64," + btoa(rawSVG)
    })
}
`
    const rec = (path = '.') => {
        const files = fs.readdirSync(path, { withFileTypes: true })
        for (const file of files) {
            if (file.isDirectory()) {
                rec(`${path}\\${file.name}`)
            } else {
                svgComputation(path, file.name)
            }
        }
    }

    const svgComputation = (basePath, name) => {
        const l = name.length
        if (name.substring(l - 4) === '.svg') {

            const buffer = fs.readFileSync(`${basePath}\\${name}`)
            let str = buffer.toString()
            str = str.replace(/\n/gm, ' ').replace(/> +</gm, '><').replace(/ +/gm, ' ')

            const nameF = name.substring(0, l - 4).replaceAll(/[ -]+/g, '_')

            const result = svgo.optimize(str, {
                // optional but recommended field
                path: `${basePath}\\${name}`,
                // all config fields are also available here
                multipass: true,
            })
            str = result.data

            jsFile += `
const ${nameF} = \`${str}\`
export const ${nameF}SVG = ()=>{return createSVGElement(${nameF})}
export const ${nameF}IMG = (resolution)=>{return svgToImg(${nameF}, resolution)}
export const ${nameF}CANVAS = (resolution)=>{return svgToCanvas(${nameF}, resolution)}
`
            htmlFile += `<div style="margin: 5px"><div style="text-align: center;">${nameF}</div><div style="width: 100px">${str}</div></div>`
        }
    }

    rec()
    fs.writeFileSync('texture.js', jsFile)
    fs.writeFileSync('texture.html', htmlFile + `</div>`)
}


export const build_image_for_texture_with_png = () => {
    let htmlFile = `nameSVG, nameIMG, nameCANVAS<br><div style="display: flex; flex-wrap: wrap;">`
    let jsFile = `
const div = document.createElement('div')
const createSVGElement = (svgStr) => {
    div.innerHTML = svgStr
    return div.firstChild
}

export const svgToImg = (rawSVG, resolution) => {
    const img = new Image(resolution, resolution)
    return new Promise((resolve) => {
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (err) => {
            console.log(err)
            resolve()
        }
        img.src = "data:image/svg+xml;base64," + btoa(rawSVG)
    })
}

export const svgToCanvas = (rawSVG, resolution,  canvas = document.createElement('canvas')) => {
    const buffImage = new Image( resolution, resolution)
    return new Promise((resolve) => {
        buffImage.onload = () => {
            canvas.width = buffImage.width
            canvas.height = buffImage.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(buffImage, 0, 0)

            resolve(canvas)
        }
        buffImage.onerror = (err) => {
            console.log(err)
            resolve()
        }
        buffImage.src = "data:image/svg+xml;base64," + btoa(rawSVG)
    })
}

const base64ToImg = (base64) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => { resolve(img) }
        img.src = \`data:image/png;base64, \${base64}\`
    })
}

const base64ToCanvas = (base64, resolution = 512) => {
    return new Promise(async (resolve) => {
        const img = await base64ToImg(base64)
        const canvas = document.createElement('canvas')
        canvas.width = resolution
        canvas.height = resolution
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, resolution, resolution)
        resolve(canvas)
    })
}
`
    const rec = (path = '.') => {
        const files = fs.readdirSync(path, { withFileTypes: true })
        for (const file of files) {
            if (file.isDirectory()) {
                rec(`${path}\\${file.name}`)
            } else {
                svgComputation(path, file.name)
                pngComputation(path, file.name)
            }
        }
    }

    const svgComputation = (basePath, name) => {
        const l = name.length
        if (name.substring(l - 4) === '.svg') {

            const buffer = fs.readFileSync(`${basePath}\\${name}`)
            let str = buffer.toString()
            str = str.replace(/\n/gm, ' ').replace(/> +</gm, '><').replace(/ +/gm, ' ')

            const nameF = name.substring(0, l - 4).replaceAll(/[ -]+/g, '_')

            const result = svgo.optimize(str, {
                // optional but recommended field
                path: `${basePath}\\${name}`,
                // all config fields are also available here
                multipass: true,
            })
            str = result.data

            jsFile += `
const ${nameF} = \`${str}\`
export const ${nameF}SVG = ()=>{return createSVGElement(${nameF})}
export const ${nameF}IMG = (resolution)=>{return svgToImg(${nameF}, resolution)}
export const ${nameF}CANVAS = (resolution)=>{return svgToCanvas(${nameF}, resolution)}
`
            htmlFile += `<div style="margin: 5px"><div style="text-align: center;">${nameF}</div><div style="width: 100px">${str}</div></div>`
        }
    }

    const pngComputation = (basePath, name) => {
        const l = name.length
        if (name.substring(l - 4) === '.jpg' || name.substring(l - 4) === '.png') {

            const buffer = fs.readFileSync(`${basePath}\\${name}`)

            const nameF = name.substring(0, l - 4).replaceAll(/[ -]+/g, '_')
            if (fs.existsSync(`${basePath}\\${nameF}.svg`)) return

            const str = buffer.toString('base64')

            jsFile += `
const ${nameF} = \`${str}\`
export const ${nameF}IMG = ()=>{return base64ToImg(${nameF})}
export const ${nameF}CANVAS = (resolution)=>{return base64ToCanvas(${nameF}, resolution)}
`
        }
    }

    rec()
    fs.writeFileSync('texture.js', jsFile)
    fs.writeFileSync('texture.html', htmlFile + `</div>`)
}