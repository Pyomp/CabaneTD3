import { createHTMLElement } from './utils/htmlElement.js'
import { Head } from './view/1_Head.js'
import { Introduction } from './view/2_Introduction.js'
import { Key_Features } from './view/3_Key_Feature/3_Key_Features.js'
import { Characters } from './view/4_Characters/4_Characters.js'
import { Loop_Manager } from './utils/Loop_Manager.js'
import { Footer } from './view/5_Footer.js'
import { TOC } from './view/lib/TOC.js'
import { Particle_Firefly } from './view/lib/firefly/Particle_Firefly.js'
import { STYLE } from './utils/style/Style.js'
import { Three_Context } from './utils/Three_Context.js'
import { Language_Selector } from './view/lib/Language_Selector/Language_Selector.js'


export class View_Manager {
    constructor(
        parent
    ) {

        this.container = createHTMLElement('div', {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }, parent)

        const section_style = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            transition: 'gap .5s filter .5s',
            maxWidth: '1400px',
            width: '100%',
        }

        const loop_manager = new Loop_Manager()

        const firefly = createHTMLElement('div', {
            background: STYLE.var.wallpaper,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-2',
        }, parent)
        const three_context = new Three_Context(firefly)
        three_context.update = loop_manager.update

        const particle_firefly = new Particle_Firefly(
            three_context.scene,
            loop_manager.particles_updates,
            loop_manager.updates,
        )

        particle_firefly.start()

        new Head(this.container)
        const general_presentation = new Introduction(this.container, section_style)
        const key_freature = new Key_Features(this.container, section_style)
        const characters = new Characters(this.container, section_style)
        new Footer(this.container, section_style)

        const language_selector = new Language_Selector(parent)
        {
            const s = language_selector.container.style
            s.position = 'fixed'
            s.top = '10px'
            s.right = '30px'
        }

        const toc = new TOC(parent, loop_manager)
        toc.add('general_presentation', general_presentation.container)
        toc.add('key_features', key_freature.container)
        toc.add('characters', characters.container)
    }
}









