


/*****************/
/* ERROR HANDLER */
/*****************/
export class ErrorNetwork {
    constructor(message, cb) {
        this.message = message
        this.date = new Date().toISOString()
        this.stack = new Error().stack.split('\n', 3)[2]
        this.cb = cb
    }
}

const date = new Date()

const db = new sqlite3.Database(`errorReport/error_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.db`)

let prepareErrorInsert
db.run(`CREATE TABLE error (
	"date" TEXT,
    "pseudo" TEXT,
	"ip" TEXT,
    "userAgent" TEXT,
    "language" TEXT,
    "host" TEXT,
    "origin" TEXT,
    "error" TEXT,
    "command" TEXT,
    "message" TEXT,
	PRIMARY KEY(date, pseudo)
)`, () => {
    prepareErrorInsert = db.prepare(`INSERT INTO error VALUES (?,?,?,?,?,?,?,?,?,?)`)
})

const handleError = (error, c, cmd, data) => {
    if (error.cb) error.cb()

    const date = error.date || new Date().toISOString()

    if (isDev) {
        console.log(`
        ${error.stack || '*** Info ***'}
${date} | ${c.player ? c.player.pseudo : 'unknown'} 
${error.message || error} | ${cmd} | ${data}`)
    }

    prepareErrorInsert.run([
        date,
        c.player ? c.player.pseudo : 'unknown',
        c.ip,
        c.headers['user-agent'],
        c.headers['accept-language'],
        c.headers['host'],
        c.headers['origin'],
        error.message || error,
        cmd,
        data
    ], (err) => { if (err !== null) console.log(err) })
}