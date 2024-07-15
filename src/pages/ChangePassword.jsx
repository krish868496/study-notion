import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange } from "../services/operations/authApi";
import { ErrorMessage, Field, Formik, Form } from "formik";
import CTAButton from "../components/core/HomePage/Button";

const ChangePassword = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { loading, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { password, newPassword, confirmNewPassword } = values;
    dispatch(passwordChange(password, newPassword, confirmNewPassword, token));
    setIsPasswordChanged(true);
  };
  return (
    <div>
      <div className="lg:w-11/12 w-full max-w-maxContent mx-auto text-richblack-25 p-4 my-5 lg:my-[100px]">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="flex flex-col lg:mt-20 gap-5 lg:w-[508px] lg:mx-auto justify-center items-center">
            <h1 className="font-semibold text-[30px] leading-9">
              {!isPasswordChanged ? " Password Change" : "Password changed"}
            </h1>
            {!isPasswordChanged ? (
              <Formik
                initialValues={{
                  password: "",
                  newPassword: "",
                  confirmNewPassword: "",
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
                          Password
                          <div className="flex items-center my-3 px-6 py-2 shadow-custom-input bg-[#161D29] rounded-md">
                            <Field
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              placeholder="Enter Current Password"
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
                          htmlFor="newPassword"
                          className="flex flex-col text-white"
                        >
                          New password
                          <div className="flex items-center my-3 px-6 py-2 shadow-custom-input bg-[#161D29] rounded-md">
                            <Field
                              type={newPasswordVisible ? "text" : "password"}
                              name="newPassword"
                              placeholder="Enter new Password"
                              className=" bg-[#161D29] focus:outline-none w-full"
                            />
                            {newPasswordVisible ? (
                              <IoEyeSharp
                                className="text-lg mr-2 cursor-pointer"
                                onClick={() =>
                                  setNewPasswordVisible((prev) => !prev)
                                }
                              />
                            ) : (
                              <FaEyeSlash
                                className="text-lg mr-2 cursor-pointer"
                                onClick={() =>
                                  setNewPasswordVisible((prev) => !prev)
                                }
                              />
                            )}
                          </div>
                        </label>
                        <ErrorMessage
                          name="newPassword"
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
                              name="confirmNewPassword"
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
                          name="confirmNewPassword"
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
            ) : (
              <CTAButton linkto={"/"} active={true}>
                Return to home page
              </CTAButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
