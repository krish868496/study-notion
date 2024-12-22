const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    // Get user ID from the request (assuming it's set via middleware, e.g., authentication)
    const id = req.user?.id;
    if (!id) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Fetch user and profile details
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    // Destructure fields from the request body (only if they exist)
    const { firstName, lastName, email, dateOfBirth, contactNumber, gender } =
      req.body;

    // Update only provided fields
    if (firstName !== undefined) profileDetails.firstName = firstName;
    if (lastName !== undefined) profileDetails.lastName = lastName;
    if (email !== undefined) profileDetails.email = email;
    if (dateOfBirth !== undefined) profileDetails.dateOfBirth = dateOfBirth;
    if (contactNumber !== undefined)
      profileDetails.contactNumber = contactNumber;
    if (gender !== undefined) profileDetails.gender = gender;

    // Save the updated profile details
    await profileDetails.save();

    console.log(profileDetails, "Profile details saved");

    // Return response
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      response: profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message, success: false });
  }
};


// update profile picture
exports.updateDisplayPicture = async (req, res) => {
  // const { displayPicture } = req.files;
  const file = req.files.displayPicture;
  console.log(file, "file")
  if (!file) {
    res.status(404).json({
      message: "Display picture not found",
      success: false,
    });
  }
  // get id from request body
  const id = req.user.id;

  try {
    const cloudinaryImageUrl = await uploadFileToCloudinary(
      file,
      "FileUpload"
    );

    // find profile picture
    const userDetails = await User.findByIdAndUpdate(
      { _id: id },
      { image: cloudinaryImageUrl.secure_url },
      { new: true }
    ).populate("additionalDetails").exec();

    res.status(200).json({
      success: true,
      message: "profile picture updated successfully",
      user: userDetails,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.removeDisplayPicture = async (req, res) => {
  // get id from request body
  const id = req.user.id;
  if (!id) {
    res.status(404).json({
      message: "user not found",
      success: false,
    });
  }

  try {
    // find profile picture and delete from database
    const userDetails = await User.findByIdAndUpdate(id, {image: null}, {new: true});
    res.status(200).json({
      success: true,
      message: "profile picture deleted successfully",
      user: userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

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
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all details of user
exports.getAllDetails = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    // find user
    const userDetails = await User.findById(id).populate("additionalDetails");
    return res.status(200).json({
      success: true,
      message: "user data fetched successfully",
      users: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({ _id: userId })
      .populate("courses")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "user enrolled courses fetched successfully",
      courses: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
