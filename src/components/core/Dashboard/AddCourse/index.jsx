import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <>
      <div className="flex gap-5 text-richblack-5">
        <div>
          <h1 className="text-[24px] leading-9 tracking-wider font-bold">Add Course</h1>
            <RenderSteps />
        </div>
        <div className="border border-richblack-800 bg-richblack-600 rounded-[8px] p-5 h-fit">
          <h2 className="font-semibold text-[20px] leading-8">Code Upload Tips</h2>
          <ul className="list-disc ps-4">
            <li className="text-base leading-6 tracking-wide">Set the Course Price option or make it free.</li>
            <li className="text-base leading-6 tracking-wide">Standard size for the course thumbnail is 1024x576.</li>
            <li className="text-base leading-6 tracking-wide">Video section controls the course overview video.</li>
            <li className="text-base leading-6 tracking-wide">Course Builder is where you create & organize a course.</li>
            <li className="text-base leading-6 tracking-wide">
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li className="text-base leading-6 tracking-wide">
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li className="text-base leading-6 tracking-wide">Make Announcements to notify any important</li>
            <li className="text-base leading-6 tracking-wide">Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
