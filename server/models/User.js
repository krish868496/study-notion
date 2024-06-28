const mongoose = require('mongoose');

// trim is use to remove white spaces from the string 

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
                trim: true
        },
        lastName: {
                type: String,
                required: true,
                trim: true
        },
        email: {
                type: String,
                required: true,
                trim: true
        },
        password: {
                type: String,
                required: true,
                trim: true
        },
        accountType: {
                type: String,
                // The enum ensures that the 'role' field is restricted to these predefined values, enhancing data consistency and integrity 
                enum:["Admin", "Student", "Instructor"],
                required: true
        },
        additionalDetails: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Profile",
        },
        courses: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Course"
                }
        ],
        image: {
                type: String,
                required: true
        }, 
        token:{
                type: String,
        },
        resetPasswordExpires:{
                type: Date,
        },
        courseProgress: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "CourseProgress"
                }
        ]
})

module.exports = mongoose.model('User', userSchema)