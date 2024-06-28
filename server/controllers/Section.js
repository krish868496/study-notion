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
                console.log(newSection, "section created");
                const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, { $push: { courseContent: newSection._id } }, { new: true })

                return res.status(200).json({
                        message: "section created successfully",
                        success: true,
                        response: newSection
                })
        } catch (error) {
                console.log(erro)
                res.status(500).json({
                        message: error.message,
                        success: false
                })

        }

}




exports.updateSection = async (req, res) => {
        try {
                // data input 
                const { sectionName, sectionId } = req.body;
                // data validation 
                if (!sectionName || !sectionId) {
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }
                // update data 
                const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true} )

                return res.status(200).json({
                        message: "section updated successfully",
                        success: true,
                        response: section
                })
                
        } catch (error) {
                console.log(erro)
                res.status(500).json({
                        message: error.message,
                        success: false
                })   
        }
}


exports.deleteSection = async (req, res) => {
        try {
                // data input 
                const { sectionId } = req.body;
                // data validation 
                if (!sectionId) {
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }
                // update data 
                const section = await Section.findByIdAndDelete(sectionId)
                const updatedCourseDetails = await Course.findByIdAndUpdate(section.courseId, { $pull: { courseContent: sectionId } }, { new: true })
                
                return res.status(200).json({
                        message: "section deleted successfully",
                        success: true,
                        response: section
                })

        }
        catch(error){
                console.log(erro)
                res.status(500).json({
                        message: error.message,
                        success: false
                })
        }

}