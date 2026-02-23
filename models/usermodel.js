const pool = require('../config/db.js');


async function findusers() {
  const [result] = await pool.query('SELECT * FROM users');
  return result;
}


