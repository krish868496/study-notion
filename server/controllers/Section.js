const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req, res) => {
        try {
                // data fetch  
                const { sectionName, courseId } = req.body;
                if (!sectionName || !courseId) {
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }
                const newSection = await Section.create({ sectionName })
                const updatedCourse = await Course.findByIdAndUpdate(courseId,
                        { $push: { courseContent: newSection._id } },
                        { new: true }
                );
                console.log(updatedCourse);

                // Now populate the `courseContent` field to get the full details
                const updatedCourseDetails = await Course.findById(courseId)
                        .populate('courseContent');

                console.log("Updated Course Details:", updatedCourseDetails);

                return res.status(200).json({
                        message: "section created successfully",
                        success: true,
                        response: updatedCourseDetails
                })
        } catch (error) {
                console.log(error.message)
                res.status(500).json({
                        message: error.message,
                        success: false
                })

        }

}




exports.updateSection = async (req, res) => {
        try {
                // data input 
                const { sectionName, sectionId, courseId } = req.body;
                // data validation 
                if (!sectionName || !sectionId || !courseId) {
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }
                // update data 
                const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
                const updatedCourse = await Course.findByIdAndUpdate(courseId,
                        { $pull: { courseContent: { _id: sectionId } } },
                        { new: true }
                        )
                const updatedCourseDetails = await Course.findById(courseId).populate('courseContent')
                return res.status(200).json({
                        message: "section updated successfully",
                        success: true,
                        response: updatedCourseDetails
                })

        } catch (error) {
                console.log(error.message)
                res.status(500).json({
                        message: error.message,
                        success: false
                })
        }
}


exports.deleteSection = async (req, res) => {
        try {
                // data input 
                const { sectionId, courseId } = req.body;
                // data validation 
                if (!sectionId || !courseId) {
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }
                // update data 
                const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } }, { new: true })
                const populatedCourseDetails = await Course.findById(courseId).populate("courseContent")
                

                return res.status(200).json({
                        message: "section deleted successfully",
                        success: true,
                        response: populatedCourseDetails
                })

        }
        catch (error) {
                console.log(error)
                res.status(500).json({
                        message: error.message,
                        success: false
                })
        }

}