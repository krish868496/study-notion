const User = require("../models/User")
const Profile = require("../models/Profile")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



// reset password 



// send otp 
exports.sendOTP = async (req, res) => {
        try {
                const { email } = req.body;

                // Check if user already exists
                const checkUser = await User.findOne({ email });

                if (checkUser) {
                        return res.status(401).json({
                                message: "User already exists",
                                success: false
                        });
                }

                // Generate OTP
                let otp = otpGenerator.generate(6, {
                        upperCaseAlphabets: false,
                        lowerCaseAlphabets: false,
                        specialChars: false,
                });



                // Check if the OTP is unique
                let result = await OTP.findOne({ otp: otp });
                while (result) {
                        otp = otpGenerator.generate(6, {
                                upperCaseAlphabets: false,
                                lowerCaseAlphabets: false,
                                specialChars: false,
                        });
                        result = await OTP.findOne({ otp: otp });
                }

                const otpPayload = { email, otp };
                console.log(otpPayload, "payload");

                // Save OTP in DB
                const otpData = await OTP.create(otpPayload);
                console.log(otpData, "otp database");
                res.status(200).json({
                        success: true,
                        message: "OTP sent successfully",
                        otp: otp // Optionally include OTP for testing, remove in production
                });

        } catch (error) {
                console.log("Error while sending OTP", error);
                return res.status(500).json({
                        success: false,
                        message: error.message
                });
        }
};



// signup

exports.signUp = async (req, res) => {
        try {
                // data fetch from req.body 
                const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

                // validate 
                if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp) {
                        return res.status(403).json({
                                message: "all fields required",
                                success: false
                        })
                }

                // check password and confirm password 
                if (password !== confirmPassword) {
                        return res.status(400).json({
                                message: "password and confirm password should be same",
                                success: false
                        })
                }

                // check user exists or not 
                const checkUser = await User.findOne({ email })

                if (checkUser) {
                        return res.status(403).json({
                                message: "user already exists",
                                success: false
                        })
                }


                // find the most recent otp 
                const recentOTPData = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1)
                console.log(otp, "get otp", recentOTPData, "generated otp");

                if (recentOTPData.length == 0) {
                        return res.status(400).json({
                                message: "no otp found",
                                success: false
                        })
                }
                // if otp not == to current otp 
                else if (otp !== recentOTPData.otp) {
                        return res.status(400).json({
                                message: "invalid otp",
                                success: false
                        })
                }



                // hash password 
                const hashedPassword = await bcrypt.hash(password, 10)
                const profileDetails = await Profile.create({
                        gender: null,
                        dateOfBirth: null,
                        about: null,
                        contactNumber: null
                })

                // entry create in db 
                const user = await User.create({
                        firstName, lastName, email, password: hashedPassword, confirmPassword, accountType, additionalDetails: profileDetails._id, contactNumber,
                        //api for creating avatar image 
                        image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

                })
                return res.status(200).json({
                        message: "user created successfully",
                        success: true,
                        response: user
                })
        } catch (error) {
                console.log("error while ", error);
                return res.status(500).json({
                        message: error.message,
                        success: false
                })

        }

}




// login  

exports.login = async (req, res) => {
        try {
                // get data from req body 
                const { email, password } = req.body;
                console.log(email);

                // validation data 
                if (!email, !password) {
                        return res.status(403).json({
                                message: "all fields are required",
                                success: false
                        })
                }

                // check user exists or not 
                const checkUser = await User.findOne({ email })
                // .populate("additionalDetails");
                console.log(checkUser);

                if (!checkUser) {
                        return res.status(401).json({
                                message: "user not found please sign up first",
                                success: false
                        })
                }
                // generate jwt after password match 
                if (await bcrypt.compare(password, checkUser.password)) {
                        const payload = {
                                email: checkUser.email,
                                id: checkUser._id,
                                accountType: checkUser.accountType
                        }
                        // create token using jwt.sing method 
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
                        checkUser.token = token;
                        checkUser.password = undefined;

                        // create cookie 
                        // res.cookie("token", token, {
                        //         expires: new Date(Date.now() + 3 * 24 * 1000 * 60 * 60),
                        //         httpOnly: true
                        // })
                        res.status(200).json({
                                message: "user logged in successfully",
                                success: true,
                                token,
                                data: checkUser
                        })
                }

        } catch (error) {
                console.log(Error);

        }
}