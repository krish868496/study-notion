import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FaUserEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <h1 className="lg:text-[30px] lg:leading-[38px] text-richblack-5 font-medium">
        My Profile
      </h1>
      <div className=" rounded-lg border-[1px] border-richblack-800 lg:p-6 p-3 flex gap-5 justify-between items-center bg-richblack-800">
        <div className="flex items-center gap-3 lg:gap-4">
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
            <p className="text-sm text-richblack-200">{user?.email}</p>
          </div>
        </div>
        <IconBtn onClick={() => navigate("/dashboard/settings")}>
          <FaUserEdit className="text-2xl" />
        </IconBtn>
      </div>

      {/* section 3  */}
      <div className=" rounded-lg border-[1px] border-richblack-800 p-6 flex flex-col gap-5 justify-between items-center bg-richblack-800">
        <div className="flex justify-between w-full">
          <p className="text-lg font-bold leading-6 text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <FaUserEdit className="text-2xl" />
          </IconBtn>
        </div>
        <div className="flex w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody>
              <tr>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 lg:px-6 lg:py-4 whitespace-nowrap text-richblack-300">
                  First Name
                  <div className="text-sm font-bold leading-5 text-richblack-5">
                    {user?.firstName}
                  </div>
                </td>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 lg:px-6 lg:py- whitespace-nowrap text-richblack-300">
                  Last Name
                  <div className="text-sm font-bold leading-5 text-richblack-5">
                    {user?.lastName ?? "Add last name"}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 lg:px-6 lg:py- whitespace-nowrap text-richblack-300">
                  Email
                  <div className="text-sm font-bold leading-5 text-richblack-5">
                    {user?.email}
                  </div>
                </td>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 lg:px-6 lg:py- whitespace-nowrap text-richblack-300">
                  Phone Number
                  <div className="text-sm font-bold leading-5 text-richblack-5">
                    {user?.additionalDetails?.contactNumber ??
                      "Add contact number"}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 lg:px-6 lg:py- whitespace-nowrap text-richblack-300">
                  Gender
                  <div className="text-sm font-bold leading-5 text-richblack-5">
                    {user?.additionalDetails?.gender ?? "Add gender"}
                  </div>
                </td>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 lg:px-6 lg:py- whitespace-nowrap text-richblack-300">
                  Date of Birth
                  <div className="text-sm font-bold leading-5 text-richblack-5">
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
