const Profile = require("../models/Profile")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
        try {
                // get data 
                const {dateOfBirth="", about="", contactNumber="", gender="" } = req.body;
                console.log(req.body, "request");       
                // get id 
                const id = req.user.id;
                console.log(id);
                // validation 
                if(!contactNumber || !gender || !dateOfBirth || !about ){
                        return res.status(400).json({
                                message: "all fields are required",
                                success: false
                        })
                } 
                // find profile 
                const userDetails = await User.findById(id)
                const profileId = userDetails.additionalDetails;
                const profileDetails = await Profile.findById(profileId);

                // update profile details 
                profileDetails.dateOfBirth = dateOfBirth;
                profileDetails.about = about;
                profileDetails.gender = gender;
                profileDetails.contactNumber = contactNumber;
                // save profile details into database 
                await profileDetails.save();
                
                // return response 
                return res.status(200).json({
                        message: "profile updated successfully",
                        success: true,
                        response: profileDetails
                })


        } catch (error) {
                console.log(error);
                return res.status(500).json({ error:error.message, status: false});
                
        }

}

// update profile picture 
exports.updateDisplayPicture = async (req, res) => {
        // const { displayPicture } = req.files;
        const file = req.files.displayPicture

        if(!file){
                res.status(404).json({ 
                        message:'Display picture not found',
                        success:false
                })
        }
        // get id from request body 
        const id = req.user.id;

        try {
                const cloudinaryImageUrl = await uploadImageToCloudinary(file, "FileUpload" )

                // find profile picture 
                const userDetails = await User.findByIdAndUpdate({ _id: id }, { image: cloudinaryImageUrl.secure_url }, { new: true });

                res.status(200).json({
                        success: true,
                        message: "profile picture updated successfully",
                        user: userDetails
                })
                
        } catch (error) {
                console.log(error)
                
        }


      
         
 }





// delete account 

exports.deleteAccount = async (req, res) => {
        try {
                // get id 
                const id = req.user.id;
                // find user 
                const userDetails = await User.findById(id);
                const profileId = userDetails.additionalDetails;
                
                // delete profile 
                await Profile.findByIdAndDelete(profileId);
                // delete user 
                await User.findByIdAndDelete(id);

                // return response 
                return res.status(200).json({
                        message: "account deleted successfully",
                        success: true
                })

                
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error.message
                })
                
        }
}


exports.getAllDetails = async (req, res) => {
        try {
                // get id 
                const id = req.user.id;
                // find user 
                const userDetails = await User.findById(id).populate("additionalDetails");
                return res.status(200).json({
                        success: true,
                        message:"user data fetched successfully",
                        users: userDetails
                })
        } catch (error) {
                return res.status(500).json({
                        message: error.message,
                        success: false
                })
                
        }
}