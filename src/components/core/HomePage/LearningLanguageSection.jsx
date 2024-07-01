import React from 'react'
import knowYourProgress from "../../../assets/Images/knowYourProgress.png";
import planYourLessons from "../../../assets/Images/planYourLessons.png";
import compareWithOthers from "../../../assets/Images/compareWithOthers.png";
import CTAButton from '../../../components/core/HomePage/Button'

const LearningLanguageSection = () => {
  return (
    <div className='my-[150px]'>
      <div className="flex flex-col w-11/12 max-w-maxContent gap-5 items-center">
        <div className="">
          <h2 className="text-4xl font-semibold text-center">
            Your Swiss Knife for
            <HighlightText text={"Learning any language"} />
          </h2>
          <p className='text-center text-richblack-600  mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>

        <div className='flex  items-center  justify-center my-8'>
          <img src={knowYourProgress} alt="know your progress image" className='object-contain' />
          <img src={compareWithOthers} alt="know your progress image" className='object-contain' />
          <img src={planYourLessons} alt="know your progress image" className='object-contain' />

        </div>
        <div className="w-fit">
          <CTAButton active={true} linkto={'/signup'}>
    <div className="">
      Learn More
    </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default LearningLanguageSection