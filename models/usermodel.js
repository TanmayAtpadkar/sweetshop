const pool = require('../config/db.js');

// Find users by Email
async function finduserbyemail(email) {
  const [result] = await pool.query(`SELECT * FROM users WHERE email = ? and active = 'y';`, [email]);
  return result.length ? result[0] : null;
}

// Create users
async function createuser(userdata) {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, passhash, pinhash) VALUES (?, ?, ?, ?)',
      [userdata.username, userdata.email, userdata.passhash, userdata.pinhash]
    );
    if (result.affectedRows === 0) {
      throw new Error('User was not created');
    } else {
      return result;
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already Registered');
    }
    throw error;
  }
}

//Last Login
async function updatelastlogin(email) {
  const [result] = await pool.query(
    'UPDATE users SET lastlogin = NOW() WHERE email = ?', [email]
  );
  return result;
}


//Last Full login
async function updatelastfulllogin(email) {
  const [result] = await pool.query(
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