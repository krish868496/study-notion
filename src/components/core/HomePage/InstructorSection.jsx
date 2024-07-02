import React from 'react'
import instructor from '../../../assets/Images/instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className="flex gap-20 items-center mt-20">
      <img src={instructor} alt="instructor" className="w-[50%] shadow-white" />
      <div className="w-[50%] flex-col gap-10">
        <h2>
          Become an
          <HighlightText text={"instructor"} />
        </h2>
        <p className="text-[16px] w-[80%] text-richblue-300 font-medium">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <CTAButton active={true} linkto={'/signup'}>
        <div className="flex gap-2">
                Start Learning Today
                <FaArrowRight />
        </div>


        </CTAButton>
      </div>
    </div>
  );
}

export default InstructorSection