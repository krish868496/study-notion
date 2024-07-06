import { Form, Formik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux'

const VerifyEmail = () => {
        const {loading} = useSelector((state) => state.auth)
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={""}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col gap-5 w-[500px]">
                {!updatedPassword && (
                  <>
                    <div className="">
                      <label
                        htmlFor="email"
                        className="flex flex-col text-white "
                      >
                        New password
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter new password"
                          className="bg-[#161D29] px-6 py-3.5 rounded-md focus:outline-none"
                        />
                      </label>
                      <ErrorMessage
                        name="confirmPassword"
                        className="text-red-500 text-sm my-4"
                      />
                    </div>
                    {/* <CTAButton
                      active={true}
                      type="submit"
                      //  onClick={handleSubmit}
                    >
                      {!updatedPassword ? "Reset Password" : "Resend Email"}
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
}

export default VerifyEmail