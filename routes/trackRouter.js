const express = require('express');
const router = express.Router();

// the 'pool' used to interact with the db
const con = require('./dbCon');

router.post('/post', (req, res) => {
    const { album_id, artist_id, genre, duration, song_name } = req.body;

    if (!album_id || !artist_id || !genre || !duration || !song_name) {
        return res.status(400).send("Missing required field(s)");
    }

    con.query('INSERT INTO Track (album_id, artist_id, genre, duration, song_name ) VALUES ($1, $2, $3, $4, $5)', [album_id, artist_id, genre, duration, song_name], (error, result) => {
        if (error) {
            console.error("Not able to post values into table: " + error);
            return res.status(500).send("Error while inserting into table.");
        } else {
            console.log("Values successfully inserted into table.");
            return res.send("Values successfully received.");
        }
    });
});

router.get('/fetch', (req, res) => {
    con.query('SELECT * FROM Track', (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Database error");
        } else {
            let r = result.rows;
            if (r.length >= 2) {
                return res.send([r[r.length - 2], r[r.length - 1]]);
            } else {
                return res.send(r);
            }
        }
    });
});

module.exports = router;
