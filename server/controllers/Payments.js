const { instance } = require('../config/razorpay');
const Course = require('../config/course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender')
const { courseEnrollmentEmail } = require('../mail/templates/CourseEnrollmentEmail')


// capute the payment and initiate the Razorpay order 

exports.capturePayment = async (req, res) => {

        try {
                // get data from req.body 
                const { courseId } = req.body;
                // get user id from req.user.id 
                const userId = req.user.id;
                // validation 
                if (!courseId) {
                        return res.status(400).json({
                                message: "please enter valid course id",
                                success: false
                        })
                }
                // valid courseDetails 
                let course;
                try {
                        course = await Course.findById(courseId);
                        if (!course) {
                                return res.status(400).json({
                                        success: false,
                                        message: "could not find course details",
                                })
                        }
                        // user already pay for the same course convert userId String to objectId 
                        const uid = new mongoose.Schema.Types.ObjectId(userId)
                        if(course.studentsEnrolled.includes(uid)) {
                                return res.status(200).json({
                                        success: false,
                                        message: "you have already enrolled in this course",
                                })
                        }
                } catch (error) {
                  return      response.status(500).json({
                                success: false,
                                message: error.message,
                        })
                }
                // order create  
                const amount = course.price;
                const currency = 'INR'

                const options = {
                        amount: amount * 100,
                        currency,
                        receipt: Math.random(Date.now()).toString(),
                        notes: {
                                courseId,
                                userId,
                        }
                }

                try {
                        // inititae the payment using razorpay 
                        const paymentResponse = await instance.orders.create(options)
                        console.log(paymentResponse);
                        return response.status(200).json({
                                success: true,
                                courseName: course.CourseName,
                                courseDescription: course.CourseDescription,
                                thumbnail: course.Thumbnail,
                                ordersId: paymentResponse.id,
                                currency: paymentResponse.currency,
                                amount: paymentResponse.amount, 
                                message: ""
                        })
                } catch (error) {
                        return response.status(500).json({
                                success: false,
                                message: error.message,
                        })
                }

        }
        catch (err) {
                console.log(err);
                return response.status(500).json({
                        success: false,
                        message: error.message,
                })
        
        }
}




// verify signature of razorpay and server

exports.verifySignature = async (req, res) => {
        // server secret 
        const webhookSecrete = '12345678'
        // razor pay signature   => The signature sent by Razorpay in the request headers is captured.
        const signature = req.headers['x-razorpay-signature']
        // Create a SHA256 Hash: 
        // A SHA256 hash(HMAC) is created using the server's secret key and the request body. This generates a digest which will be compared to the Razorpay signature.
        const shasum = crypto.createHmac("sha256", webhookSecrete)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest("hex")

        if(signature === digest){
                console.log("Payment is Authorized");
                // get course id and user id from notes that we sent razor payload
                const {courseId, userId} = req.body.payload.payment.entity.notes;
                try {
                        //fulfil the action 
                        //find the course and enroll the student
                        const enrolledCourse = await Course.findFindOne({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true})
                        if(!enrolledCourse){
                                return res.status(500).json({
                                        success: false,
                                        message: "could not find course details",
                                })
                        }

                        console.log(enrolledCourse);

                        // find the student and add the course 
                        const enrolledStudent = await User.findOneAndUpdate({_id:userId}, {$push:{courses:courseId}}, {new: true})
                        console.log(enrolledStudent);

                        // mail send to the student who was enrolled in the course 
                        const emailResponse = await mailSender(
                                enrolledStudent.email,
                                "Congratulations you are on boarded into new Study Notion",
                                "Congratulations you are on boarded into new Study Notion",                                                        );
                                console.log(emailResponse);
                                return res.status(200).json({
                                        success: true,
                                        message: "Payment is Authorized",
                                })
                        
                } catch (error) {
                        console.log(err);
                        return response.status(500).json({
                                success: false,
                                message: error.message,
                        })    
                }

        }

        else{
                return response.status(400).json({
                        success: false,
                        message: 'invalid request',
                }) 
        }
}

