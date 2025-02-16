import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getStudentEnrolledFullDetailsOfCourse } from "../services/operations/courseDetailsApi";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getStudentEnrolledFullDetailsOfCourse(
        courseId,
        token
      );
      console.log(courseData);
      dispatch(setCourseSectionData(courseData?.courseContent || []));
      dispatch(setEntireCourseData(courseData));
      dispatch(setCompletedLectures(courseData?.completedVideos || []));
      let lectures = 0;
      courseData?.courseContent.forEach((section) => {
        lectures += section?.subSection?.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 p-2 border border-richblack-5">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
        <div className="col-span-9 p-2">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
