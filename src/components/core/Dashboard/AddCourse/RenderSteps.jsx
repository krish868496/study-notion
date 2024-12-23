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
      {steps.map((step) => (
        <div key={step.id}>
          <div
            className={`step ${
              step.id === step
                ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                : "border-richblack-700 bg-richblack-800 text-richblack-300"
            }`}
          >
            {step > step?.id ? <FaCheck /> : step?.id}
          </div>
          {/* add code for dashes between the labels */}
        </div>
      ))}

      <div className="flex items-center justify-center my-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="text-richblue-5 w-[220px] flex flex-col items-center"
          >
            <p className="flex items-center justify-center w-8 h-8 border rounded-full border-richblack-600 bg-richblack-600">
              {step?.id}
            </p>
            <p>{step?.title}</p>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
