import React from 'react'
import Template from '../components/core/Auth/Template';
import loginImage from '../assets/Images/loginImage.png'

const Login = () => {
  return (
    <div className="lg:w-11/12 w-full max-w-maxContent mx-auto">
      <Template
        heading={"Welcome Back"}
        subHeading1={"Build skills for today, tomorrow, and beyond."}
        subHeading2={" Education to future-proof your career."}
        image={loginImage}
        type={"login"}
      />
    </div>
  );
}

export default Login