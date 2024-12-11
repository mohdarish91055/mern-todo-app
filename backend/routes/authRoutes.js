const express = require('express')
const router  = express.Router();
const {registerUser,loginUser,logoutUser} = require('../controllers/authController')

//new register user
router.post('/register',registerUser);

//login
router.post('/login',loginUser);

//logout
router.post('/logout',logoutUser);

module.exports = router;