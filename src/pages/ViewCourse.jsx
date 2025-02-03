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
  console.log(courseId);

  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getStudentEnrolledFullDetailsOfCourse(
        courseId,
        token
      );
      console.log(courseData);
      courseData.forEach((course) => {
        dispatch(setCourseSectionData(course?.courseContent));
        dispatch(setEntireCourseData(course));
        dispatch(setCompletedLectures(course?.completedVideos || 0));
        let lectures = 0;
        course?.courseContent.forEach((section) => {
          lectures += section?.subSection?.length;
        });
        dispatch(setTotalNoOfLectures(lectures));
      });
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div>
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
