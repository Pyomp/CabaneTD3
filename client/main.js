'use strict'

console.log(`                  
(\\_/) (\\___/) 
(^_^) (='.'=)    _[ ]_       
(>$<) ( U U )   \\('o')/      
(/ \\) (")_(")    ( : )       
`)

import { Loader_Manager } from './3D/modules/Loader_Manager.js'
import { Game_Client } from './Game_Client.js'
import { STYLE } from './html/utils/style/Style.js'
import { init_caches, init_service_worker } from './management/swInstall.js'

await init_caches()
init_service_worker()

await STYLE.init()

const loader_manager = new Loader_Manager()
    ;
(async () => {
    await Game_Client.init(loader_manager)

    new Game_Client()
})()







addEventListener('contextmenu', (e) => {
    if (e.target.nodeName !== 'INPUT') e.preventDefault()
    e.stopPropagation()
})
