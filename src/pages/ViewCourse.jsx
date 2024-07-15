// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useParams } from "react-router-dom";
// import { getFullDetailsOfCourse } from "../services/operations/courseDetailsApi";

// const ViewCourse = () => {
//   const [reviewModal, setReviewModal] = useState(false);
//   const { courseId } = useParams();
//   const { token } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const setCourseSpecificDetails = async () => {
//       const courseData = await getFullDetailsOfCourse(courseId, token);
//       dispatch(setCourseSectionData(courseData.courseDetails.CourseContent));
//       dispatch(setEntireCourseData(courseData.CourseDetails));
//       dispatch(setCompletedLectures(courseData.completedVideos));
//       let lectures = 0;
//       courseData.courseDetails.CourseContent.forEach((section) => {
//         lectures += section.subSection.length;
//       });
//       dispatch(setTotalNoOfLectures(lectures));
//     };
//   }, []);

//   return (
//     <>
//       <div>
//         <VideoDetailsSidebar setReviewModal={setReviewModal} />
//         <div>
//           <Outlet />
//         </div>
//       </div>
//       {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//     </>
//   );
// };

// export default ViewCourse;
