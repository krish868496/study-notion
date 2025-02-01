import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from "../../../../slices/cartSlice";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
      {cart.map((course, index) => (
        <React.Fragment key={index}>
          <div className="text-richblack-5 w-[792px] p-2 flex items-center justify-between border-b border-richblack-200 pb-5">
            <img
              src={course?.thumbnail}
              alt={`${course?.thumbnail} image`}
              className="w-[185px] h-[148px] object-cover rounded-md"
            />
            <div className="w-[407px]">
              <p className="text-lg font-semibold leading-7">
                {course?.courseName}
              </p>
              <p className="text-base font-normal leading-6 text-richblack-200">
                {course?.category?.name}
              </p>
              <div>
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <button
                className="flex items-center px-5 py-3 text-pink-200 rounded-md bg-[#161D29] border-richblack-600"
                onClick={() => dispatch(removeFromCart(course?._id))}
              >
                <RiDeleteBin6Line /> <span>Remove</span>
              </button>
              <p>Rs {course?.price}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RenderCartCourses;
