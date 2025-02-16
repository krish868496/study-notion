import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCourseProgress } from "../../../services/operations/courseDetailsApi";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    if (currentSectionIndex !== -1) {
      const currentSubSectionIndex = courseSectionData[
        currentSectionIndex
      ].subSection.findIndex((data) => data._id === subSectionId);


      const activeSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    }
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  const handleCourseProgress = async (courseId, subSectionId) => {
    if (completedLectures.includes(subSectionId)) {
      return;
    }
    await updateCourseProgress(courseId, subSectionId, token);
  };

  return (
    <div className="text-richblack-5">
      <div>
        {/* Navigation Buttons */}
        <div>
          <div
            onClick={() => navigate("/dashboard/enrolled-course")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Back
          </div>
        </div>

        {/* Course Title and Progress */}
        <div>
          <p className="text-lg font-bold">{courseEntireData?.courseName}</p>
          <p>
            {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      {/* Course Sections & Subsections */}
      <div>
        {courseSectionData?.map((section, index) => (
          <div key={index} className="mt-4">
            {/* Section Header */}
            <div
              className="p-2 font-semibold bg-gray-700 rounded cursor-pointer"
              onClick={() => setActiveStatus(section?._id)}
            >
              {section?.sectionName}
            </div>

            {/* Subsections */}
            {activeStatus === section?._id && (
              <div className="mt-2 ml-4">
                {section?.subSection?.map((topic, index) => (
                  <div
                    key={index}
                    className={`p-2 my-1 rounded cursor-pointer ${
                      videoBarActive === topic?._id
                        ? "bg-yellow-200 text-black"
                        : "bg-gray-800 text-white"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic?._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic?._id) ?? []}
                      onChange={() =>
                        handleCourseProgress(courseEntireData?._id, topic?._id)
                      }
                      className="mr-2"
                    />
                    {topic?.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
