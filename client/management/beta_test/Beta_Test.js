import { Event_Dispatcher } from '../../../utils/Event_Dispatcher.js'
import { IndexedDB_Interface } from "./IndexedDB_Interface.js"

export class Beta_Test extends Event_Dispatcher {
    constructor() {

        super()
        /** @type {function('stop' | 'start', ()=>{})} */ this.addEventListener

        const indexedDB_interface = new IndexedDB_Interface('beta', 'beta', ['data'])

        const init_db = async () => {
            // init db
            await indexedDB_interface.init()
            return indexedDB_interface
            // // example of adding data
            // await db.add({ name: 'video', blob: new Blob(['y', 'e', 'p']) })



            // // example of getting data
            // let data = await db.get('video')
            // console.log(data)

            // // handle if no data
            // if (data) {
            //     console.log('blob text is: ' + await data.blob.text())
            // } else {
            //     // data = await fetch('./binary51') or default data or what you want
            // }

            // await db.delete('video')
            // console.log(await db.get('video'))
        }

        const init_console_record = (db) => {
            let console_record = ''
            const console_surclass = (prop) => {
                const initial = console[prop]
                const beta = (...data) => {
                    initial(...data)
                    const date = new Date()
                    console_record += data.map(a => `${date.toUTCString()}: ${a}`).join('\n')
                    console_record += '\n'
                    db.put({ 'beta': 'console', 'data': console_record })
                }
                return { initial, beta }
            }
            const warn = console_surclass('warn')
            const error = console_surclass('error')
            const log = console_surclass('log')

            const start_log = () => {
                console_record = ''
                console.log = log.beta
                console.warn = warn.beta
                console.error = error.beta
            }

            const stop_log = () => {
                console.log = log.initial
                console.warn = warn.initial
                console.error = error.initial
            }

            return {
                start_log: start_log,
                stop_log: stop_log
            }
        }
        let db
        this.beta_download_video = async () => {
            if (db === undefined) return
            const data = await db.get('video')
            // handle if no data
            if (data?.['data']?.constructor !== Blob) {
                return
            }
            const blob = data['data']
            const url = URL.createObjectURL(blob)
            // window.open(url)
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = url
            a.download = "test.webm"
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        }

        this.beta_download_log = async () => {
            if (db === undefined) return
            const data = await db.get('console')
            // handle if no data
            if (data?.['data']?.constructor !== String) {
                return
            }

            const blob = new Blob([data['data']], {
                type: 'text/plain'
            })

            const url = URL.createObjectURL(blob)
            // window.open(url)
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = url
            a.download = "log.txt"
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        }

        this.init = async () => {
            db = await init_db()

            const { start_log, stop_log } = init_console_record(db)

            const options_stream = {
                audio: false,
                video: {
                    cursor: "always",
                    frameRate: { ideal: 10 },
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                }
            }

            const options = {
                audioBitsPerSecond: 0,
                videoBitsPerSecond: 1500000,
                mimeType: 'video/webm'
            }

            const dt = 1000
            const max_video_time_s = 5 * 60

            const max_video_time_ms = 1000 * max_video_time_s
            let state = 0
            let recorder_1_needs_save = true
            let recorder_2_needs_save = false
            const dispatcher = [
                () => {
                    recorder_2.start(dt)
                },
                () => {
                    recorder_2_needs_save = true
                    recorder_1_needs_save = false
                    recorder_1.stop()
                },
                () => {
                    recorder_1.start(dt)
                },
                () => {
                    recorder_1_needs_save = true
                    recorder_2_needs_save = false
                    recorder_2.stop()
                },
            ]

            const state_lenght = dispatcher.length
            let timeout, interval
            let stream, recorder_1, recorder_2

            this.start = () => new Promise(async (resolve) => {
                try {
                    stream = await navigator.mediaDevices.getDisplayMedia(options_stream)
                    recorder_1 = new MediaRecorder(stream, options)
                    recorder_2 = new MediaRecorder(stream, options)
                    recorder_1.onstop = recorder_1_onstop
                    recorder_2.onstop = recorder_2_onstop
                    recorder_1.ondataavailable = recorder_1_ondataavailable
                    recorder_2.ondataavailable = recorder_2_ondataavailable
                    start_log()

                    recorder_1.start(dt)
                    timeout = setTimeout(() => {
                        interval = setInterval(() => {
                            dispatcher[state]()
                            state++
                            if (state >= state_lenght) state = 0
                        }, max_video_time_ms / 2)
                    }, max_video_time_ms / 2)
                    setTimeout(() => {
                        resolve(true)
                        this.is_running = true
                        this.emit('start')
                    }, 1000)
                } catch { resolve(false) }
            })

            this.stop = () => new Promise((resolve) => {

                stream.getTracks().forEach(function (track) {
                    track.stop()
                })
                stop_log()

                clearTimeout(timeout)
                clearInterval(interval)
                try { recorder_1.stop() } catch { }
                try { recorder_2.stop() } catch { }
                recorder_1_needs_save = true
                recorder_2_needs_save = false
                setTimeout(() => {
                    resolve()
                    this.is_running = false
                    this.emit('stop')
                }, 1000)
            })

            const chunks_1 = []
            const recorder_1_onstop = (e) => {
                chunks_1.push(e.data)
                const blob = new Blob(chunks_1, { type: "video/webm" })
                db.put({ 'beta': 'video', 'data': blob })
                chunks_1.length = 0
            }
            const recorder_1_ondataavailable = (e) => {
                chunks_1.push(e.data)
                if (recorder_1_needs_save === true) {
                    const blob = new Blob(chunks_1, { type: "video/webm" })
                    db.put({ 'beta': 'video', 'data': blob })
                    console.log(blob.size)
                }
            }

            const chunks_2 = []
            const recorder_2_onstop = (e) => {
                chunks_2.push(e.data)
                const blob = new Blob(chunks_2, { type: "video/webm" })
                db.put({ 'beta': 'video', 'data': blob })
                chunks_2.length = 0
            }
            const recorder_2_ondataavailable = (e) => {
                chunks_2.push(e.data)
                if (recorder_2_needs_save === true) {
                    const blob = new Blob(chunks_2, { type: "video/webm" })
                    db.put({ 'beta': 'video', 'data': blob })
                    console.log(blob.size)
                }
            }
        }
    }
}














