import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "../HomePage/Button";
import { FaAngleDown, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import * as Yup from "yup";
import { sendOtp } from "../../../services/operations/authApi";

export const accountTypeData = ["Student", "Instructor"];

const SignupForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [accountType, setAccountType] = useState("Student");
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (values) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      otp,
    } = values;
    dispatch(
      setSignupData({
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
      })
    );
    
    dispatch(sendOtp(email, navigate));
    
  };
   const handleAccountType = (data) => {
     setAccountType(data);
   };

  // const validationSchema = Yup.object().shape({
  //   accountType: Yup.string().required("Account type is required"),
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   password: Yup.string().required("Password is required"),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match")
  //     .required("Confirm Password is required"),
  //   contactNumber: Yup.string().required("Phone number is required"),
  //   otp: Yup.string().required("OTP is required"),
  // });

  return (
    <div>
      <div className="bg-[#161D29] rounded-full w-[210px] mb-10 p-1 gap-1 flex">
        {accountTypeData?.map((data, index) => (
          <button
            onClick={() => handleAccountType(data)}
            key={index}
            className={`${
              accountType === data ? "bg-[#000814] " : "bg-[#161D29]"
            } bg-[#000814] rounded-[100px] py-1.5 px-4 text-white`}
          >
            {data}
          </button>
        ))}
      </div>
      <Formik
        initialValues={{
          accountType: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          password: "",
          confirmPassword: "",
          otp: "",
        }}
        validationSchema={""}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-6 w-[500px]">
            <div className="flex justify-between">
              <div>
                <label htmlFor="firstName" className="flex flex-col text-white">
                  First Name
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[220px] focus:outline-none"
                  />
                </label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="flex flex-col text-white">
                  Last Name
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="shadow-custom-input bg-[#161D29] w-[220px] px-6 py-2 rounded-md focus:outline-none"
                  />
                </label>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="flex flex-col text-white">
                Email Address
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md focus:outline-none"
                />
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="contactNumber"
                className="flex flex-col text-white"
              >
                Phone Number
                <div className="flex space-x-2 mt-1">
                  <div className="flex w-[80px] items-center shadow-custom-input bg-[#161D29] rounded-md">
                    <Field
                      type="text"
                      name="countryCode"
                      placeholder="+91"
                      className="shadow-custom-input bg-[#161D29] px-2 py-2 w-[45px] rounded-tl-md rounded-bl-md focus:outline-none"
                    />
                    <FaAngleDown className="text-white mr-1" />
                  </div>
                  <Field
                    type="text"
                    name="contactNumber"
                    placeholder="Enter phone number"
                    className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md focus:outline-none w-full"
                  />
                </div>
              </label>
              <ErrorMessage
                name="contactNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="password" className="flex flex-col text-white">
                  Password
                  <div className="flex items-center bg-[#161D29] rounded-md">
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      className="shadow-custom-input bg-[#161D29] px-6 py-2 focus:outline-none w-full"
                    />
                    {passwordVisible ? (
                      <IoEyeSharp
                        className="text-lg mr-2 cursor-pointer"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="text-lg mr-2 cursor-pointer"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      />
                    )}
                  </div>
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="flex flex-col text-white"
                >
                  Confirm Password
                  <div className="flex items-center bg-[#161D29] rounded-md">
                    <Field
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Enter confirm Password"
                      className="shadow-custom-input bg-[#161D29] px-6 py-2 focus:outline-none w-full"
                    />
                    {confirmPasswordVisible ? (
                      <IoEyeSharp
                        className="text-lg mr-2 cursor-pointer"
                        onClick={() =>
                          setConfirmPasswordVisible((prev) => !prev)
                        }
                      />
                    ) : (
                      <FaEyeSlash
                        className="text-lg mr-2 cursor-pointer"
                        onClick={() =>
                          setConfirmPasswordVisible((prev) => !prev)
                        }
                      />
                    )}
                  </div>
                </label>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <Link to={"/forgot-password"} className="flex justify-end">
              <p className="text-[#47A5C5] leading-5 text-[12px] font-normal">
                Forgot password
              </p>
            </Link>
            {/* <CTAButton type="submit" active={true}>
              Submit
            </CTAButton> */}
            <button type="submit" className="text-white">
              submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
