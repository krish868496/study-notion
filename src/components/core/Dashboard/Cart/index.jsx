import React from "react";
import { useSelector } from "react-redux";
import RenderTotalAmount from "./RenderTotalAmount";
import RenderCartCourses from "./RenderCartCourses";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);
  console.log(total, totalItems);
  return (
    <div>
      <h1 className="text-3xl font-medium mb-14 text-richblack-5 ">
        Your Cart
      </h1>
      <p className="pb-2 font-semibold border-b border-b-richblack-400 text-richblue-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="flex items-start mt-5 item gap-x-10 gap-y-6">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="my-5 text-xl leading-9 text-center text-richblack-5">
          Your Cart is Empty
        </p>
      )}
    </div>
  );
};

export default Cart;
