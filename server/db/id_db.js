

import { db } from './global.js'

let lastId = 0

export const db_id_init = new Promise((resolve,) => {
    db.get(`SELECT MAX(app) from id`, (err, row) => {
        if (err === null)
            lastId = row['MAX(app)']
        else throw err
        resolve()
    })
})


const prepareInsert = db.prepare(`INSERT INTO id (app) VALUES (?)`)
export const insertDB_id = () => {
    lastId++
    return new Promise((resolve) => {
        prepareInsert.run(lastId,
            (err) => {
                if (err === null) resolve(lastId)
                else resolve()
            })
    })
}

const providers = ['twitch', 'discord', 'google']
export const selectDB_id = {}
export const updateDB_id = {}

for (const provider of providers) {
    const prepareSelect = db.prepare(`SELECT * from id WHERE ${provider} = ?`)
    selectDB_id[provider] = (prodvider_id) => {
        return new Promise((resolve) => {
            prepareSelect.get(prodvider_id,
                (err, row) => {
                    if (err === null) resolve(row)
                    else resolve()
                })
        })
    }

    const prepareUpdate = db.prepare(`UPDATE id SET ${provider} = ? WHERE app = ?`)
    updateDB_id[provider] = (app_id, provider_id) => {
        return new Promise((resolve) => {
            prepareUpdate.run([provider_id, app_id],
                (err) => {
                    if (err === null) resolve(true)
                    else resolve()
                })
        })
    }
}

const prepareDelete = db.prepare(`DELETE FROM id WHERE app = ?`)
export const deleteDB_id = (id) => {
    return new Promise((resolve) => {
        prepareDelete.run(id,
            (err) => {
                if (err === null) resolve(true)
                else resolve()
            })
    })
}