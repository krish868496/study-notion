import React, { useEffect, useState } from "react";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList]);
  const handleRemoveTag = (index) => {
    setTagList(tagList.filter((_, i) => i !== index));
  };
  const handleTags = () => {
    setTagList([...tagList, tags]);
    setTags("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTags();
    }
  };
  return (
    <div>
      {tagList.length > 0 && (
        <ul>
          {tagList.map((tag, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{tag}</span>
              <button
                className="text-xs text-pure-greys-300"
                onClick={() => handleRemoveTag(index)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      <label htmlFor="" className="text-richblack-5 font-normal leading-6 text-[14px]">
        {label}
        <sup>*</sup>
      </label>
      <input
        type="text"
        id={name}
        value={tags}
        placeholder={placeholder}
        onChange={(e) => setTags(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-[617px] py-6 px-4 text-richblack-50 bg-richblack-600 rounded-xl shadow-custom-input focus:border-none focus:outline-none"
      />
      {errors[name] && <span>{label} field is required.</span>}
    </div>
  );
};

export default ChipInput;
