const authservice = require('../services/authservice');
const usermodel = require('../models/usermodel');

// Register
async function register(req, res) {
  try {
    const { username, email, password, pin } = req.body;

    // Check if user already exists
    const ifuserexist = await usermodel.finduserbyemail(email);
    if (ifuserexist) {
      return res.status(400).json({ message: 'Email already Exists' });
    }

    // Hash password and pin
    const passhash = await authservice.hashpassword(password);
    const pinhash = await authservice.hashpin(pin);

    // Save user to DB
    await usermodel.createuser({ username, email, passhash, pinhash });
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Full Login
async function passlogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists and is active
    const ifuserexist = await usermodel.finduserbyemail(email);
    if (!ifuserexist) {
      return res.status(400).json({ message: 'Email does not Exist, Please Register' });
    }

    // Compare incoming password with stored hash
    const comparepass = await authservice.comparepassword(password, ifuserexist.passhash);
    if (!comparepass) {
      return res.status(400).json({ message: 'Wrong Password, Please enter correct password' });
    }

    // Generate JWT and set cookie
    const token = authservice.generatetoken({
      email: ifuserexist.email,
      username: ifuserexist.username,
      role: ifuserexist.role
    });
    res.cookie('logintoken', token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });

    // Update login timestamps
    await usermodel.updatelastfulllogin(email);
    await usermodel.updatelastlogin(email);

    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


async function pinlogin(req, res) {
  try {
    const { pin } = req.body;

    // Extract token from cookie
    const token = req.cookies.logintoken;

    // Verify token
    const decoded = authservice.verifytoken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Session expired, please login again' });
    }

    // Extract email from decoded token
    const email = decoded.email;

    // Find user in DB
    const user = await usermodel.finduserbyemail(email);
    if (!user) {
      return res.status(401).json({ message: 'User not found, please login again' });
    }

    // Check if lastfulllogin is within 1 days
    const now = Date.now();
    const lastfull = new Date(user.lastfulllogin).getTime();
    const difference = now - lastfull;
    const oneday = 1 * 24 * 60 * 60 * 1000;

    if (difference > oneday) {
      return res.status(401).json({ message: 'Session expired, please do full login' });
    }

    // Compare PIN
    const pincompare = await authservice.comparethepin(pin, user.pinhash);
    if (!pincompare) {
      return res.status(401).json({ message: 'Wrong pin, please enter correct pin' });
    }

    // Generate new token and set cookie
    const newtoken = authservice.generatetoken({
      email: user.email,
      username: user.username,
      role: user.role
    });
    res.cookie('logintoken', newtoken, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });

    // Update lastlogin only
    await usermodel.updatelastlogin(email);

    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = {
  register,
  passlogin,
  pinlogin
}