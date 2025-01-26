import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Course Publish",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center my-10">
        {steps.map((stepItem) => {
          return (
            <div
              key={stepItem.id}
              className="relative w-[200px] flex flex-col items-center text-richblue-5"
            >
              {/* Step Number */}
              <p
                className={`flex items-center justify-center w-8 h-8 border rounded-full  
      ${
        stepItem?.id === step
          ? "border-yellow-200 bg-[#251400]"
          : "border-richblack-600 bg-richblack-800"
      }
      ${
        stepItem.id < step
          ? "bg-yellow-200  before:content-['✔'] before:text-richblack-5"
          : "border-richblack-600 bg-richblack-800"
      }
    `}
              >
                {/* {stepItem.id} */}
                {stepItem?.id >= step && <span>{stepItem.id}</span>}
              </p>

              {/* Step Title */}
              <p>{stepItem.title}</p>

              {/* Dashed Line (Only if it's NOT the last step) */}
              {stepItem.id !== steps.length && (
                <div
                  className={` ${
                    stepItem?.id === step
                      ? "border-yellow-200"
                      : "border-richblack-600"
                  } absolute w-[11rem] border border-white border-dashed top-4 left-[118px]`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
