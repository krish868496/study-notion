const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadFileToCloudinary } = require("../utils/imageUploader");

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
                const uploadDetails = await uploadFileToCloudinary(video, 'FileUpload')

                // create subsection 
                const subSectionDetails = await SubSection.create({title, description, videoUrl: uploadDetails?.secure_url })
                
                // update section 
                const section = await Section.findByIdAndUpdate({_id: sectionId}, { $push: { subSection: subSectionDetails._id } }, {new: true})
                const sectionDetails = await Section.findById(sectionId).populate("subSection");

                return res.status(200).json({
                        message: "subsection created successfully",
                        success: true,
                        response: sectionDetails
                })
                
        } catch (error) {
                console.log(error)
                return res.status(500).json({
                        message: error.message,
                        success: false
                })
                
        }
}

exports.updateSubSection = async (req, res) => {
        try {
                // Get data from req.body
                const { title, description, sectionId, subSectionId } = req.body;
                const video = req.files?.videoFile; // Extract file from req.files

                if (!title || !description || !sectionId || !video || !subSectionId) {
                        return res.status(400).json({
                                message: "All fields are required",
                                success: false
                        });
                }

                // Upload video to Cloudinary
                const uploadDetails = await uploadFileToCloudinary(video, 'FileUpload');
                if (!uploadDetails?.secure_url) {
                        return res.status(500).json({
                                message: "Failed to upload video",
                                success: false
                        });
                }

                // Update the subsection
                const subSectionDetails = await SubSection.findByIdAndUpdate(
                        subSectionId,
                        { title, description, videoUrl: uploadDetails.secure_url },
                        { new: true } 
                );

                if (!subSectionDetails) {
                        return res.status(404).json({
                                message: "SubSection not found",
                                success: false
                        });
                }

                // Fetch and populate the updated section
                const sectionDetails = await Section.findById(sectionId).populate("subSection");
                if (!sectionDetails) {
                        return res.status(404).json({
                                message: "Section not found",
                                success: false
                        });
                }


                return res.status(200).json({
                        message: "SubSection updated successfully",
                        success: true,
                        response: sectionDetails
                });

        } catch (error) {
                console.error(error);
                return res.status(500).json({
                        message: error.message,
                        success: false
                });
        }
};

exports.deleteSubSection = async (req, res) => {
        try {
                // get data from req. body 
                const { sectionId, subSectionId } = req.body;
                // extract files 

                if( !sectionId || !subSectionId){
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                }


                // create subsection 
                const subSectionDetails = await SubSection.findByIdAndDelete(subSectionId)
                

                // update section 
                const section = await Section.findByIdAndUpdate(sectionId, {$pull:{subSectionId}}, {new: true})
                const sectionDetails = await Section.findById(sectionId).populate("subSection");
                console.log(subSectionDetails, "subseciton details fetched successfully");

                return res.status(200).json({
                        message: "subsection deleted successfully",
                        success: true,
                        response: sectionDetails
                })
                
        } catch (error) {
                console.log(error)
                return res.status(500).json({
                        message: error.message,
                        success: false
                })
                
        }
}