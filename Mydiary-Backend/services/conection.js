require('dotenv').config()
const mysql = require('mysql')
const db_key = process.env.DATABASE_PASS
const conection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: db_key,
    database: 'mydiary'
});
module.exports = conection;