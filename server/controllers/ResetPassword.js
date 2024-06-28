const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
        try {
                const { email } = req.body;
                const checkUser = await User.findOne({ email })
                if (!checkUser) {
                        return res.status(401).json({
                                message: "user not found",
                                success: false
                        })
                }
                // create random token using crypto.randomUUID().
                const token = crypto.randomUUID();
                

                const resetPasswordExpires = new Date() + 5 * 60 * 1000;

                // Update user by adding token and resetPasswordExpires
                const updatedUser = await User.findOneAndUpdate(
                        { email: email },
                        {
                                token: token,
                                resetPasswordExpires: resetPasswordExpires
                        },
                        { new: true } // To return the updated document
                );
                console.log(updatedUser, "updated user");

                // create url 
                const url = `http://localhost:3000/reset-password/${token}`

                // send mail to the containing url 
                await mailSender(email, "Password reset link", `Password reset link ${url}`)

                // return response 
                return res.json({
                        success: true,
                        message: 'Email sent successfully'
                })

        } catch (error) {
                console.log(error);
                response.status(500).json({
                        success: false,
                        message: error.message
                })

        }

}




// reset password 

exports.resetPassword = async (req, res) => {
        // data fetch 
        const { password, confirmPassword, token } = req.body;
        console.log(password);
        // validation 
        if (password !== confirmPassword) {
                return res.json({
                        message: "password and confirm password should be same",
                        success: false
                })
        }

        
        // get user details from db using token 
        const userDetails = await User.findOne({ token: token })
        if (!userDetails) {
                return res.json({
                        message: "token invalid",
                        success: false
                })
        }
        if (userDetails.resetPasswordExpires > Date.now()) {
                console.log("working");
                return res.json({
                        message: "token expired",
                        success: false
                })

        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token: token },
                { password: hashedPassword },
                { new: true }
        )
        return res.status(200).json({
                message: "password reset successfully",
                success: true,
                message: "password reset successfully"
        })
}