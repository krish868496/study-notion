import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ].subSection.findIndex((data) => data.id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex].subSection?.[
          currentSubSectionIndex
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="text-richblack-5">
      <div>
        {/* for buttons and headings  */}
        <div>
          {/* for buttons  */}
          <div
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
          >
            Back
          </div>
          <div>{/* <CTAButton onClick={() => setReviewModal(true)} */}</div>
        </div>

        <div>
          <p>{courseEntireData?.courseName}</p>
          <p>
            {completedLectures.length} / {totalNoOfLectures.length}
          </p>
        </div>
      </div>

      <div>
        {courseSectionData?.map((course, index) => (
          <div
            className=""
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            {/* section  */}
            <div>
              <div>{course?.sectionName}</div>
            </div>
            {/* subsection  */}
            <div>
              {activeStatus === course?._id && (
                <div>
                  {course?.subSection?.map((topic, index) => (
                    <div
                      key={index}
                      className={`${
                        videoBarActive === topic?._id
                          ? "bg-yellow-200 text-richblack-900"
                          : "bg-richblack-900 text-white"
                      }`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?.id}/section/${course?.id}/sub-section/${topic?.id}`
                        );
                        setVideoBarActive(topic?._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      <span>{topic?.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
