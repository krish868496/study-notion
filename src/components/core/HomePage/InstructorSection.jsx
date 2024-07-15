import React from 'react'
import instructor from '../../../assets/Images/instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className="flex lg:flex-row flex-col-reverse gap-8 lg:gap-20 items-center mt-10 lg:mt-20">
      <div className="flex flex-col items-start gap-10">
        <img
          src={instructor}
          alt="instructor"
          className="lg:w-[50%] lg:h-fit h-[545px] shadow-white"
        />
        <div className="flex lg:hidden">

        <CTAButton active={true} linkto={"/signup"}>
          <div className="flex gap-2 items-center">
            Start Teaching Today
            <FaArrowRight />
          </div>
        </CTAButton>
        </div>
      </div>
      <div className="lg:w-[50%] w-full flex flex-col gap-5 items-start">
        <h2 className='text-[20px]'>
          Become an
          <HighlightText text={"instructor"} />
        </h2>
        <p className="text-[16px] w-full lg:w-[80%] text-richblue-300 font-medium">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="hidden lg:flex"> 
        <CTAButton active={true} linkto={"/signup"}>
          <div className="flex gap-2 items-center ">
            Start Teaching Today
            <FaArrowRight />
          </div>
        </CTAButton>

        </div>
      </div>
    </div>
  );
}

export default InstructorSection