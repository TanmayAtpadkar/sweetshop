require('dotenv').config();
const mysql2 = require('mysql2/promise');


const pool = mysql2.createPool({
  host : process.env.DBHOST,
  user : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBNAME
})


module.exports = pool;