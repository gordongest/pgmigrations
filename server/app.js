const express = require('express');
const pg = require('pg');
const routes = require('./routes')

const app = express();
const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'gordongest',
});

app.use(express.urlencoded({ extended: true }));

routes(app);

// pool.query(`SELECT 1 + 1 AS sum;`).then((res) => console.log(res));

module.exports = app;
