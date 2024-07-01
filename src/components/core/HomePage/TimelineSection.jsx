import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/leadership.png'
import logo2 from '../../../assets/TimeLineLogo/solve.png'
import logo3 from '../../../assets/TimeLineLogo/responsibility.png'
import logo4 from '../../../assets/TimeLineLogo/flexibility.png'
import timelineImage from '../../../assets/Images/timelineImage.png'

const timeline = [
  {
    Logo:logo1,
    heading: "Leadership",
    Description:"Fully committed to the success company"
  },
  {
    Logo:logo2,
    heading: "Leadership",
    Description:"Fully committed to the success company"
  },
  {
    Logo:logo3,
    heading: "Leadership",
    Description:"Fully committed to the success company"
  },
  {
    Logo:logo4,
    heading: "Leadership",
    Description:"Fully committed to the success company"
  },

]
const TimelineSection = () => {
  return (
    <div className="flex gap-16">
      <div className="w-[45%] flex flex-col gap-5">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <img
              src={item.Logo}
              alt={item.heading}
              className="w-[32px] h-[32px]"
            />
            <div className="text-lg font-semibold">{item.heading}</div>
            <div className="text-base text-richblack-300">
              {item.Description}
            </div>
          </div>
        ))}
      </div>
      <div className="relative shadow-blue-200">
        <img
          src={timelineImage}
          alt="timelineImage"
          className="object-cover shadow-white h-fit"
        />
        <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-7 left-[50%] translate-x-[-50%] -translate-y-[-50%] ">
          <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
            <p className="text-3xl font-bold">10</p>
            <p className="text-cari font-bold text-sm text-caribbeangreen-300">
              Years of experiance
            </p>
          </div>
          <div className="flex gap-5 items-center px-7">
            <p className="text-3xl font-bold">250</p>
            <p className="text-cari font-bold text-sm text-caribbeangreen-300">
              Type of courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection