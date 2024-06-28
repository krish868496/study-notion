import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* section 1  */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
        <Link to={"/signup"}>
          <div className="mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
      </div>

      {/* section 2  */}
      {/* section 3  */}
      {/* footer  */}
    </div>
  );
};

export default Home;
