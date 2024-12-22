import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsApi";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

const SavedCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <div className="text-richblack-5">
        <h1>My Courses</h1>
        <IconBtn
          text="Add Courses"
          onClick={() => navigate("/dashboard/add-course")}
        ></IconBtn>
      </div>
      <div>
        {courses.length === 0 ? (
          <div>
            <p>No Courses Found</p>
          </div>
        ) : (
          courses?.map((course) => (
            <div>
              {course?.status === "Draft" ? (
                <CoursesTable course={course} setCourses={setCourses} />
              ) : (
                <div></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCourses;
