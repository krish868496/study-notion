import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { CiSettings } from "react-icons/ci";
import { FaAngleDoubleLeft, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState();

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner "></div>
      </div>
    );
  }
  return (
    <div className="">
      <FaBars
        onClick={() => setOpen(true)}
        className="text-richblack-5 text-2xl absolute top-2 left-5 cursor-pointer"
      />
      <div
        className={`lg:flex min-w-[222px] flex-col border-r-[1ppx] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 lg:py-10 py-5  absolute transition duration-0 ${
          open
            ? "duration-700 translate-x-0"
            : "-translate-x-[222px] duration-700 "
        }`}
      >
        <FaAngleDoubleLeft
          onClick={() => setOpen(false)}
          className="text-2xl text-richblack-5 absolute top-1 right-2 cursor-pointer"
        />
        <div className="flex-col flex mt-2">
          {sidebarLinks.map((link, index) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink link={link} iconName={link.icon} key={link.id} />
            );
          })}
        </div>
        <div
          className="mx-auto mt-6 mb-6 
         h-[1px] w-10/12 bg-richblack-600"
        ></div>
        <div className="flex flex-col gap-3 my-4">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName={<CiSettings />}
          />
        </div>
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be log out of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => {
                dispatch(logout(navigate));
                setConfirmationModal(null);
              },
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="text-sm font-medium, text-richblack-300 "
        >
          <div className="flex items-center gap-x-3 pl-6">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
