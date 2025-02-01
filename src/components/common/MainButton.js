import React from "react";

const MainButton = ({ active, children, style = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        active
          ? "bg-yellow-100 text-richblack-900"
          : "text-richblack-5 bg-richblack-900"
      } shadow-custom-input py-3.5 px-6 rounded-md font-semibold ${style}`}
    >
      {children}
    </button>
  );
};

export default MainButton;
