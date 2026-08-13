







import { createHTMLElement } from '../../../../utils/htmlElement.js'
import { nextWaveIMG, repeatIMG, speedIMG } from '../../../../utils/icons/icons.js'
import { Manual_Desc } from './Manual_Desc.js'

export class General_Manual_View {
    constructor() {
        this.container = createHTMLElement('div', {
            padding: '5px',
        })

        new Manual_Desc(this.container, 'wave_start', `manual_wave_start_desc`, nextWaveIMG(50, 50).src, 50)
        new Manual_Desc(this.container, 'repeat', `manual_repeat_desc`, repeatIMG(50, 50).src, 50)
        new Manual_Desc(this.container, 'speed', `manual_speed_desc`, speedIMG(50, 50).src, 50)
    }
}








