const Course = require("../models/Course")
// const Tag = require("../models/Tag")
const Category = require("../models/Category")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const User = require("../models/User")


exports.createCourse = async (req, res) => {
        try {
                // fetch data 
                const { courseName, courseDescription, whatYouWillLearn, price,
                        tag,
                        category,
                        instructions,
                        status
                } = req.body;
                // get thumbnail 

                const { thumbnailImage } = req.files;
                console.log(thumbnailImage, "Thumbnail");

                if (!courseName || !courseDescription || !whatYouWillLearn || !price
                        || !tag 
                        || !thumbnailImage
                        || !category
                        || !instructions
                ) {
                        return res.status(403).json({
                                message: "all fields are required",
                                success: false
                        })
                }

                if (!status || status === undefined) {
                        status = "Draft";
                }

                //check if user instructor is
                const userId = req.user.id;
                const instructorDetails = await User.findById(userId, {accountType: "Instructor"})
           

                if (!instructorDetails) {
                        return res.status(401).json({
                                message: "instructor detail not found",
                                success: false
                        })
                }

                // check given tag is valid or not 
                const checkCategory = await Category.findById(category)
                if (!checkCategory) {
                        return res.status(400).json({
                                message: "invalid tag",
                                success: false
                        })
                }


                // upload image to cloudinary 
                const thumbnailImages = await uploadImageToCloudinary(thumbnailImage, process.env.FOLDER_NAME,)
                console.log(thumbnailImages, "thumbnail images");
                const newCourse = await Course.create({
                        courseName, courseDescription, whatYouWillLearn, price, instructions, status:status,
                         tag, 
                        thumbnail: thumbnailImages.secure_url, 
                        instructor: instructorDetails._id, category: checkCategory._id
                })
                console.log(newCourse, "new course");

                const updatedUser = await User.findByIdAndUpdate({ _id: instructorDetails._id },
                        {
                                $push: {
                                        courses: newCourse._id
                                }
                        },
                        { new: true }
                )
                console.log(updatedUser, "updated user");

                return res.status(200).json({
                        message: "course created successfully",
                        success: true,
                        response: newCourse
                })


        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        message: error.message,
                        success: false
                })
        }
}
exports.editCourse = async (req, res) => {
        try {
                // fetch data 
                const { courseName, courseDescription, whatYouWillLearn, price,
                        tag,
                        category,
                        instructions,
                        status,
                        courseId
                } = req.body;
                // get thumbnail 

                const { thumbnail } = req.files;

                if (!courseName || !courseDescription || !whatYouWillLearn || !price
                        // || !tag 
                        || !thumbnail
                        // || !category
                        || !instructions
                        || !courseId
                ) {
                        return res.status(403).json({
                                message: "all fields are required",
                                success: false
                        })
                }

                if (!status || status === undefined) {
                        status = "Draft";
                }

                //check if user instructor is
                const userId = req.user.id;
                console.log(userId, "userid");
                const instructorDetails = await User.findById(userId, {accountType: "Instructor"})
                console.log(instructorDetails, "instructor");
           

                if (!instructorDetails) {
                        return res.status(401).json({
                                message: "instructor detail not found",
                                success: false
                        })
                }

                // check given tag is valid or not 
                const checkCategory = await Category.findById(category)
                if (!checkCategory) {
                        return res.status(400).json({
                                message: "invalid category",
                                success: false
                        })
                }


                // upload image to cloudinary 
                const thumbnailImages = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME,)
                const newCourse = await Course.findByIdAndUpdate(courseId ,{
                        courseName, courseDescription, whatYouWillLearn, price, instructions, status:status,
                         tag, 
                        thumbnail: thumbnailImages.secure_url, 
                        instructor: instructorDetails._id, category: checkCategory._id
                }, { new: true })
                console.log("editCourseDetails", newCourse);

                const updatedUser = await User.findByIdAndUpdate({ _id: instructorDetails._id },
                        {
                                $push: {
                                        courses: newCourse._id
                                }
                        },
                        { new: true }
                )
                console.log(updatedUser, "updated user");

                return res.status(200).json({
                        message: "course created successfully",
                        success: true,
                        response: newCourse
                })


        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        message: error.message,
                        success: false
                })
        }
}



exports.showAllCourses = async (req, res) => {
        try {
                const allCourses = await Course.find({}).populate("instructor").exec()
                return res.status(200).json({
                        message: "all courses",
                        success: true,
                        response: allCourses
                })

        } catch (error) {
                console.log(error)
                return res.status(500).json({ message: error.message, success: false });
        }
}



// get course details 
exports.getCourseDetails = async (req, res) => {
        try {
                // get course id 
                const { courseId } = req.body;
                // find course details 
                const courseDetails = await Course.findById(courseId).populate({
                        path: "instructor",
                        populate: {
                                path: "additionalDetails",
                        }
                }).populate("category")
                        .populate("ratingAndReviews")
                        .populate({
                                path: "courseContent",
                                populate: ({
                                        path: "subSection"
                                })
                        }).exec()

                if (!courseDetails) {
                        return res.status(400).json({
                                message: `could not find course details ${courseId}`,
                                success: false,
                        })
                }

                return res.status(200).json({
                        message: "course details",
                        success: true,
                        response: courseDetails
                })

        } catch (error) {
                console.log(error)
                return res.status(500).json({ message: error.message, success: false });

        }
}