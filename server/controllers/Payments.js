const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/CourseEnrollmentEmail");
const mongoose = require("mongoose");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "please provide courses ID",
    });
  }
  let totalAmount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "could not find course details",
        });
      }
      // const uid = new mongoose.Types.ObjectId(userId);

      if (course?.studentEnrolled?.includes(userId)) {
        return res.status(200).json({
          success: false,
          message: "you have already enrolled in this course",
        });
      }
      totalAmount += course?.price;
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  const options = {
    amount: totalAmount * 100, // amount in the smallest currency unit (hundredths of a rupee)
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

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
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
  return res.status(200).json({ message: "Payment succeeded", success: true });
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
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );
    if (!enrolledCourse) {
      return res
        .status(500)
        .json({ success: false, message: "could not find course details" });
    }

    const enrolledStudentDetails = await User.findByIdAndUpdate(
      userId,
      { $push: { courseId: courseId } },
      { new: true }
    );

    // send email to the user
    await mailSender.sendMail({
      from: process.env.EMAIL_FROM,
      to: enrolledCourse.instructorEmail,
      subject: "Course Enrollment",
      html: courseEnrollmentEmail(enrolledCourse, userId),
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
    console.log(enrolledStudentDetails, "enrolledStudentDetails");
    await mailSender(
      enrolledStudentDetails.email,
      "Payment Successful",
      `Your payment of ${
        amount / 100
      } has been successfully captured. Your order ID is ${orderId}.`
      // {
      //   attachments: [{ filename: "payment-receipt.pdf", path: "path/to/payment-receipt.pdf" }],
      // }
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
