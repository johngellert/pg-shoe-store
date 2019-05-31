const express = require('express');
const app = express();
const PORT = 5000;

const bodyParser = require('body-parser'); // needed to handle data from client
app.use(bodyParser.urlencoded({extended: true})); // need to handle data from client



app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});




const pool = require('./modules/pool.js')

app.use(express.static('server/public')); // imports static files from public folder

app.get('/shoes', (req, res) => {
    pool.query('SELECT * FROM "shoes" ORDER BY "id";')
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500)
        console.log('Error making SELECT query', error);
    });

});

// app.put('/shoes/:id', (req, res) => { 

app.put('/shoes', (req, res) => {
    pool.query('UPDATE "shoes" SET "cost"=$2 WHERE "id"=$1;', [req.body.theShoeID, req.body.theNewPrice])
    .then((result) => {
        res.send(200);
    }).catch((error) => {
        res.sendStatus(500)
        console.log('Error making PUT query', error);
    });
});
