CourseDetailsCard;
import React from "react";
import { useSelector } from "react-redux";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { thumbnail, price } = course;
  const handleAddToCart = () => {
        
  }
  return (
    <div>
      <img
        src={thumbnail}
        alt=""
        className="max-h-[300px] min-h-[180px] w-[400px] rounded-xl"
      />
      <p>Rs. {price}</p>
      <button
        onClick={
          user && course?.studentEnrolled.includes(user?._id)
            ? () => Navigate("/dashboard/enrolled-courses")
            : handleBuyCourse
        }
      >
        {user && course?.studentEnrolled.includes(user?._id)
          ? "Go to Course"
          : "Buy Now"}
      </button>
      {
        (
                !course?.studentEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}>Add to cart</button>
                )
        
      }
    </div>
  );
};

export default CourseDetailsCard;
