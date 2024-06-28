const express = require('express');
const router = express.Router()

const {login, signUp, sendOTP} = require("../controllers/Auth")
const {resetPassword, resetPasswordToken} = require("../controllers/ResetPassword")

const {auth} = require("../middlewares/auth")


// router for user login 
router.post('/login', login)
// router for user sign up 
router.post('/signup', signUp)
// router for send otp
router.post('/sendotp', sendOTP)
// router for changing the password
// router.post('/changepassword', auth, changePassword) 

// router for generating reset password 
router.post("/reset-password-token", resetPasswordToken)

// router for resetting password after verification
router.post("/reset-password", resetPassword)

// export the router
module.exports = router