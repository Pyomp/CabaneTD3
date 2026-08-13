'use strict'

import { createServer } from 'http'

import path from 'path'
import url from 'url'
import { chdir } from 'process'
import { init_route, requestListener } from './route.js'
import { wss } from './ws.js'

import './monitoring/console.js'
import { isDev } from '../env.js'
import { db_id_init } from './db/id_db.js'
// import { init_oauthPaypal } from './paypal.js'
// import { init_frame_analyse } from './User/Frame_Analyse.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

    ;
(async () => {
    await db_id_init
    const server = createServer(requestListener)

    wss.init(server)

    init_route()

    if (isDev === true) {
        chdir(path.join(__dirname, '/..'))
        console.log('isDev = true !')
    } else {
        chdir('./dist')
    }
    
    console.log(`listen on folder ${process.cwd()}`)

    server.listen(80, '0.0.0.0')
})()




