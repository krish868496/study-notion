const express = require('express');
const router = express.Router()

const { deleteAccount,  getAllDetails, updateProfile, updateDisplayPicture, getEnrolledCourses } = require("../controllers/Profile")

const { auth } = require("../middlewares/auth");


// router for delete accounts 
router.delete('/deleteprofile', auth, deleteAccount)
// router for update profile details
router.put('/updateProfile', auth, updateProfile)
// router for update profile picture 
router.put('/updateDisplayPicture', auth, updateDisplayPicture)
// router for get user details
router.get('/getUserDetails', auth, getAllDetails)
// router for enroll courses 
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)


// export the router
module.exports = router