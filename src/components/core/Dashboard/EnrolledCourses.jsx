import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";

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
    <div className="w-4/5 mx-auto text-richblack-5">
      {!enrolledCourses ? (
        <div>No courses enrolled yet</div>
      ) : (
        <div>
          <h1>Enrolled Courses</h1>
          <Table>
            <Thead>
              <Tr>
                <Th>Course Image</Th>
                <Th>Course Name</Th>
                <Th>Course Description</Th>
                <Th>Durations</Th>
                <Th>Progress</Th>
              </Tr>
            </Thead>
            {enrolledCourses?.map((course) => (
              <Tbody key={course?._id}>
                <Link
                  to={`/view-course/${course?._id}/section/${course?.firstSection}/sub-section/${course?.firstSubSection}`}
                >
                  <Tr>
                    <Td>
                      {" "}
                      <img
                        src={course?.thumbnail}
                        alt="thumbnail"
                        className="aspect-square w-[150px] h-[100px] object-cover"
                      />
                    </Td>
                    <Td>{course.courseName}</Td>
                    <Td>{course.description}</Td>
                    <Td>{course.duration}</Td>
                    <Td>Progress: {course.progressPercentage || 0}</Td>
                    <Td>
                      {/* <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    /> */}
                    </Td>
                  </Tr>
                </Link>
              </Tbody>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
