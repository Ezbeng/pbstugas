const mysql = require('mysql')

const db = mysql.createConnection ({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6701162',
    password: 'DjMT2nqwpy',
    database: 'db_kelontong'
})

module.exports = db