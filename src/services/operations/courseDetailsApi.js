import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

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

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${COURSE_DETAILS_API}/${courseId}`
    );
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, courseId, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const fetchCourseCategories = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.allCategorys;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log(response);
    // if (!response?.data?.success) {
    //   toast.error(response.data.message);
    //   throw new Error(response.data.message);
    // }
    result = response?.data?.response;
    console.log(response, "response aa gya");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  console.log(data);
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  console.log(data, "this is my data for subsection");
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
    console.log(result);
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const updateSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
    console.log(response);
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
    console.log(response, "response ji");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  console.log(result);
  return result;
};

export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  // const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_ALL_INSTRUCTOR_COURSES_API,
      { token },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId);
  return result;
};

export const getFullDetailsOfCourse = async (courseId, token) => {
  // const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${GET_FULL_COURSE_DETAILS_AUTHENTICATED}/${courseId}`,
      {token},
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Optional, but ensures correct content type
      }
    );
    console.log(response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.response;
    return result;
  } catch (error) {
    console.log(error);
    toast.error("Failed to load course details");
  }
  // toast.dismiss(toastId);
};
