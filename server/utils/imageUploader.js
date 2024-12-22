const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async (file, folder, height, quality) => {
  // Set up options
  const options = {
    folder,
  };

  // Determine the resource type based on file type
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    options.resource_type = "image";
    if (height) options.height = height;
    if (quality) options.quality = quality;
  } else if (fileType === "video") {
    options.resource_type = "video";
  } else {
    options.resource_type = "raw"; // For documents, PDFs, etc.
  }

  // Upload file to Cloudinary with the determined options
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
