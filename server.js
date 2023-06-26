const express = require('express')
const {Pool} = require('pg')

const app = express()
app.use(express.json()) // middleware used to parse incoming requests with JSON payloads.


// Connecting to database 

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'ttpartist',
    user: "hamzakhaliq",
    password: ""
})

// testing database connection --> should display artist table as an object.
pool.query("SELECT * FROM Artist", (error, res)=>{
    try {
        console.log(res.rows)
        
    } catch (error) {
        console.log(error)
    }
})