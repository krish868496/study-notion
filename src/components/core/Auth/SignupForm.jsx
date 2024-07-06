import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import CTAButton from '../HomePage/Button'
import { FaAngleDown } from 'react-icons/fa';

const SignupForm = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: "", color: "red", firstName: "", lastName: "" }}
        validationSchema={""}
        onSubmit={(values, actions) => {
          alert("form submitted successfully");
        }}
      >
        {() => (
          <Form className="flex flex-col gap-6 w-[500px]">
            <div className="flex justify-between">
              <div className="">
                <label
                  htmlFor="firstName"
                  className="flex flex-col text-white "
                >
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
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="">
                <label htmlFor="lastName" className="flex flex-col text-white ">
                  Last Name
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="shadow-custom-input bg-[#161D29] w-[220px] px-6 py-2 rounded-md focus:outline-none"
                  />
                </label>
                <ErrorMessage name="lastName" lassName="text-red-500 text-sm" />
              </div>
            </div>

            <div className="">
              <label htmlFor="email" className="flex flex-col text-white ">
                Email Address
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md focus:outline-none"
                />
              </label>
              <ErrorMessage name="email" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="flex flex-col text-white">
                Phone Number
                <div className="flex space-x-2 mt-1">
                  <div className="flex w-[80px] items-center shadow-custom-input bg-[#161D29] rounded-md">
                    <Field
                      type="text"
                      name="phn"
                      placeholder="+91"
                      className="shadow-custom-input bg-[#161D29] px-2 py-2 w-[45px] rounded-tl-md rounded-bl-md focus:outline-none"
                    />
                    <FaAngleDown className="text-white mr-1" />
                  </div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md focus:outline-none w-full"
                  />
                </div>
              </label>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div className="">
                <label htmlFor="email" className="flex flex-col text-white">
                  Password
                  <div className="flex items-center bg-[#161D29] rounded-md">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="shadow-custom-input bg-[#161D29] px-6 py-2 focus:outline-none w-full"
                    />
                    <IoEyeSharp className="text-lg mr-2" />
                    {/* <FaEyeSlash /> */}
                  </div>
                </label>
                <ErrorMessage
                  name="password"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="">
                <label htmlFor="email" className="flex flex-col text-white">
                  Confirm Password
                  <div className="flex items-center bg-[#161D29] rounded-md">
                    <Field
                      type="password"
                      name="confirm-password"
                      placeholder="Enter confirm Password"
                      className="shadow-custom-input bg-[#161D29] px-6 py-2 focus:outline-none w-full"
                    />
                    <IoEyeSharp className="text-lg mr-2" />
                    {/* <FaEyeSlash /> */}
                  </div>
                </label>
                <ErrorMessage
                  name="confirm-password"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <Link to={"/forgot-password"} className="flex justify-end">
              <p className="text-[#47A5C5] leading-5 text-[12px] font-normal">
                Forgot password
              </p>
            </Link>
            <CTAButton type="submit" active={true}>
              Submit
            </CTAButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupForm