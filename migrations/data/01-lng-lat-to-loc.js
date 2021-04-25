const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'gordongest',
});

pool
  .query(
    `
      UPDATE posts
      SET loc = POINT(lng, lat)
      WHERE loc IS NULL;
    `
  )
  .then(() => {
    console.log('Records updated');
    pool.end();
  })
  .catch((err) => {
    console.error(err.message);
  });
