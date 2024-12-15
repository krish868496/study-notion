const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address.",
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    // required: true, 
  },
  dateOfBirth: {
    type: String,
  },
  // about: {
  //         type: String,
  //         trim: true
  // },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema)