import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CTAButton from '../components/core/HomePage/Button'
import { FaArrowLeft } from "react-icons/fa";
import { apiConnector } from "../services/apiconnector";
import {  endpoints } from "../services/apis";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  // const [email, setEmail] = useState("");

  const handleSubmit = async (values) => {
    console.log(values);
    const {email} = values;
    const { data } = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {email});
    console.log(data);
  };


  return (
    <div className="lg:w-11/12 w-full max-w-maxContent mx-auto text-richblack-25">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col lg:mt-20 gap-5 lg:w-[508px] lg:mx-auto justify-center items-center">
          <h1 className="font-semibold text-[30px] leading-9">
            {!emailSent ? "Reset your password" : "Check you email"}
          </h1>
          <p className="lg-w-[444px] ">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={""}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col gap-5 w-[500px]">
                {!emailSent && (
                  <>
                    <div className="">
                      <label
                        htmlFor="email"
                        className="flex flex-col text-white "
                      >
                        Email Address
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                          className="bg-[#161D29] px-6 py-3.5 rounded-md focus:outline-none"
                        />
                      </label>
                      <ErrorMessage
                        name="email"
                        className="text-red-500 text-sm my-4"
                      />
                    </div>
                    {/* <CTAButton
                      active={true}
                      type="submit"
                      //  onClick={handleSubmit}
                    >
                      {!emailSent ? "Reset Password" : "Resend Email"}
                    </CTAButton> */}
                    <button type="submit">submit</button>
                  </>
                )}
                  <Link to={"/login"} className="flex items-center gap-3">
                    <FaArrowLeft /> <p>back to login</p>
                  </Link>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

