const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
        courseName: {
                type: String,
                required: true,
                trim: true
        },
        courseDescription: {
                type: String,
        },
        instructor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
        },
        whatYouWillLearn: {
                type: String
        },
        courseContent: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Section"
                }
        ],
        ratingAndReview: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "RatingAndReview"
                }
        ],
        price: {
                type: Number
        },
        thumbnail: {
                type: String,
        },
        tag: {
                type: [String],
                required: true 
        },
        category:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true
        },
        studentEnrolled: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: "User"
                }
        ],
        instructions:{
                type: [String]
        },
        status:{
                type: String,
                enum: ["Draft", "Published"]
        }
})

module.exports = mongoose.model("Course", courseSchema)