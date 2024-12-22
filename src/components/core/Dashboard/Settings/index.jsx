import React, { useEffect } from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CTAButton from "../../HomePage/Button";
import {
  updateDisplayPicture,
  updateProfile,
} from "../../../../services/operations/profileApi";
import { setUser } from "../../../../slices/profileSlice";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Initialize form values with user data
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("date", user?.additionalDetails?.dateOfBirth);
      setValue("gender", user?.additionalDetails?.gender);
      setValue("phone", user?.additionalDetails?.contactNumber);
      setValue("email", user.email);
      setValue("image", user.image);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    if (data.dateOfBirth) {
      const date = new Date(data.dateOfBirth);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      data.dateOfBirth = formattedDate;
    }

    const currentValues = getValues();
    const formData = new FormData();
    console.log(currentValues);

    // Check if profile picture has changed
    if (currentValues.image !== user.image) {
      formData.append("displayPicture", data?.image);
      try {
        const res = await updateDisplayPicture(formData, token);
        dispatch(setUser(res));
        localStorage.setItem("user", JSON.stringify(res));
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }

    // Check other fields for changes
    let hasUpdates = false;
    if (currentValues.firstName !== user.firstName) {
      formData.append("firstName", data.firstName);
      hasUpdates = true;
    }
    if (currentValues.lastName !== user.lastName) {
      formData.append("lastName", data.lastName);
      hasUpdates = true;
    }
    if (currentValues.email !== user.email) {
      formData.append("email", data.email);
      hasUpdates = true;
    }
    if (currentValues.phone !== user?.additionalDetails?.contactNumber) {
      formData.append("contactNumber", data.phone);
      hasUpdates = true;
    }
    if (currentValues.gender !== user?.additionalDetails?.gender) {
      formData.append("gender", data.gender);
      hasUpdates = true;
    }
    if (currentValues.date !== user?.additionalDetails?.dateOfBirth) {
      formData.append("dateOfBirth", data.date);
      hasUpdates = true;
    }

    // Call updateProfile API only if there are updates
    if (hasUpdates) {
      try {
        const res = await updateProfile(formData, token);
        dispatch(
          setUser({
            ...user,
            additionalDetails: {
              ...res,
            },
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            additionalDetails: {
              ...res,
            },
          })
        );
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  return (
    <div className="text-richblack-5">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChangeProfilePicture
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
          editData={user?.image}
        />
        <EditProfile
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
          editData={user?.additionalDetails?.dateOfBirth}
        />
        {/* delete account  */}
        <DeleteAccount token={token} />

        <CTAButton button={true} active={true}>
          Save
        </CTAButton>
      </form>
    </div>
  );
};

export default Settings;
