import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = ({heading, subHeading1, subHeading2, image, type}) => {
  return (
    <div className="flex gap-32 p-4 mt-[100px]">
      <div className="mt-4 flex flex-col gap-5 items-start">
        <h1 className="text-[#F1F2FF] lg:text-[30px] font-semibold lg:leading-9">
          {heading}
        </h1>
        <h2 className="text-[#F1F2FF] font-normal lg:text-[18px] lg:*:leading-7 ">
          {subHeading1}
          <HighlightText text={subHeading2} />
        </h2>
        <div className="bg-[#161D29] rounded-full p-1 gap-1 flex">
          <div className="bg-[#000814] rounded-[100px] py-1.5 px-4 text-white">
            Student
          </div>
          <div className="bg-[#161D29] rounded-[100px] py-1.5 px-4 text-white">
            Instructors
          </div>
        </div>
        {type === "login" ? <LoginForm /> : <SignupForm />}
      </div>
      <div>
      <img src={image} alt={`${type} image`} className='bg-cover lg:w-[585px] lg:h-[531px]' />
      </div>
    </div>
  );
}

export default Template