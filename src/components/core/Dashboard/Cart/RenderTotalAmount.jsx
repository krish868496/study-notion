import React from "react";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  // const { total } =
  const cart = []
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
//     todo: api integrate -> payment gateway 
    console.log(courses);
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
