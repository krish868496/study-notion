import React from "react";
import logo1 from "../../../assets/TimeLineLogo/leadership.png";
import logo2 from "../../../assets/TimeLineLogo/solve.png";
import logo3 from "../../../assets/TimeLineLogo/responsibility.png";
import logo4 from "../../../assets/TimeLineLogo/flexibility.png";
import timelineImage from "../../../assets/Images/timelineImage.png";

const timeline = [
  {
    Logo: logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
];
const TimelineSection = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 lg:gap-16 lg:my-20 my-10">
      <div className="lg:w-[40%] w-full flex flex-col gap-5">
        {timeline.map((item, index) => (
          <div className="flex flex-col" key={index}>
            <div key={index} className="flex items-center gap-4">
              <img
                src={item.Logo}
                alt={item.heading}
                className="w-[42px] h-[42px] object-cover bg-white rounded-full flex items-center justify-center p-2 shadow-md"
              />
              <div>
                <div className="text-lg font-semibold">{item.heading}</div>
                <div className="text-base text-richblack-300">
                  {item.Description}
                </div>
              </div>
            </div>
              {timeline.length - 1 > index && (
                <div className="w-[1px] hidden lg:block h-[45px] bg-richblack-25 ml-5"></div>
              )}
          </div>
        ))}
      </div>
      <div className="relative shadow-blue-200">
        <img
          src={timelineImage}
          alt="timelineImage"
          className="object-cover shadow-white h-fit"
        />
        <div className="absolute bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-7 lg:left-[50%]  lg:translate-x-[-50%] lg:w-full w-[250px] lg:-translate-y-[50%] lg:top-1/4 top-1/2 left-1/2 -translate-x-1/3 ">
          <div className="flex lg:gap-5 gap-10 items-center border-r border-caribbeangreen-300 px-7  my-5">
            <p className="text-3xl font-bold">10</p>
            <p className="text-cari font-bold text-sm text-caribbeangreen-300">
              Years of experiance
            </p>
          </div>
          <div className="flex lg:gap-5 gap-10 items-center px-7 my-5">
            <p className="text-3xl font-bold">250</p>
            <p className="text-cari font-bold text-sm text-caribbeangreen-300">
              Type of courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
