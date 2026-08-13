import { WS_Client } from '../../appAPI/WS_Client.js'
import { createHTMLElement } from '../utils/htmlElement.js'
import { i18nH } from '../utils/i18n.js'
import { hint_popup } from '../utils/views/hint_popup.js'


export class Connection_View {

    /**
     * @param {HTMLElement} parent 
     * @param {WS_Client} ws_client 
     */
    constructor(
        parent,
        ws_client,
    ) {
        /** connection icon */
        this.container = createHTMLElement('div', {
            padding: '0 10px 15px 10px'
        }, parent)
        const connection = createHTMLElement('div', {
            width: '16px', height: '16px',
            border: 'solid 2px black',
            borderRadius: '50%',
            position: 'relative',
        }, this.container)

        const connectionHint = createHTMLElement('div', {})

        hint_popup(connection, connectionHint)

        const updateConnection = () => {
            if (ws_client.state === WS_Client.OPEN) {
                connection.style.background = 'hsl(120, 100%, 70%)'
                i18nH(connectionHint, 'all_connection_right')
            } else if (ws_client.state === WS_Client.CONNECTING) {
                connection.style.background = 'hsl(30, 100%, 70%)'
                i18nH(connectionHint, 'connection_problem')
            } else {
                connection.style.background = 'hsl(0, 100%, 70%)'
                i18nH(connectionHint, 'connection_problem')
            }
        }

        updateConnection()
        ws_client.on_state.add(updateConnection)
        this.dispose = () => {
            this.container.remove()
            ws_client.on_state.delete(updateConnection)
        }
    }
}


