const express = require('express');
const router = express.Router()

const {capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payments")
const {isInstructor, isStudent, auth} = require("../middlewares/auth")

router.post("/capturepayment", capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;

