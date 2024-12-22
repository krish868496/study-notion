import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import razorPayLogo from "../../assets/Logo/logoFullLight.png";
import { setPaymentLoading } from "../../slices/courseSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;


function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    // load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay script failed to load");
      throw new Error("RazorPay script failed to load");
    }
    //     initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: `${orderResponse.data.paymentResponse.amount}`,
      currency: orderResponse.data.paymentResponse.currency,
      name: "StudyNotion",
      description: "Thank you for Payment",
      order_id: orderResponse.data.paymentResponse.id,
      image: razorPayLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // send successful mail
        // sendPaymentSuccessEmail(
        //   response,
        //   orderResponse.data.paymentResponse.amount
        // );
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.paymentResponse.amount,
          token
        );
        // verifyPayment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    console.error(options, "options");
    
    const paymentObject = new window.Razorpay(options)
    paymentObject.open();
    paymentObject.on("payment failed", (response) => {
        toast.error("oops, payment failed")
    })
  } catch (error) {
    console.log("Payment failed", error);
    toast.error("couldn't make payment", error);
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_order_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function verifyPayment(response, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
     await apiConnector("POST", COURSE_VERIFY_API, response, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful");
    navigate("/dashboard/enrolled-courses");
    // dispatch(resetCart());
  } catch (error) {
    console.log(error);
    toast.error("Payment verification failed", error);
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
