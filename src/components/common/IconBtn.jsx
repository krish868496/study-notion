import React from "react";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children ? (
        <>
          <span className="">{text}</span>
          {children}
        </>
      ) : (
        <span className="text-richblack-5">{text}</span>
      )}
    </button>
  );
};

export default IconBtn;
