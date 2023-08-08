const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../middleware/auth')
const { userSignup, userLogin, userLogout } = require("../controllers/user")


router.route('/signup').post(userSignup);
router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);


module.exports = router;