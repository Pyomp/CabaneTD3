import { ERROR_MP_TO_LOW } from '../../../common/constants.js'
import { Player } from '../../../common/entities/Player.js'
import { Input_Manager } from '../../management/Input_Manager.js'
import { Skill_Image } from '../../ressources/skill_image/Skill_Image.js'
import { Hint_Info_View } from '../models/Hint_Info_View.js'
import { setStyle } from '../utils/htmlElement.js'

class Skill_Button_View {

    /**
     * 
     * @param {HTMLElement} parent 
     * @param {CSSStyleDeclaration} style 
     * @param {string} image_url 
     * @param {Input_Manager} input_manager 
     * @param {string} input_name 
     * @param {function} cb 
     */
    constructor(
        parent,
        style = {},
        image_url,
        input_manager,
        input_name,
        cb,
    ) {
        const img = new Image(60, 60)
        img.src = image_url
        img.style.position = 'fixed'
        img.style.padding = '10px'
        setStyle(img, style)
        parent.appendChild(img)
        const on_click = () => { cb() }
        img.addEventListener('click', on_click)
        input_manager.dispatcher.down[input_name] = on_click

        this.dispose = () => {
            img.removeEventListener('click', on_click)
            img.remove()
            delete input_manager.dispatcher.down[input_name]
        }
    }
}

export class Skills_View {
    /**
     * @param {HTMLElement} parent 
     * @param {Player} player
     * @param {Input_Manager} input_manager
     * @param {Skill_Image} skill_image
     * @param {Hint_Info_View} hint_info_view
     */
    constructor(
        parent,
        player,
        ultimate_system,
        input_manager,
        skill_image,
        hint_info_view
    ) {

        const jump = new Skill_Button_View(parent, {
            right: '5px',
            bottom: '5px',
        }, skill_image.jump,
            input_manager, 'skill0', player.jump)

        const left = new Skill_Button_View(parent,
            {
                right: '20px',
                bottom: '80px',
            },
            skill_image.left,
            input_manager,
            'skill1',
            () => {
                if (player.left() === ERROR_MP_TO_LOW) {
                    hint_info_view.display('mp_to_low')
                }
            })

        const right = new Skill_Button_View(parent,
            {
                right: '80px',
                bottom: '5px',
            },
            skill_image.right,
            input_manager,
            'skill2',
            () => {
                if (player.right() === ERROR_MP_TO_LOW) {
                    hint_info_view.display('mp_to_low')
                }
            })

        const knock = new Skill_Button_View(parent,
            {
                right: '100px',
                bottom: '80px',
            },
            skill_image.knock,
            input_manager,
            'skill3',
            () => {
                if (player.knock() === ERROR_MP_TO_LOW) {
                    hint_info_view.display('mp_to_low')
                }
            })

        const slide = new Skill_Button_View(parent, {
            right: '10px',
            bottom: '160px',
        }, skill_image.slide,
            input_manager, 'skill4', player.slide)

        const ult = new Skill_Button_View(parent, {
            right: '160px',
            bottom: '5px',
        }, skill_image.ult,
            input_manager, 'skill5', ultimate_system.launch)

        this.dispose = () => {
            jump.dispose()
            left.dispose()
            right.dispose()
            knock.dispose()
            slide.dispose()
            ult.dispose()
        }
    }
}








