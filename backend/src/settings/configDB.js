const { Pool } = require('pg');
require('dotenv').config()
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} = require('./settings')

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl: false
});

module.exports = {pool};