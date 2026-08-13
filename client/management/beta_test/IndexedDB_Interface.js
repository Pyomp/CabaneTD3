import { empty_function } from "../../../utils/utils.js"



export class IndexedDB_Interface {
    put = empty_function
    get = empty_function
    delete = empty_function
    constructor(name, keyPath, indexes = []) {
        this.init = () => {
            if (this.put !== empty_function) return
            return new Promise((resolve) => {

                const DBOpenRequest = window.indexedDB.open(name)

                DBOpenRequest.onerror = (e) => { resolve() }

                DBOpenRequest.onsuccess = (e) => {
                    const db = DBOpenRequest.result
                    initGetAddRemove(db)
                    resolve(true)
                }

                // if the db is not init (or version upgrade)
                DBOpenRequest.onupgradeneeded = (e) => {
                    const target = e.target
                    const db = target.result

                    db.onerror = () => { resolve(false) }// Error loading database           

                    // create "table", keyPath = primary key
                    const objectStore = db.createObjectStore(name, { keyPath: keyPath })
                    for (const index of indexes) {
                        objectStore.createIndex(index, index, { unique: false })
                    }
                    target.transaction.oncomplete = () => {
                        initGetAddRemove(db)
                        resolve(true)
                    }
                    target.transaction.onerror = () => { resolve(false) }
                    target.transaction.onabort = () => { resolve(false) }
                }

                // what we resolve when indexedDB is ready
                const initGetAddRemove = (db) => {

                    // for all functions, resolve undefined if nothing or fail
                    this.put = (newItem) => {
                        return new Promise((resolve) => {
                            let result
                            const transaction = db.transaction([name], "readwrite")
                            transaction.oncomplete = () => { resolve(result) }
                            transaction.onerror = () => { resolve() }
                            transaction.onabort = () => { resolve() }
                            const objectStore = transaction.objectStore(name)
                            const req = objectStore.put(newItem)
                            req.onsuccess = () => { result = true }
                        })
                    }
                    this.get = (key) => {
                        return new Promise((resolve) => {
                            const transaction = db.transaction([name], "readwrite")
                            transaction.oncomplete = () => { resolve(req.result) }
                            transaction.onerror = () => { resolve() }
                            transaction.onabort = () => { resolve() }
                            const objectStore = transaction.objectStore(name)
                            const req = objectStore.get(key)
                        })
                    }
                    this.delete = (key) => {
                        return new Promise((resolve) => {
                            let result
                            const transaction = db.transaction([name], "readwrite")
                            transaction.oncomplete = () => { resolve(result) }
                            transaction.onerror = () => { resolve() }
                            transaction.onabort = () => { resolve() }
                            const objectStore = transaction.objectStore(name)
                            const req = objectStore.delete(key)
                            req.onsuccess = () => { result = true }
                        })
                    }
                }
            })
        }
    }
}




