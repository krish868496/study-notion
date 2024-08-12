const express = require('express');
const router = express.Router()

const { createCourse, editCourse, getCourseDetails, showAllCourses, getAllInstructorCourses } = require("../controllers/Course")
// category controller import 
const {  createCategory, showAllCategorys, categoryPageDetails } = require("../controllers/Category")

// section controller import 
const { createSection, updateSection, deleteSection} = require("../controllers/Section")
// subsection controller import 
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection")
// rating controller import 
// const {createRatingAndReview, getAllRating, getAverageRating} = require("../controllers/RatingAndReview")

// import middlewares 
const {auth, isInstructor, isAdmin, isStudent} = require("../middlewares/auth")

// // course can only be created by instructor 
router.post("/createCourse", auth, isInstructor, createCourse)
// edit course only be created by instructor
router.put("/editCourse", auth, isInstructor, editCourse)
// // add section to a course
router.post("/createSection", auth, isInstructor, createSection)
// // update section to a course
router.put("/updateSection", auth, isInstructor, updateSection)
// // delete section to a course
router.delete("/deleteSection", auth, isInstructor, deleteSection)
// // update section to a course
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get("/getallCourses", showAllCourses)
// course for all instructor 
router.post(
  "/getInstructorCourses",
  auth,
  isInstructor,
  getAllInstructorCourses
);
// getFull Course details 
router.get(
  "/getFullCourseDetails/:courseId",
  auth,
  isInstructor,
  getCourseDetails
);
// router.get("/getCourseDetails", getCourseDetails)
// router.post("/verifysignature", verifySignature)






router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategorys)
router.post("/getCategoryPageDetails", categoryPageDetails);

// // rating and review ********************************
// router.post("/createrating", auth, isStudent, createRatingAndReview)
// router.get("/getaverageRating", getAverageRating)
// router.post("/getReviews", getAllRating)

module.exports = router;

