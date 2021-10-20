const express = require("express");
const router  = express.Router();
var userController = require('../controller/user-controller')

router.post('/register-user', userController.registerUser)
router.post('/register-user-admin', userController.registerAdmin)

router.post('/login-user', userController.loginUser)
router.post('/login-user-admin', userController.loginAdmin)

router.post('/forgot-password-user', userController.forgotPasswordUser)
router.post('/forgot-password-code', userController.forgotPasswordCode)
router.post('/change-password-user', userController.changePasswordUser)
router.post('/update-profile-user', userController.updateUserProfile)
router.post('/check-email', userController.checkIfEmailExists)

module.exports = router;