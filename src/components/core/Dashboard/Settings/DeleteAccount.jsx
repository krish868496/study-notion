import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteAccount } from "../../../../services/operations/profileApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../services/operations/authApi";

const DeleteAccount = ({token}) => {
  const [confirmationModal, setConfirmationModal] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="bg-[#340019] border border-solid border-[#691432] flex gap-5 p-5 my-5">
      <div className="flex w-[52px] h-[52px] justify-center items-center rounded-full bg-[#691432] ">
        <RiDeleteBinLine className="text-[24px]" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-richblack-5 font-bold text-[18px] leading-[26px]">
          Delete Account
        </h2>
        <p className=" text-pink-25">Would you like to delete account?</p>
        <p className=" text-pink-25">
          This account contains Paid Courses. Deleting your account will remove
          all the <br /> contain associated with it.
        </p>

        <button
          type="button"
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2:
                "You account will be deleted and you won't about to access your account",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: async() => {
                try {
                  await deleteAccount(token);
                   dispatch(logout(navigate));
                } catch (error) {
                  console.log(error);
                  toast.error(error);
                }
                setConfirmationModal(null);
              },
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="text-sm font-medium, text-richblack-300 "
        >
          <p className="font-medium text-[16px] text-pink-400">
            I want to delete my account.
          </p>
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default DeleteAccount;
