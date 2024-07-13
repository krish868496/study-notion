import React, { useState } from "react";
import { FaArrowLeft, FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";
import { ErrorMessage, Field, Formik, Form } from "formik";
import CTAButton from "../components/core/HomePage/Button";


const ResetPassword = () => {
  const [resetDone, setResetDone] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams(); 
  const dispatch = useDispatch();


  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;
    dispatch(resetPassword(password, confirmPassword, id));
    setResetDone(true);
  };
  return (
    <div>
      <div className="lg:w-11/12 w-full max-w-maxContent mx-auto text-richblack-25 p-4 my-5 lg:my-[100px]">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="flex flex-col lg:mt-20 gap-5 lg:w-[508px] lg:mx-auto justify-center items-center">
            <h1 className="font-semibold text-[30px] leading-9">
              {resetDone ? "Reset complete!" : "Choose  new password"}
            </h1>
            <p className="lg-w-[444px] ">
              {resetDone
                ? "All done! We have sent an email to ***********@gmail.com to confirm"
                : `Almost done. Enter your new password and you are all set.`}
            </p>
            {!resetDone && (
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div className="flex flex-col lg:w-[500px] w-[350px] gap-4">
                      <div>
                        <label
                          htmlFor="password"
                          className="flex flex-col text-white"
                        >
                          New password
                          <div className="flex items-center my-3 px-6 py-2 shadow-custom-input bg-[#161D29] rounded-md">
                            <Field
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              placeholder="Enter Password"
                              className=" bg-[#161D29] focus:outline-none w-full"
                            />
                            {passwordVisible ? (
                              <IoEyeSharp
                                className="text-lg mr-2 cursor-pointer"
                                onClick={() =>
                                  setPasswordVisible((prev) => !prev)
                                }
                              />
                            ) : (
                              <FaEyeSlash
                                className="text-lg mr-2 cursor-pointer"
                                onClick={() =>
                                  setPasswordVisible((prev) => !prev)
                                }
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
                          Confirm new password
                          <div className="flex items-center  my-3  px-6 py-2 shadow-custom-input bg-[#161D29] rounded-md">
                            <Field
                              type={
                                confirmPasswordVisible ? "text" : "password"
                              }
                              name="confirmPassword"
                              placeholder="Enter confirm Password"
                              className=" bg-[#161D29] focus:outline-none w-full"
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
                    <CTAButton button={true} active={true}>
                      Submit
                    </CTAButton>
                  </Form>
                )}
              </Formik>
            )}
            {
              resetDone && ( 
                <CTAButton linkto={'/login'} active={true}>
                    Return to login
                  </CTAButton>
                )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;









