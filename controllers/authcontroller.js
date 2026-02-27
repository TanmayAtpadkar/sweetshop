const authservice = require('../services/authservice');
const usermodel = require('../models/usermodel');

async function register(req, res) {

  try {
    const { username, email, password, pin } = req.body;
    const ifuserexist = await usermodel.finduserbyemail(email);
    if (ifuserexist) {
      return res.status(400).json({ message: 'Email already Exists' });
    } else {
      const passhash = await authservice.hashpassword(password);
      const pinhash = await authservice.hashpin(pin);
      const createuser = await usermodel.createuser({ username, email, passhash, pinhash });
      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

};


module.exports = {
  register
}