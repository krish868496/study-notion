import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = ({heading, subHeading1, subHeading2, image, type}) => {
  return (
    <div className="flex lg:flex-row flex-col lg:gap-32 lg:mt-[100px] mt-5 gap-10 p-4" >
      <div className="mt-4 flex flex-col gap-5 items-start">
        <h1 className="text-[#F1F2FF] lg:text-[30px] text-2xl font-semibold lg:leading-9 leading-9 tracking-wide lg:text-start text-center">
          {heading}
        </h1>
        <h2 className="text-[#F1F2FF] font-normal lg:text-[18px] text-[16px] leading-6 lg:leading-7 ">
          {subHeading1}
          <HighlightText text={subHeading2} />
        </h2>
      
        {type === "login" ? <LoginForm /> : <SignupForm />}
      </div>
      <div>
      <img src={image} alt={`${type} image`} className='bg-cover lg:w-[585px] lg:h-[531px]' />
      </div>
    </div>
  );
}

export default Template