import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="lg:w-11/12 w-full max-w-maxContent mx-auto text-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="">
          <h1>{!emailSent ? "Reset your password" : "Check you email"}</h1>
          <p>
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form>
            {!emailSent && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  //  onClick={handleSubmit}
                >
                  {!emailSent ? "Reset Password" : "Resend Email"}
                </button>
              </>
            )}
          </form>
          <div>
            <Link to={"/login"}>
              <p>back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
