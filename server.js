const express = require('express')
const {Pool} = require('pg')

const app = express()
// middleware used to parse incoming requests with JSON payloads.
app.use(express.json()) 

// Connecting to database 
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'ttpartist',
    user: "hamzakhaliq",
    password: ""
})


// getting info from postman in a JSON object,, parsing it and inserting it into Artist Table.
app.post('/post', (req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const label_id = req.body.label_id

    // testing if the info is propery being parsed or not
    // console.log(name + " " + email + " " + label_id)
    res.send("values successfully recieved.")



    // code that will post data into Artists table
    /*
   Inserting a row into the "Artist" table
   This statement inserts a new row of data into the "Artist" table. The specified column names and corresponding values are provided.
   - INSERT INTO Artist:
     Specifies the table name "Artist" where the data will be inserted.
   - (name, email, label_id):
     The column names in the "Artist" table where the corresponding values will be inserted.
   - VALUES ($1, $2, $3):
     Specifies the values to be inserted into the columns. The values are represented as placeholders ($1, $2, $3) to be replaced with the actual values in the corresponding order.
   - $1, $2, $3:
     Placeholders for the actual values that will be inserted into the table. The numbers after the $ symbol represent the parameter index/order.
    */

    pool.query('INSERT INTO Artist (name, email, label_id) VALUES ($1, $2, $3)', [name, email, label_id], (error, res) => {
        if (error) {
            console.log("Not able to post values into table: " + error);
        } else {
            console.log("Values successfully inserted into table.");
        }

    });

    pool.query("SELECT * FROM Artist", (error, res)=>{
        try {
            console.log(res.rows)
            
        } catch (error) {
            console.log(error)
        }
    })
})

app.listen(3000, (error) => {
    // Start the server on port 3000
    // The callback function will be executed once the server is up and running
    if (error) {
      // If an error occurs while starting the server, it will be captured in the 'error' parameter
      console.log("Error while starting the server:", error);
    } else {
      // If no error occurred, the server is running successfully
      console.log("Server started on port 3000");
    }
  });
  