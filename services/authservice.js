require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// hash password
async function hashpassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

// hash pin
async function hashpin(pin) {
  const hash = await bcrypt.hash(pin, 10);
  return hash;
}

// compare password
async function comparepassword(password, hash){
  const comparepass = await bcrypt.compare(password, hash);
  return comparepass;
}

// compare pin
async function comparethepin(pin, hash){
  const comparepin = await bcrypt.compare(pin, hash);
  return comparepin;
}

// Generate JWT token
function generatetoken(userdata){
  const payload = {
    email : userdata.email,
    username : userdata.username,
    role : userdata.role
  };

  const token = jwt.sign(payload,process.env.JWTSECRET,{ expiresIn : process.env.JWTEXPIRESIN });

  return token;
};

function verifytoken(token){
  try {
    const decoded = jwt.verify(token,process.env.JWTSECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}


module.exports = {
  hashpassword,
  hashpin,
  comparepassword,
  comparethepin,
  generatetoken,
  verifytoken
}