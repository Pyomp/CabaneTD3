'use strict'
import * as rollup from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { createServer } from 'http'
import { readFile } from 'fs'
import path from 'path'
import { exec } from 'child_process'
import os from 'os'



export const server_for_bin_3D_models = async (__dirname, name) => {
    const roll = await rollup.rollup({ input: './b_module.js', })
    const generate = await roll.generate({ format: 'es', plugins: [terser()] })
    const bundle = generate.output[0].code
    process.chdir(path.join(os.homedir(), '/Sync/gameLib'))

    const indexHtml = `<!DOCTYPE html>
    <html><head><title>Bin 3D</title>
        <style> body { background: black; } </style>
    </head><body></body>
    <script type="module">
    import { download } from "../../builder/utils_constructor.js"
    download('${name}')
    </script></html>`

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
    }
    const urlStart = '/' + path.relative(process.cwd(), __dirname).split(path.sep).join('/') + '/'

    const server = createServer((req, res) => {
        if (req.url === urlStart) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(indexHtml, 'utf-8')
            return
        } else if (req.url === urlStart + 'n_bundle_module.js') {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.end(bundle, 'utf-8')
            return
        }
        const filePath = '.' + req.url

        const extension = String(path.extname(filePath)).toLowerCase()
        const contentType = mimeTypes[extension] || 'application/octet-stream'

        readFile(filePath, (error, content) => {
            if (error !== null) {
                res.writeHead(500).end('404')
            } else {
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(content, 'utf-8')
            }
        })
    })
    server.listen(6879, '0.0.0.0')
    console.log('Builder Binary 3D Models')
    process.stdout.write(
        String.fromCharCode(27) + "]0;" + 'Builder Binary 3D Models' + String.fromCharCode(7)
    )
    exec('start chrome ' + 'http://localhost:6879' + urlStart)
}
