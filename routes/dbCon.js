const {Pool} = require('pg')
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'hamzakhaliq',
    password: ''
})
/**
 * exports a query function that executes a query on the database. 
 * It takes the same parameters as pool.query: a SQL text string, an array of parameters, and a callback function
 * to handle the result.
 */
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
}