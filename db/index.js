import pg from 'pg';
const { Pool } = pg;

console.log(process.env.PGURI)

const pool = new Pool({ connectionString: process.env.PGURI });
// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// })
const db = {
  query(text, params) {
    return pool.query(text, params);
  }
};

export default db;
