import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  UPDATE_DISPLAY_PICTURE_API,
  REMOVE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_ACCOUNT,
} = profileEndpoints;

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.dismiss(toastId);
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

export async function updateDisplayPicture(image, token) {
  console.log(image);
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_DISPLAY_PICTURE_API,
      image,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.user;
    toast.dismiss(toastId);
    return result;
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}
export async function updateProfile(data, token) {
  console.log(data);
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log(response);
    result = response?.data?.response;
    toast.dismiss(toastId);
    return result;
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

export async function removeDisplayPicture(token) {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "PUT",
      REMOVE_DISPLAY_PICTURE_API,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.user;
    toast.dismiss(toastId);
    return result;
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

export async function deleteAccount(token) {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_ACCOUNT,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Account Deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}
