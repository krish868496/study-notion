import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart)

  return (
    <div>
      {cart.map((course, index) => (
        <div key={index}>
          <div className="text-richblack-5">
            <img src={course?.thumbnail} alt={course?.thumbnail} />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
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
          </div>

          <div>
            <button className="text-richblack-5" onClick={() => dispatch(course._id)}>
              <RiDeleteBin6Line /> <span>Remove</span>
            </button>
            <p>Rs {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
