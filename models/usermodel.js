const pool = require('../config/db.js');

// Find users by Email
async function finduserbyemail(email){
  const [result]= await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return result[0];
}

// Create users
async function createuser(userdata) {
  const [result] = await pool.query(
    'INSERT INTO users (userid, username, role, email, passhash, pinhash) VALUES (?, ?, ?, ?, ?, ?)',
    [userdata.userid, userdata.username, userdata.role, userdata.email, userdata.passhash, userdata.pinhash]
  );
  return result;
}

//Last Login
async function updatelastlogin(email){
  const [ result ] = await pool.query(
    'UPDATE users SET lastlogin = NOW() WHERE email = ?', [email]
  );
  return result;
}


//Last Full login
async function updatelastfulllogin(email){
  const [ result ] = await pool.query(
    'UPDATE users SET lastfulllogin = NOW() WHERE email = ?', [email]
  );
  return result;
}

module.exports = {
  finduserbyemail,
  createuser,
  updatelastlogin,
  updatelastfulllogin
}