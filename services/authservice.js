const bcrypt = require('bcrypt');

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

module.exports = {
  hashpassword,
  hashpin,
  comparepassword,
  comparethepin
}