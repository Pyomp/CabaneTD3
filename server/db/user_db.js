

import { db } from './global.js'
import v8 from 'v8'

const nameTable = 'user'

const prepareInsert = db.prepare(`INSERT INTO ${nameTable} (id) VALUES (?)`)
export const insertDB_user = (id) => {
    return new Promise((resolve) => {
        prepareInsert.run(id,
            (err) => {
                if (err === null) resolve(true)
                else resolve(false)
            })
    })
}

const prepareSelect = db.prepare(`SELECT appData from ${nameTable} WHERE id = ?`)
export const selectDB_user = (id) => {
    return new Promise((resolve) => {
        prepareSelect.get(id,
            (err, row) => {
                if (err === null && row) {
                    const appData = row.appData
                    try {
                        resolve(v8.deserialize(appData))
                    } catch { resolve() }
                }
                else resolve()
            })
    })
}

const prepareUpdate = db.prepare(`UPDATE ${nameTable} SET appData = ? WHERE id = ?`)
export const updateDB_user = (id, appData) => {
    return new Promise((resolve) => {
        try {
            prepareUpdate.run([v8.serialize(appData), id],
                (err) => {
                    if (err === null) resolve(true)
                    else resolve()
                })
        } catch { resolve() }
    })
}

const prepareUpdate_frame_analyse = db.prepare(`UPDATE ${nameTable} SET frame_analyse = frame_analyse || ? WHERE id = ?`)
export const updateDB_user_frame_analyse = (id, frame_analyse) => {
    return new Promise((resolve) => {
        prepareUpdate_frame_analyse.run([frame_analyse, id],
            (err) => {
                if (err === null) resolve(true)
                else resolve()
            })
    })
}


const prepareDelete = db.prepare(`DELETE FROM ${nameTable} WHERE id = ?`)
export const deleteDB_user = (id) => {
    return new Promise((resolve) => {
        prepareDelete.run(id,
            (err) => {
                if (err === null) resolve(true)
                else resolve()
            })
    })
}