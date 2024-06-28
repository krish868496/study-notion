const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const OTPSchema = new mongoose.Schema({
        email:{
                type: String,
                required: true
        },
        otp:{
                required: true,
                type: String
        },
        createdAt:{
                type: Date,
                default: Date.now(),
                expires: 5*60
        }
})

// a function to send email 
async function sendVerificationEmail(email, otp){
        try{
                const mailResponse = await mailSender(email, "Verification email from study Notion", otp)
                console.log("mail send successfully")

        }catch(error){
                console.log("error occured while sending mail", error)
                throw error;
        }
}

// pre is used when we want to send mail before data entry and post is when we want to send mail after data entry

OTPSchema.pre("save", async function(next){
        await sendVerificationEmail(this.email, this.otp)
        next();
})



module.exports = mongoose.model("OTP", OTPSchema)