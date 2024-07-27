import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user, "user");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10">
      <h1 className="lg:text-[30px] lg:leading-[38px] text-richblack-5 font-medium">
        My Profile
      </h1>
      <div className=" rounded-lg border-[1px] border-richblack-800 p-6 flex gap-5 justify-between items-center bg-richblack-800">
        <div className="flex lg:gap-4 items-center">
          <img
            src={user?.image}
            alt={`profile-${user?.image}`}
            className="aspect-square w-[78px] 
         rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-normal text-richblack-5">
              {user?.firstName + "" + user?.lastName}
            </p>
            <p className="text-richblack-200 text-sm">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text={"Edit"}
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>
      {/* section 2  */}
      <div className=" rounded-lg border-[1px] border-richblack-800 p-6 flex flex-col gap-10 bg-richblack-800">
        <div className="flex justify-between">
          <p className="font-bold text-lg leading-6 text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          />
        </div>
        <p className="text-sm text-richblack-300 font-normal">
          {user?.additionalDetails?.about ?? "Write Something about yourself"}
        </p>
      </div>
      {/* section 3  */}
      <div className=" rounded-lg border-[1px] border-richblack-800 p-6 flex flex-col gap-5 justify-between items-center bg-richblack-800">
        <div className="flex justify-between w-full">
          <p className="font-bold text-lg leading-6 text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          />
        </div>
        <div className="w-full flex">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-richblack-300">
                  First Name
                  <div className="text-richblack-5 font-bold text-sm leading-5">{user?.firstName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-richblack-300">
                  Last Name
                  <div className="text-richblack-5 font-bold text-sm leading-5">
                    {user?.lastName ?? "Add last name"}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-richblack-300">
                  Email
                  <div className="text-richblack-5 font-bold text-sm leading-5">{user?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-richblack-300">
                  Phone Number
                  <div className="text-richblack-5 font-bold text-sm leading-5">
                    {user?.additionalDetails?.contactNumber ??
                      "Add contact number"}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-richblack-300">
                  Gender
                  <div className="text-richblack-5 font-bold text-sm leading-5">
                    {user?.additionalDetails?.gender ?? "Add gender"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-richblack-300">
                  Date of Birth
                  <div className="text-richblack-5 font-bold text-sm leading-5">
                    {user?.additionalDetails?.dateOfBirth ??
                      "Add Date of birth"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;