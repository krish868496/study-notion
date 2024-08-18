import React, { useState } from "react";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/StudentFeaturesAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RenderTotalAmount = () => {
  // const { total } =
  const {token} = useState((state) => state.auth)
  const {user} = useState((state) => state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = []
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
//     todo: api integrate -> payment gateway 
buyCourse(token, courses, user, navigate, dispatch)
  };
  return (
    <div>
      <p>Total:</p>
      {/* <p>Rs {total}</p> */}
      <IconBtn
        text={"Buy Now"}
        onClick={handleBuyCourse}
        customClasses={"w-full justify--center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
