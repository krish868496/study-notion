import React from "react";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../common/constant";
import { addToCart } from "../../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import MainButton from "../../common/MainButton";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { thumbnail, price } = course;
  function handleAddToCart() {
    console.log(this);
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Only students can add courses to cart");
      return;
    }
    if (token) {
      dispatch(addToCart(this));
      // return;
    }
    // setConfirmationModal({
    //   text1: "you are not logged in",
    //   text2: "Please login to add to cart",
    //   btnText: "Login",
    //   btn2Text: "Cancel",
    //   btn1Handler: () => navigate("/login"),
    //   btn2Handler: setConfirmationModal(null),
    // });
  }
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to clipboard");
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <img
          src={thumbnail}
          alt=""
          className="max-h-[300px] min-h-[180px] w-[400px] rounded-md"
        />
        <div className="flex flex-col gap-5 p-3">
          <p className="font-bold leading-9 text-richblue-5 text-[30px] font-inter">
            Rs. {price}
          </p>
          <MainButton
            onClick={
              user && course?.studentEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            active={true}
          >
            {user && course?.studentEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </MainButton>
          {!course?.studentEnrolled.includes(user?._id) && (
            <MainButton onClick={handleAddToCart.bind(course)}>
              Add to cart
            </MainButton>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-center">3-Day Money-Back Guarantee</p>
            <p>This Course includes:</p>
            <div className="flex flex-col gap-y-3">
              {course?.instructions?.map((item, index) => (
                <p
                  key={index}
                  className="flex gap-2 font-semibold text-caribbeangreen-800"
                >
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="text-lg font-semibold leading-7 tracking-wide text-center text-yellow-100">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
