import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import { apiConnector } from '../services/apiconnector';
import { endpoints } from '../services/apis';
import toast from 'react-hot-toast';
import { signUp } from '../services/operations/authApi';
const VerifyOtp = () => {
      const [otp, setOtp] = useState("")
        const { loading, signupData } = useSelector((state) => state.auth);
        const dispatch = useDispatch()
        const location = useLocation();
        const navigate = useNavigate();

        useEffect(() => {
          if(signupData === null){
            navigate('/signup');
          }
        }, [])
        
        const handleSubmit = async () => {
          const {accountType, firstName, lastName, email, password, contactNumber, confirmPassword} = signupData;
          dispatch(
            signUp(
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              otp,
              contactNumber,
              navigate
            )
          );
        }


       
  return (
    <div>
      <div className="lg:w-11/12 w-full max-w-maxContent mx-auto text-richblack-25">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col lg:mt-20 gap-5 lg:w-[508px] lg:mx-auto justify-center items-center">
            {/* <h1 className="font-semibold text-[30px] leading-9">
              {!updatedPassword ? "Choose new password" : "Reset Complete"}
            </h1>
            <p className="lg-w-[444px] ">
              {!updatedPassword
                ? "Almost done. Enter your new password and youre all set."
                : `All done! We have sent an email to  to confirm `}
            </p> */}
            {/* <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={""}
              onSubmit={handleSubmit}
            >
              {() => ( */}
            <form
              className="flex flex-col gap-5 w-[500px]"
              onSubmit={handleSubmit}
            >
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
              />
              <button type="submit">verify email</button>
              <div className="flex">
                <Link to={"/login"} className="flex items-center gap-3">
                  <FaArrowLeft /> <p>back to login</p>
                </Link>
                <div className="">
                  <button>Resend it</button>
                </div>
              </div>
            </form>
            {/* )}
            </Formik> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp