import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,

  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_AP,
} = courseEndpoints;

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to load course details");
  }
  toast.dismiss(toastId);
};
