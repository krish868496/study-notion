import React from "react";
import { Link } from "react-router-dom";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  type,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-3 px-8 py-3.5 rounded-lg  font-semibold ${
        type === "active"
          ? "bg-yellow-200 text-black leading-7 tracking-wide shadow-iconBtn-shadow"
          : type === "border"
          ? "text-yellow-200"
          : "bg-richblack-600 text-white shadow-iconBtn-shadow"
      }`}
      {...props}
    >
      {text} {children}
    </button>
  );
};

export default IconBtn
