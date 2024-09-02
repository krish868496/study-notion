import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CTAButton from "../../HomePage/Button";
import { useForm } from "react-hook-form";
import Upload from "../AddCourse/CourseInformation/Upload";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("date", user?.date);
    setValue("gender", user?.gender);
    setValue("phone", user?.phone);
    setValue("email", user?.email);
    setValue("image", user?.image);
  }, []);

  const onsubmit = () => {};
  return (
    <div>
      <div className="">
        <div
          className=" gap-x-4 flex p-2 my-5 rounded-md border-[1px] 
       border-richblack-700 bg-richblack-800  text-richblack-5"
        >
          <Upload
            name="courseImage"
            label="Course Image"
            register={register}
            errors={errors}
            setValue={setValue}
            video={false}
            viewData={false}
            editData={user?.image}
            className="w-8 h-8 rounded-full"
          />
          <CTAButton>Remove</CTAButton>
        </div>
        <div
          className="flex flex-col my-5 justify-between rounded-md border-[1px] 
       border-richblack-700 bg-richblack-800  text-richblack-5"
        >
          <h2 className="m-4">Profile Information</h2>
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
          >
            <div className="flex gap-x-10">
              <div className="flex flex-col justify-between">
                <label htmlFor="">
                  First Name <sup>*</sup>{" "}
                </label>
                <input
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[270px] lg:w-[320px] focus:outline-none"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-red-500">First name is required</span>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <label htmlFor="">
                  Last Name <sup>*</sup>{" "}
                </label>
                <input
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[270px] lg:w-[320px] focus:outline-none"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-red-500">last name is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-x-10">
              <div className="flex flex-col justify-between">
                <label htmlFor="">
                  Date of Birth <sup>*</sup>{" "}
                </label>
                <input
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[270px] lg:w-[320px] focus:outline-none"
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Enter your first name"
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <span className="text-red-500">date is required</span>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <label htmlFor="">
                  Gender <sup>*</sup>{" "}
                </label>
                <input
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[270px] lg:w-[320px] focus:outline-none"
                  type="radio"
                  name="gender"
                  id="gender"
                  {...register("gender", { required: true })}
                />
                {errors.gender && (
                  <span className="text-red-500">last name is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-x-10">
              <div className="flex flex-col justify-between">
                <label htmlFor="">
                  Phone Number <sup>*</sup>{" "}
                </label>
                <input
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[270px] lg:w-[320px] focus:outline-none"
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone name"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-red-500">phone number is required</span>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <label htmlFor="">
                  Email <sup>*</sup>{" "}
                </label>
                <input
                  className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md w-[270px] lg:w-[320px] focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">email is required</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
