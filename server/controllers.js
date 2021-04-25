const { Pool } = require('pg');

const dbConfig = { connectionString: process.env.DATABASE_URL }

const pool = new Pool(dbConfig);

module.exports = {
  test(req, res) {
    console.log('ding');
    res.send("i'm awake");
  },

  async getPosts(req, res) {
    const { rows } = await pool.query(`
      SELECT *
      FROM posts
      ORDER BY id;
    `);

    res.send(`
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>lat</th>
            <th>lng</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((row) => {
              console.log(row);
              return `
                <tr>
                  <td>${row.id}</td>
                  <td>${row.loc.y}</td>
                  <td>${row.loc.x}</td>
                </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
      <form method="POST">
          <h3>Create Post</h3>
          <div>
            <label htmlFor="lat">lat</label>
            <input name="lat" type="text"/>
          </div>
          <div>
            <label htmlFor="lng">lng</label>
            <input name="lng" type="text"/>
          </div>
          <button type="submit">Create</button>
      </form>
    `);
  },

  async addPost(req, res) {
    const { lat, lng } = req.body;

    await pool.query(
      `
      INSERT INTO posts (loc)
      VALUES ($1);`,
      [`${lng}, ${lat}`]
    );

    res.redirect('/posts');
  },
};