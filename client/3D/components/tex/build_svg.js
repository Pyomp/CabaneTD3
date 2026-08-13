import fs from 'fs'
import svgo from 'svgo'

import path from 'path'
import url from 'url'
import { chdir } from 'process'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
chdir(__dirname)


let htmlFile = `nameSVG, nameIMG, nameCANVAS<br><div style="display: flex; flex-wrap: wrap;">`
let jsFile = `
const div = document.createElement('div')
const createSVGElement = (svgStr) => {
    div.innerHTML = svgStr
    return div.firstChild
}

export const svgToImg = (rawSVG, img = new Image()) => {
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

export const svgToCanvas = (rawSVG, canvas = document.createElement('canvas')) => {
    const buffImage = new Image()
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
    if (name.substring(l - 4) !== '.svg') return

    const buffer = fs.readFileSync(`${basePath}\\${name}`)
    let str = buffer.toString()
    str = str.replace(/\n/gm, ' ').replace(/> +</gm, '><').replace(/ +/gm, ' ')

    const nameF = name.substring(0, l - 4).replaceAll(/[ -.]+/g, '_')

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
export const ${nameF}IMG = (width, height)=>{return svgToImg(${nameF}, width, height)}
export const ${nameF}CANVAS = (width, height)=>{return svgToCanvas(${nameF}, width, height)}
`
    htmlFile += `<div style="margin: 5px"><div style="text-align: center;">${nameF}</div><div style="width: 100px">${str}</div></div>`
}

rec()
fs.writeFileSync('bundle_svg.js', jsFile)
fs.writeFileSync('svg.html', htmlFile + `</div>`)
