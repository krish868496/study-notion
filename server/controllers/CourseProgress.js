const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");

exports.courseProgress = async (req, res) => {
  try {
    const { subSectionId, courseId } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!subSectionId || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify user and course exist
    const userDetails = await User.findById(userId);
    const courseDetails = await Course.findById(courseId);

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!courseDetails) {
      return res
        .status(404)
        .json({ message: "Course not found", success: false });
    }

    // Find or create course progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        userId,
        courseId,
        completedVideos: [subSectionId],
      });
    } else {
      // Optionally, prevent duplicate entries
      if (!courseProgress.completedVideos.includes(subSectionId)) {
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();
      }
    }

    // Optionally, return the updated progress
    return res.status(200).json({
      message: "Course progress updated",
      courseProgress,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
