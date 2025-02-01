import React, { useState } from "react";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/StudentFeaturesAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RenderTotalAmount = () => {
  // const { total } =
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const {total} = useSelector((state) => state.cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = [];
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    //     todo: api integrate -> payment gateway
    buyCourse(token, courses, user, navigate, dispatch);
  };
  return (
    <div className="flex flex-col gap-4 p-3 rounded-lg bg-richblack-600 border-richblack-700">
      <p className="text-sm leading-4 text-richblack-200">Total:</p>
      <p className="text-2xl font-semibold leading-9 text-yellow-200">Rs {total}</p>
      <IconBtn
        onClick={handleBuyCourse}
        type="active"
      >
        Buy Now
      </IconBtn>
    </div>
  );
};

export default RenderTotalAmount;
