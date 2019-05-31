const pool = require('./modules/pool.js')

pool.query('SELECT * FROM "shoes";').then(result => {
    console.log(result.rows)
}).catch(error => {
    console.log('Error making SELECT query',  error);
});
