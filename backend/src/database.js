const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost', 
    database: 'LilProject2', 
    password: 'hrdalr5f', 
    user: 'postgres', 
    port: 5432
})

module.exports = pool