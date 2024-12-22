import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };
  // remove one element using splice
  const handleRemoveRequirement = (index) => {
    const updateRequirement = [...requirementList];
    //  const data = updateRequirement.filter((req, ind) =>
    //   {
    //     console.log(req);
    //     return  ind !== index;
    //   })
    // setRequirementList(data);
    updateRequirement.splice(index, 1);
    setRequirementList(updateRequirement);
  };

  return (
    <>
      <label htmlFor="">
        {label}
        <sup>*</sup>
      </label>
      <input
        type="text"
        id={name}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        className="w-[617px] py-6 px-4 text-richblack-50 bg-richblack-600 rounded-xl shadow-custom-input focus:border-none focus:outline-none"
        placeholder="Enter requirement of the course"
      />
      <button
      type="button"
        className="font-semibold text-yellow-50"
        onClick={handleAddRequirement}
      >
        Add
      </button>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                className="text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <span>{label} is required</span>}
    </>
  );
};

export default RequirementField;
