import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("unable to fetch courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div>
      <h1>Enrolled Courses</h1>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <div>No courses enrolled yet</div>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>
          {/* card start from here  */}
          {enrolledCourses.map((course, index) => (
            <div key={index}>
              <div>
                <img src={course?.thumbnail} alt="thumbnail" />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.CourseDescription}</p>
                </div>
              </div>
              <div>{course.totalDuration}</div>
              <div>
                <p>Progress: {course.progressPercentage || 0}</p>
                {/* <ProgressBar 
                completed = {course.progressPercentage || 0}
                height= '8px'
                isLabelVisible = {false}
                /> */}
             </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
