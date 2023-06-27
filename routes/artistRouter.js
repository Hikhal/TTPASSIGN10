const express = require('express');
const router = express.Router();

// the 'pool' used to interact with the db
const con = require('./dbCon');

router.post('/post', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const label_id = req.body.label_id;
    res.send("Values successfully received.");

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

    con.query('INSERT INTO Artist (name, email, label_id) VALUES ($1, $2, $3)', [name, email, label_id], (error, result) => {
        if (error) {
            console.log("Not able to post values into table: " + error);
        } else {
            console.log("Values successfully inserted into table.");
        }
    });
});

router.get('/fetch', (req, res) => {
    con.query('SELECT * FROM Artist', (error, result) => {
        if (error) {
            console.log(error);
            res.send("Database error");
        } else {
            let r = result.rows;
            if (r.length >= 2) {
                res.send([r[r.length - 2], r[r.length - 1]]);
            } else {
                res.send(r);
            }
        }
    });
});

module.exports = router;
