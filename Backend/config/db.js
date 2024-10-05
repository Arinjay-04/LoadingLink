const pg = require('pg');

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Mini Project",
    password: "Arinjay04",
    port: 5432 
});

db.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error', err.stack));

module.exports = db;
