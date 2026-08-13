
import { readdir, readFile } from 'fs'
import path, { extname, join } from 'path'
import { totalmem, freemem } from 'os'
import { isDev } from '../env.js'
import fs from 'fs'
import { presentation_index_HTML } from '../presentation/presentation_index_html.js'
import { game_index_html } from '../client/game_index_html.js'

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
    '.wasm': 'application/wasm'
}
let cacheFile = {}

const max_mem_allowed = totalmem() / 2
export const httpPostDispatcher = {
    // '/paypalwebhook': async (req, res) => {
    //     const body = await getBodyStr(req)
    //     console.log(body)
    //     // res.writeHead(200)
    //     // res.end()
    // }
}

export const init_route = () => {
    const twitchHTML = fs.readFileSync(new URL("../auth_html/twitch.html", import.meta.url))
    http_GET_dispatcher['/twitch/'] = (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(twitchHTML, 'utf-8')
    }

    const googleHTML = fs.readFileSync(new URL('../auth_html/google.html', import.meta.url))
    http_GET_dispatcher['/google/'] = (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(googleHTML, 'utf-8')
    }

    const discordHTML = fs.readFileSync(new URL('../auth_html/discord.html', import.meta.url))
    http_GET_dispatcher['/discord/'] = (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(discordHTML, 'utf-8')
    }

    http_GET_dispatcher['/'] = (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(presentation_index_HTML, 'utf-8')
    }

    http_GET_dispatcher['/game'] = (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(game_index_html, 'utf-8')
    }

}

export const http_GET_dispatcher = {}

export const requestListener = (req, res) => {
    if (req.method === 'GET') {
        const cb = http_GET_dispatcher[req.url]
        if (cb) {
            cb(req, res)
        } else {

            const filePath = '.' + req.url

            if (filePath.includes('..')) return

            const cache = cacheFile[filePath]

            if (cache) {
                res.writeHead(200, { 'Content-Type': cache[1] })
                res.end(cache[0], 'utf-8')
            } else {
                const extension = String(extname(filePath)).toLowerCase()
                const contentType = mimeTypes[extension] || 'application/octet-stream'

                readFile(filePath, (error, content) => {
                    if (error !== null) {
                        res.writeHead(404).end('404')
                    } else {
                        if (!isDev) {
                            if (freemem() > max_mem_allowed && content.length < 5e7) {
                                cacheFile[filePath] = [content, contentType]
                            } else {
                                console.log(`! Low Memory Pyompy :o ! cache cleared, freemem() = ${freemem()}`)
                                cacheFile = {}
                            }
                        }
                        res.writeHead(200, { 'Content-Type': contentType })
                        res.end(content, 'utf-8')
                    }
                })
            }
        }
    } else if (req.method === 'POST') {
        const cb = httpPostDispatcher[req.url]
        if (cb) {
            cb(req, res)
        } else {
            res.writeHead(404).end('404')
        }
    }
}

const getBodyStr = (req) => {
    return new Promise((resolve) => {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', () => {
            resolve(body)
        })
    })
}

const indexViewHtml = `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="manifest" href="./manifest.json">
    <meta name="viewport"
        content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>Cabane TD</title>
    <meta name="description" content="Try it on mobile it's pretty cool !">
</head>
<body>
</body>
<script type='module' src="client.js"></script>
</html>`.replace(/\n/gm, ' ').replace(/> +</gm, '><').replace(/ +/gm, ' ')