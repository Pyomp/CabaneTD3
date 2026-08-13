











import { updateDB_user_frame_analyse } from '../db/user_db.js'

export class Frame_Analyse {
    constructor(id) {
        let data = ''

        this.frame_analyse = (cmd, payload) => {
            data += `${Date.now()}|${cmd}|${payload.toString()}\n`
            if (data.length > 1e6) {
                updateDB_user_frame_analyse(id, data)
                data = ''
            }
        }
        this.disabled = true

        this.dispose = () => {
            updateDB_user_frame_analyse(id, data)
        }
    }
}













