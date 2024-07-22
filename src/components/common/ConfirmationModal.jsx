import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  console.log(modalData.btn2Handler);
  return (
    <>
      <div className="bg-richblack-700 text-richblack-5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 
       flex flex-col gap-5 rounded-lg p-5 py-10">
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div className="flex">
          <IconBtn onClick={modalData.btn1Handler}>
            {modalData.btn1Text}
          </IconBtn>
          <button onClick={modalData.btn2Handler}>{modalData.btn2Text}</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
