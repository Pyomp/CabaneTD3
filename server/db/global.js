
import sqlite3 from 'sqlite3'
import path from 'path'
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
process.chdir(__dirname)

export const db = new sqlite3.Database('./main.db')