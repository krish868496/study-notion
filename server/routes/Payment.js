const express = require('express');
const router = express.Router()

const {capturePayment, verifySignature} = require("../controllers/Payments")
const {isInstructor, isStudent, auth} = require("../middlewares/auth")

router.post("/capturepayment", capturePayment)
router.post("/verifysignature", verifySignature)

module.exports = router;

