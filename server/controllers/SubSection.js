const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection 

exports.createSubSection = async (req, res) => {
        try {
                // get data from req. body 
                const { title, timeDuration, description, sectionId } = req.body;

                // extract files 
                const video = req.files.videoFile;

                if(!title || !description || !sectionId || !video){
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }

                // upload image to cloudinary 
                const uploadDetails = await uploadImageToCloudinary(video, 'FileUpload')
                console.log(uploadDetails, "upload details cloudinary");

                // create subsection 
                // const subSectionDetails = await SubSection.create({title, description, video: uploadDetails.secure_url, description, timeDuration })
                // console.log(subSectionDetails, "subsection details cloudinary");
                

                // // update section 
                // const section = await Section.findByIdAndUpdate({_id: sectionId}, { $push: { subSections: subSectionDetails._id } }, {new: true})

                // return res.status(200).json({
                //         message: "subsection created successfully",
                //         success: true,
                //         response: subSectionDetails
                // })
                
        } catch (error) {
                console.log(error)
                return res.status(500).json({
                        message: error.message,
                        success: false
                })
                
        }
}