


import { init_caches, init_service_worker } from '../client/management/swInstall.js'
import '../utils/polyfile.js'
import { STYLE } from './utils/style/Style.js'

import { View_Manager } from './View_Manager.js'

await init_caches()
init_service_worker()

await STYLE.init()

new View_Manager(document.body)






