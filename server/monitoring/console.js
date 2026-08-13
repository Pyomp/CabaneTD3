
import { cpuUsage } from './osutils.js'
import os from 'os'

let help = ''
const dispatcher = { 'help': () => { console.log(help) } }

export class Command {
    constructor(command, callback, info, args = []) {
        help += `${command}`
        for (const arg of args) help += ' <' + arg + '>'
        help += `\n\t${info}`

        dispatcher[command] = callback
    }
}

new Command('clear', () => { console.clear() }, 'clear console')
new Command('osInfo', () => {
    cpuUsage((v) => { console.log(`CPU Usage ${v.toFixed(1)}%`) })
    console.log(`Memory usage: ${(1 - os.freemem() / os.totalmem()) * 100}%`)
    console.log(`System uptime: ${os.uptime()}s`)
    console.log(`System uptime: ${process.uptime()}s`)
}, 'general informations')

const stdin = process.openStdin()
stdin.on('data', async (str) => {
    const split = str.toString().replace(/[\n\r]/g, '').split(' ')
    const cmd = split[0]
    const args = split.slice(1)

    if (dispatcher[cmd])
        try {
            await dispatcher[cmd](...args)
        } catch (e) {
            console.warn(e)
        }
    else
        console.warn(`cmd unknown: ${cmd}`)
})
