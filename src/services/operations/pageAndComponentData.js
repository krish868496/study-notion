import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId,
    });
    console.log(response)
    result = response?.data;
  } catch (error) {
    console.log(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
