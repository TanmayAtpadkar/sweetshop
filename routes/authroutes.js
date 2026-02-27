const authcontroller = require('../controllers/authcontroller');
const express = require('express');
const router = express.Router();

router.post('/register',authcontroller.register);


module.exports = router;