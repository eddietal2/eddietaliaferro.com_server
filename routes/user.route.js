const express = require("express");
const router  = express.Router();
var userController = require('../controller/user-controller')

router.post('/register-user', userController.registerUser)
router.post('/login-user', userController.loginUser)
router.post('/register-user-admin', userController.registerAdmin)
router.post('/login-user-admin', userController.loginAdmin)

module.exports = router;