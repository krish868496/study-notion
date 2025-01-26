import React, { useState } from "react";
import { useSelector } from "react-redux";

const MyForm = () => {
  // const [isOpened, setIsOpened] = useState(false);
  const section = useSelector((state) => state.form)
  console.log(section)

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  return (
    <div>
      <h1>My Form</h1>
      <input type="text" placeholder="Enter your name" />
      <input type="email" placeholder="Enter your email address" />
      <button
        className="px-6 py-3 text-black bg-yellow-50"
        onClick={() => setIsOpened(!isOpened)}
      >
        Create Section
      </button>
      {/* {isOpened && (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Enter your address"
              name="address"
            />
            <input type="text" placeholder="Enter your city" name="city" />
          </div>
          <div className="flex gap-5">
            <input type="state" placeholder="Enter your state" name="state" />
            <input type="zip" placeholder="Enter your zip" name="zip" />
          </div>
          <button>Submit</button>
        </form>
      )} */}
    </div>
  );
};

export default MyForm;
