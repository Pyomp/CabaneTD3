import { Beta_Test } from '../../../../management/beta_test/Beta_Test.js'
import { i18nH } from '../../../utils/i18n.js'
import { createHTMLElement } from '../../../utils/htmlElement.js'

export class Beta_View {
    constructor() {
        const beta_test = new Beta_Test()

        const button_style = {
            padding: '5px',
            '--padding-button': '5px',
            backgroundColor: '#4444ff'
        }
        this.container = createHTMLElement('div', {
            width: '350px',
            padding: '5px',
        })

        createHTMLElement('span', {}, this.container, 'beta_desc')

        const toggle_button = createHTMLElement('button', button_style, this.container, 'start')

        const on_start = () => { i18nH(toggle_button, 'stop') }
        const on_stop = () => { i18nH(toggle_button, 'start') }
        beta_test.addEventListener('start', on_start)
        beta_test.addEventListener('stop', on_stop)

        toggle_button.onclick = async () => {
            toggle_button.disabled = true
            await beta_test.init()
            await beta_test.start()

            toggle_button.onclick = async () => {
                toggle_button.disabled = true
                if (beta_test.is_running === true) {
                    await beta_test.stop()
                } else {
                    await beta_test.start()
                }
                toggle_button.disabled = false
            }
            toggle_button.disabled = false
        }

        const download_video_button = createHTMLElement('button', button_style, this.container, 'download_video')

        download_video_button.addEventListener('click', async () => {
            download_log_button.disabled = true
            await beta_test.beta_download_video()
            download_log_button.disabled = false
        })

        const download_log_button = createHTMLElement('button', button_style, this.container, 'download_log')
        download_log_button.addEventListener('click', async () => {
            download_log_button.disabled = true
            await beta_test.beta_download_log()
            download_log_button.disabled = false
        })

        this.dispose = () => {
            beta_test.removeEventListener('start', on_start)
            beta_test.removeEventListener('stop', on_stop)
        }
    }
}










