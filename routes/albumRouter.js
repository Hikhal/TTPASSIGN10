const express = require('express');
const router = express.Router();

// the 'pool' used to interact with the db
const con = require('./dbCon');

router.post('/post', (req, res) => {
    const artist_id = req.body.artist_id;
    const title = req.body.title;
    const release_date = new Date(req.body.release_date);
    res.send("Values successfully received.");

    con.query('INSERT INTO Album (artist_id, title, release_date) VALUES ($1, $2, $3)', [artist_id, title, release_date], (error, result) => {
        if (error) {
            console.log("Not able to post values into table: " + error);
        } else {
            console.log("Values successfully inserted into table.");
        }
    });
});

router.get('/fetch', (req, res) => {
    con.query('SELECT * FROM Album', (error, result) => {
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
