import React from "react";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../common/constant";
import { addToCart } from "../../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { thumbnail, price } = course;
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Only students can add courses to cart");
      return;
    }
    if(token){
      dispatch(addToCart)
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to add to cart",
      btnText: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: setConfirmationModal(null),
    });
  };
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to clipboard");
  };
  return (
    <div>
      <div className="">
        {/* <img
          src={thumbnail}
          alt=""
          className="max-h-[300px] min-h-[180px] w-[400px] rounded-xl"
        /> */}
        <p>Rs. {price}</p>
        <button
          onClick={
            user && course?.studentEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user && course?.studentEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"}
        </button>
        {!course?.studentEnrolled.includes(user?._id) && (
          <button onClick={handleAddToCart}>Add to cart</button>
        )}
      </div>
      <div>
        <p>3-Day Money-Back Guarantee</p>
        <p>This Course includes:</p>
        <div className="flex flex-col gap-y-3">
          {course?.instructions?.map((item, index) => (
            <p key={index} className="flex gap-2">
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
      <div>
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
