import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../common/constant";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";

const CoursesTable = ({ course, setCourses }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div>
      <Table className="text-richblack-5">
        {/* <Thead>
          <Tr className="flex p-8 gap-x-10 border-richblack-800">
            <Th>Course </Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead> */}
        <Tbody>
          <Tr
            key={course?._id}
            className="flex p-8 gap-x-10 border-richblack-800"
          >
            <Td className="flex">
              <img
                src={course?.thumbnail}
                alt=""
                className="h-[150px] w-[220px] rounded-lg bg-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-[20px] leading-7 text-richblack-5">
                  {course?.courseName}
                </p>
                <p className="font-normal text-[14px] leading-6 text-richblack-5">
                  {course?.courseDescription}
                </p>
                {/* <p>Created: {form</p> */}
                {course?.status === COURSE_STATUS.DRAFT ? (
                  <p>DRAFTED</p>
                ) : (
                  <p>PUBLISHED</p>
                )}
                <p>{course?.status}</p>
              </div>
            </Td>

            <Td>2 hr 30min</Td>
            <Td>${course?.price}</Td>
            <Td>
              <button
                disabled={loading}
                onClick={() =>
                  navigate(
                    `/dashboard/edit-course/${course?._id}`
                  )
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Do you want to delete this course?",
                    text2:
                      "All the data related to this course will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: !loading
                      ? () => handleCourseDelete(course?._id)
                      : () => {},
                    btn2Handler: !loading
                      ? () => setConfirmationModal(null)
                      : () => {},
                  })
                }
              >
                Delete
              </button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
