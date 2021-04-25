const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'gordongest',
});

module.exports = {
  test(req, res) {
    console.log('ding');
    res.send("i'm awake");
  },

  async getPosts(req, res) {
    const { rows } = await pool.query(`
      SELECT *
      FROM posts;
    `);

    res.send(`
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>lng</th>
            <th>lat</th>
            <th>loc x</th>
            <th>loc y</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((row) => {
              console.log(row);
              return `
                <tr>
                  <td>${row.id}</td>
                  <td>${row.lng}</td>
                  <td>${row.lat}</td>
                </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
      <form method="POST">
          <h3>Create Post</h3>
          <div>
            <label htmlFor="lng">lng</label>
            <input name="lng" type="text"/>
          </div>
          <div>
            <label htmlFor="lat">lat</label>
            <input name="lat" type="text"/>
          </div>
          <button type="submit">Create</button>
      </form>
    `);
  },

  async addPost(req, res) {
    const { lat, lng } = req.body;

    console.log(lat, lng);

    await pool.query(
      `
      INSERT INTO posts (lng, lat, loc)
      VALUES ($1, $2, $3);`,
      [lng, lat, `${lng}, ${lat}`]
    );

    res.redirect('/posts');
  },
};
