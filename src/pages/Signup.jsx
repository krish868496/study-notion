import React from 'react'
import signupImage from '../assets/Images/signupImage.png'
import Template from '../components/core/Auth/Template'

const Signup = () => {
  return (
    <div className="lg:w-11/12 w-full max-w-maxContent mx-auto">
      <Template
        heading={"Join the millions learning to code with StudyNotion for free"}
        subHeading1={"Build skills for today, tomorrow, and beyond."}
        subHeading2={" Education to future-proof your career."}
        image={signupImage}
        type={"signup"}
      />
    </div>
  );
}

export default Signup