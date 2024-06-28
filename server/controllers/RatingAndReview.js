const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReviews");
const { default: mongoose } = require("mongoose");

exports.createRatingAndReview = async (req, res) => {
        try {
                // get rating and review from req.body 
                const { rating, review, courseId } = req.body;
                // get user id 
                const userId = req.user.id;
                // check if user is enrolled or not 
                // const courseDetails = await Course.findById(courseId);
                // if (!courseDetails) {
                //         return res.status(400).json({ message: "course not found", success: false });
                // }
                // const isEnrolled = courseDetails.studentEnrolled.includes(userId);
                // another way 
                const courseDetails = await Course.findByOne({_id:courseId,
                        studentEnrolled: {$eleMatch: {$eq: userId}},

                });
                if (!courseDetails) {
                        return res.status(400).json({ message: "you are not enrolled in this course", success: false });
                }

                // check if user already reviewd the course 
                const alreadyReviewed = await RatingAndReview.findOne({ course: courseId, user: userId });
                if (alreadyReviewed) {
                        return res.status(400).json({ message: "you have already reviewed this course", success: false });
                }


                // create Rating and review
                const ratingAndReviewData = await RatingAndReview.create({ rating, review, course: courseId, user: userId });
                console.log(ratingAndReviewData);
                
                // find course and update rating and review
               const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId }, { $push: { ratingAndReview: ratingAndReviewData.id } }, { new: true })
               console.log(updatedCourseDetails);
                return res.status(200).json({ message: "rating and review created successfully", success: true, ratingAndReviewData });

        } catch (error) {
                return res.status(500).json({ message: error.message, success: false });
        }
}



exports.getAverageRating = async (req, res) => {
        try {
                // get id 
                const {courseId } = req.body;
                // calculate avg rating 
                const result = await RatingAndReviews.aggregate([{$match:{
                        course: new mongoose.Schema.Types.ObjectId(courseId)
                }
        },
        {$group:{
                
         _id:"$course",
         avgRating:{$avg:"$rating"}
        }}
        ])

        // return rating 
        if(result.length > 0) {
                return res.status(200).json({
                        success: true,
                        avgRating: result[0].avgRating
                })
        }         
        // if there is no rating        
        return res.status({
                success: true,
                message: "Average rating is 0, no rating is available ",
                avgRating: 0
        })
        } catch (error) {
                return res.status({
                        message: error.message,
                        success: false
                })
        }
}


// get all rating and review 
exports.getAllRating = async (req, res) => {
        try {
                const alReviews = await RatingAndReviews.find({})
                // sort in descending order 
                .sort({rating: "desc"})
                .populate({
                        path: "user",
                        select: "first last email image"
                })
                .populate({
                        path: "course",
                        select: "courseName"
                })
                .exec()

                return res.status(200).json({
                        message: "all rating and review",
                        success: true,
                        response: alReviews
                })


        } catch (error) {
                return res.status({
                        message: error.message,
                        success: false
                })
        }
}