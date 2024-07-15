import React, { useState } from "react";
import CTAButton from "../HomePage/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authApi";

export const accountTypeData = ["Student", "Instructor"]


const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [accountType, setAccountType] = useState('Student')

  const EyeIcon = passwordVisible ? IoEyeSharp : FaEyeSlash;

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleAccountType = (data) => {
    setAccountType(data);
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;
    dispatch(login(email, password, navigate));
      setSubmitting(false);
      resetForm();
  };
  
  return (
    <div>
      <div className="bg-[#161D29] rounded-full w-[210px] mb-10 p-1 gap-1 flex shadow-custom-input">
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
        initialValues={{ email: "", password: "" }}
        validationSchema={""}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-5 lg:w-[500px] w-[350px]">
            <div className="">
              <label htmlFor="email" className="flex flex-col text-white ">
                Email Address
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="bg-[#161D29] px-6 py-2 rounded-md focus:outline-none shadow-custom-input lg:my-3 my-2"
                />
              </label>
              <ErrorMessage name="email" className="text-red-500 text-sm" />
            </div>
            <div className="">
              <label htmlFor="password" className="flex flex-col text-white">
                Password
                <div className="flex items-center bg-[#161D29] rounded-md px-6 py-2 shadow-custom-input lg:my-3 my-2">
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className="bg-[#161D29]  focus:outline-none w-full"
                  />
                  <EyeIcon
                    className="text-lg mr-2 cursor-pointer"
                    onClick={() => setPasswordVisible((prev) => !prev)}
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
            <CTAButton button={true} active={true}>
              Submit
            </CTAButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
