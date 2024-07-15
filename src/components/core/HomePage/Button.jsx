import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto, button=false}) => {
  return (
    <>
      {button ? (
        <button type="submit">
          <div
            className={`text-center text-[15px] lg:text-[13px] px-6 py-3 rounded-md font-semibold leading-6 lg:font-bold tracking-wide ${
              active ? "bg-yellow-50 text-black" : "bg-richblack-800 "
            } hover:scale-95 transition-all duration-200`}
          >
            {children}
          </div>
        </button>
      ) : (
        <Link to={linkto}>
          <div
            className={`text-center text-[15px] lg:text-[13px] px-6 py-3 rounded-md font-semibold leading-6 lg:font-bold tracking-wide ${
              active ? "bg-yellow-50 text-black" : "bg-richblack-800 "
            } hover:scale-95 transition-all duration-200`}
          >
            {children}
          </div>
        </Link>
      )}
    </>
  );
}

export default Button