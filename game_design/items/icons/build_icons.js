import fs from 'fs'
import svgo from 'svgo'

import path from 'path'
import url from 'url'
import { chdir } from 'process'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
chdir(__dirname)

let htmlFile = `nameSVG, nameIMG, nameCANVAS<br><div style="display: flex; flex-wrap: wrap;">`
let jsFile = ``
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

    const nameF = name.substring(0, l - 4)

    const result = svgo.optimize(str, {
        // optional but recommended field
        path: `${basePath}\\${name}`,
        // all config fields are also available here
        multipass: true,
    })
    str = result.data

    jsFile += `
export const ${nameF}RAW = \`${str}\``
    htmlFile += `<div style="margin: 5px"><div style="text-align: center;">${nameF}RAW</div><div style="width: 100px">${str}</div></div>`
}

rec()
fs.writeFileSync('icons.js', jsFile)
fs.writeFileSync('icons.html', htmlFile + `</div>`)
