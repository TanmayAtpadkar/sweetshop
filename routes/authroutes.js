const authcontroller = require('../controllers/authcontroller');
const express = require('express');
const router = express.Router();

router.post('/register',authcontroller.register);
router.post('/login',authcontroller.passlogin);
router.post('/pin',authcontroller.pinlogin);


module.exports = router;