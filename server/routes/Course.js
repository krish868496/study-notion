const express = require('express');
const router = express.Router()

const { createCourse, getCourseDetails } = require("../controllers/Course")
// category controller import 
const {  createCategory, showAllCategorys } = require("../controllers/Category")

// section controller import 
const { createSection, updateSection, deleteSection} = require("../controllers/Section")
// subsection controller import 
const {createSubSection, updateSubSection} = require("../controllers/SubSection")
// rating controller import 
// const {createRatingAndReview, getAllRating, getAverageRating} = require("../controllers/RatingAndReview")

// import middlewares 
const {auth, isInstructor, isAdmin, isStudent} = require("../middlewares/auth")

// // course can only be created by instructor 
router.post("/createCourse", auth, isInstructor, createCourse)
// // add section to a course
router.post("/addSection", auth, isInstructor, createSection)
// // update section to a course
// router.post("/updatesection", auth, isInstructor, updateSection)
// // delete section to a course
// router.post("/deletesection", auth, isInstructor, deleteSection)
// // update section to a course
// // router.post("/updatesubSection", auth, isInstructor, updaatesubSection)
// // router.post("/deletesubSection", auth, isInstructor, deletesubsection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
// router.get("/getallCourses", getAllCourses)
// router.get("/getCourseDetails", getCourseDetails)
// router.post("/verifysignature", verifySignature)






router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategorys)
// router.post("/getcategoryPageDetails", categoryPageDetails)

// // rating and review ********************************
// router.post("/createrating", auth, isStudent, createRatingAndReview)
// router.get("/getaverageRating", getAverageRating)
// router.post("/getReviews", getAllRating)

module.exports = router;

