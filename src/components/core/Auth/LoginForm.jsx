import React, { useState } from "react";
import CTAButton from "../HomePage/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('second')

  const EyeIcon = passwordVisible ? IoEyeSharp : FaEyeSlash;
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
          <Form className="flex flex-col gap-5 w-[500px]">
            <div className="">
              <label htmlFor="email" className="flex flex-col text-white ">
                Email Address
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="bg-[#161D29] px-6 py-2 rounded-md focus:outline-none"
                />
              </label>
              <ErrorMessage name="email" className="text-red-500 text-sm" />
            </div>
            <div className="">
              <label htmlFor="password" className="flex flex-col text-white">
                Password
                <div className="flex items-center bg-[#161D29] rounded-md">
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className="bg-[#161D29] px-6 py-2 focus:outline-none w-full"
                  />
                  <EyeIcon
                    className="text-lg mr-2 cursor-pointer"
                    onClick={() => setPasswordVisible(prev => !prev) }
                  />
                </div>
              </label>
              <ErrorMessage name="email" className="text-red-500 text-sm" />
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
};

export default LoginForm;
