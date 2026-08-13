import { Command } from "./console.js"






export const info = {
    connection_number: 0
}



new Command('info', () => {
    console.log(info)
}, 'general server info')





