const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/CourseEnrollmentEmail");
const mongoose = require("mongoose");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  console.log(courses, "courses array");

  if (!courses || courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide course IDs",
    });
  }

  let totalAmount = 0;
  for (const course_id of courses) {
    console.log(course_id, "course id id ");
    try {
      // Validate ObjectId before querying
      if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).json({
          success: false,
          message: `Invalid course ID: ${course_id}`,
        });
      }

      const course = await Course.findById(
        new mongoose.Types.ObjectId(course_id)
      );

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Could not find course details",
        });
      }

      // Convert user ID to ObjectId
      const uid = new mongoose.Types.ObjectId(userId);

      if (course?.studentEnrolled?.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "You have already enrolled in this course",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  // Razorpay Order Creation
  const options = {
    amount: totalAmount * 100, // Convert amount to paisa (smallest currency unit)
    currency: "INR",
    receipt: Date.now().toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      paymentResponse,
    });
    console.log(paymentResponse, "payment response");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Payment processing failed",
    });
  }
};

// verify payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Payment failed", success: false });
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment failed", success: false });
  }
  //   enroll student if signature match
  await enrolledStudents(courses, userId, res);
};

const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId)
    return res
      .status(403)
      .json({ success: false, message: "please provide courses and userId" });
  for (const courseId of courses) {
    // find the course and enroll the student
    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentEnrolled: userId } },
      { new: true }
    );
    if (!enrolledCourse) {
      return res
        .status(500)
        .json({ success: false, message: "could not find course details" });
    }

    const enrolledStudentDetails = await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Payment succeeded",
      success: true,
      enrolledStudentDetails,
      enrolledCourse,
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  console.log(orderId, amount, paymentId, "payment");

  const userId = req.user.id;
  if (!orderId || !paymentId || !amount) {
    return res
      .status(400)
      .json({ message: "Please provide all the fields", success: false });
  }

  try {
    // find the student
    const enrolledStudentDetails = await User.findById(userId);
    await mailSender(
      enrolledStudentDetails.email,
      `${enrolledStudentDetails.firstName} you have been successfully enrolled to the course`,
      `You have been successfully enrolled to the Course `,
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid #dee2e6;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .order-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>
        
        <div class="content">
            <p>Dear ${enrolledStudentDetails?.firstName},</p>
            
            <p>Thank you for your order! We're pleased to confirm that we've received your payment and your order has been processed successfully.</p>
            
            <div class="order-details">
                <h3>Order Details:</h3>
                <p>Order ID: ${orderId}</p>
                <p>Payment ID: ${paymentId}</p>
                <p>Amount: ${amount}</p>
                <p>Date: ${new Date()}</p>
            </div>
            
            <p>You can track your order status by clicking the button below:</p>
            
            <a href="[Track Order URL]" class="button">Track Your Order</a>
            
            <p>If you have any questions about your order, please don't hesitate to contact our customer support team.</p>
            
            <p>Best regards,<br>Study Notion</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email, please do not reply to this message.</p>
            <p>&copy; 2025 Study Notion. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error sending email", success: false });
  }
};

// capute the payment and initiate the Razorpay order

// exports.capturePayment = async (req, res) => {

//         try {
//                 // get data from req.body
//                 const { courseId } = req.body;
//                 // get user id from req.user.id
//                 const userId = req.user.id;
//                 // validation
//                 if (!courseId) {
//                         return res.status(400).json({
//                                 message: "please enter valid course id",
//                                 success: false
//                         })
//                 }
//                 // valid courseDetails
//                 let course;
//                 try {
//                         course = await Course.findById(courseId);
//                         if (!course) {
//                                 return res.status(400).json({
//                                         success: false,
//                                         message: "could not find course details",
//                                 })
//                         }
//                         // user already pay for the same course convert userId String to objectId
//                         const uid = new mongoose.Schema.Types.ObjectId(userId)
//                         if(course.studentsEnrolled.includes(uid)) {
//                                 return res.status(200).json({
//                                         success: false,
//                                         message: "you have already enrolled in this course",
//                                 })
//                         }
//                 } catch (error) {
//                   return      response.status(500).json({
//                                 success: false,
//                                 message: error.message,
//                         })
//                 }
//                 // order create
//                 const amount = course.price;
//                 const currency = 'INR'

//                 const options = {
//                         amount: amount * 100,
//                         currency,
//                         receipt: Math.random(Date.now()).toString(),
//                         notes: {
//                                 courseId,
//                                 userId,
//                         }
//                 }

//                 try {
//                         // inititae the payment using razorpay
//                         const paymentResponse = await instance.orders.create(options)
//                         console.log(paymentResponse);
//                         return response.status(200).json({
//                                 success: true,
//                                 courseName: course.CourseName,
//                                 courseDescription: course.CourseDescription,
//                                 thumbnail: course.Thumbnail,
//                                 ordersId: paymentResponse.id,
//                                 currency: paymentResponse.currency,
//                                 amount: paymentResponse.amount,
//                                 message: ""
//                         })
//                 } catch (error) {
//                         return response.status(500).json({
//                                 success: false,
//                                 message: error.message,
//                         })
//                 }

//         }
//         catch (err) {
//                 console.log(err);
//                 return response.status(500).json({
//                         success: false,
//                         message: error.message,
//                 })

//         }
// }

// verify signature of razorpay and server

// exports.verifySignature = async (req, res) => {
//         // server secret
//         const webhookSecrete = '12345678'
//         // razor pay signature   => The signature sent by Razorpay in the request headers is captured.
//         const signature = req.headers['x-razorpay-signature']
//         // Create a SHA256 Hash:
//         // A SHA256 hash(HMAC) is created using the server's secret key and the request body. This generates a digest which will be compared to the Razorpay signature.
//         const shasum = crypto.createHmac("sha256", webhookSecrete)
//         shasum.update(JSON.stringify(req.body))
//         const digest = shasum.digest("hex")

//         if(signature === digest){
//                 console.log("Payment is Authorized");
//                 // get course id and user id from notes that we sent razor payload
//                 const {courseId, userId} = req.body.payload.payment.entity.notes;
//                 try {
//                         //fulfil the action
//                         //find the course and enroll the student
//                         const enrolledCourse = await Course.findFindOne({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true})
//                         if(!enrolledCourse){
//                                 return res.status(500).json({
//                                         success: false,
//                                         message: "could not find course details",
//                                 })
//                         }

//                         console.log(enrolledCourse);

//                         // find the student and add the course
//                         const enrolledStudent = await User.findOneAndUpdate({_id:userId}, {$push:{courses:courseId}}, {new: true})
//                         console.log(enrolledStudent);

//                         // mail send to the student who was enrolled in the course
//                         const emailResponse = await mailSender(
//                                 enrolledStudent.email,
//                                 "Congratulations you are on boarded into new Study Notion",
//                                 "Congratulations you are on boarded into new Study Notion",                                                        );
//                                 console.log(emailResponse);
//                                 return res.status(200).json({
//                                         success: true,
//                                         message: "Payment is Authorized",
//                                 })

//                 } catch (error) {
//                         console.log(err);
//                         return response.status(500).json({
//                                 success: false,
//                                 message: error.message,
//                         })
//                 }

//         }

//         else{
//                 return response.status(400).json({
//                         success: false,
//                         message: 'invalid request',
//                 })
//         }
// }
