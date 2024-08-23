import React from "react";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
  icon
}) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children ? (
        <>
          <span className="text-richblack-5">{icon ? icon : text}</span>
          {children}
        </>
      ) : (
        <span className="text-richblack-5">{icon ? icon : text}</span>
      )}
    </button>
  );
};

export default IconBtn
