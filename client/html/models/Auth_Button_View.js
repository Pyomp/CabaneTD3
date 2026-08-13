




import { User_Data } from '../../../common/user_data/User_Data.js'
import { Provider_Info } from '../../appAPI/auth/Provider_Info.js'
import { WS_Client } from '../../appAPI/WS_Client.js'
import { createHTMLElement } from '../utils/htmlElement.js'
import { Async_Button } from './Async_Button.js'

export class Auth_Button_View {

    /**
     * @param {Element} parent 
     * @param {User_Data} game 
     * @param {Provider_Info} provider_info 
     * @param {WS_Client} ws_client 
     */
    constructor(
        parent,
        user_data,
        provider_info,
        ws_client,
    ) {
        const container = createHTMLElement('div', {
            display: 'flex', alignItems: 'center', width: '100%'
        }, parent)
        const is_linked_span = createHTMLElement('span', {
            width: '30px', color: 'hsl(120, 100%, 70%)',
        }, container)
        const game_data = user_data.game
        // const twitch_link_update = () => { is_linked_span.innerHTML = ((game_data.account_linked & provider_info.id) === 0) ? '' : 'link' }
        // twitch_link_update()
        // game_data.on_account_linked.add(twitch_link_update)

        const button = new Async_Button(provider_info.name, {
            backgroundColor: provider_info.color,
            width: 'calc(100% - 60px)',
            padding: '5px',
            '--padding-button': '2px',
        }, container)

        let disabled = false

        button.container.addEventListener('click', async () => {
            if (disabled === true) return
            disabled = true

            button.display_progress()

            const token = await provider_info.get_token()
            if (token) {
                const res = await ws_client.init(provider_info.name, token)

                if (!res) {
                    button.display_nok()
                    button.error('fail')
                } else {
                    const code = res[2]
                    switch (code) {
                        case 0:
                            button.display_ok()
                            break

                        case 1:
                            button.display_nok()
                            button.error('already_linked')
                            break

                        case 2:
                            button.display_nok()
                            button.error('already_linked_to_an_other_account_log_out_before')
                            break

                        case 3:
                            button.display_nok()
                            button.error('authorization_fail')
                            break

                        case 4:
                            button.display_nok()
                            button.error('already_linked_to_an_other_account_log_out_before')
                            break

                        default:
                            break
                    }
                }
            } else {
                button.display_nok()
                button.error(`${provider_info.name}_not_available`)
            }

            disabled = false
        })
    }
}










