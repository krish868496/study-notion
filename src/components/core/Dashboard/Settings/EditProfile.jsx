import { useEffect } from "react";

const EditProfile = ({ register, errors, setValue, getValues, editData }) => {
  console.log(editData);
    useEffect(() => {
      if (editData) {

        // Convert DD.MM.YYYY format to YYYY-MM-DD
        let formattedDate = "";
        if (editData.date) {
          const [day, month, year] = editData.date.split(".");
          formattedDate = `${year}-${month}-${day}`;
        }
        setValue("date", formattedDate);
      }
    }, [editData]);
  return (
    <>
      <div
        className="flex flex-col my-5 justify-between rounded-md border-[1px] 
       border-richblack-700 bg-richblack-800  text-richblack-5"
      >
        <h2 className="m-4">Profile Information</h2>
        <div className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8">
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
                defaultValue={editData || ""}
                {...register("date", { required: true })}
              />
              {errors.date && (
                <span className="text-red-500">date is required</span>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <label htmlFor="">
                Gender <sup>*</sup>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md focus:outline-none"
                    type="radio"
                    name="gender"
                    value="Male"
                    {...register("gender", { required: true })}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="shadow-custom-input bg-[#161D29] px-6 py-2 rounded-md focus:outline-none"
                    type="radio"
                    name="gender"
                    value="Female"
                    {...register("gender", { required: true })}
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500">Gender is required</span>
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
        </div>
      </div>
    </>
  );
};

export default EditProfile;
