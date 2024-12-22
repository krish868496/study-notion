import React, { useEffect, useState } from "react";
import { removeDisplayPicture } from "../../../../../services/operations/profileApi";
import { setUser } from "../../../../../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = false,
  editData = false,
  className = "w-full h-auto",
  change = true,
}) => {
  const [preview, setPreview] = useState(viewData || editData || null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  console.log(preview);

  // useEffect(() => {
  //   // Register the input with react-hook-form
  //   register(name, { required: true });
  // }, [name, register]);

  useEffect(() => {
    if (editData) {
      setPreview(editData);
    }
  }, [editData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setValue(name, selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = async () => {
    setPreview(null);
    setValue(name, "");
    try {
      const res = await removeDisplayPicture(token);
      dispatch(setUser({ ...res, image: res.image }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...res, image: res.image })
      );
    } catch (error) {}
  };

  return (
    <div>
      <div className="mb-2">
        {preview ? (
          video ? (
            <video src={preview} controls className="w-full h-auto" />
          ) : (
            <img
              src={preview}
              alt="Uploaded file preview"
              className={className}
            />
          )
        ) : (
          // Placeholder if no image/video is uploaded
          ""
        )}
      </div>

      <div className="flex flex-col">
        {change && (
          <label
            htmlFor={name}
            className="text-[14px] text-richblack-5 leading-6 font-normal"
          >
            {label}
            <sup>*</sup>
          </label>
        )}

        {/* {errors[name] && (
        <span className="text-red-500">{name} is required.</span>
      )} */}
        {change ? (
          // <input type="file" onChange={handleFileChange} />
          <div class="relative w-[617px] h-[206px] p-[32px_12px] border border-t-0 border-l-0 border-r-0 border-b-0 rounded-tl-lg ">
            <input
              type="file"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-input"
              onChange={handleFileChange}
            />

            <div class="flex justify-center items-center h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
              <div class="text-center flex flex-col items-center">
                <FaCloudUploadAlt className="w-8 h-8 text-yellow-100" />
                <p class="text-richblack-5 text-[14px] leading-6 font-normal">
                  Drag and drop an image, or{" "}
                  <span className="text-yellow-100">Browse</span> <br /> Max 6MB
                  each (12MB for videos)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <label
              htmlFor={name}
              className="text-richblack-5 font-normal leading-6 text-[14px]"
            >
              {label}
              <sup>*</sup>
            </label>
            <div className="flex items-center gap-4">
              <div class="relative text-center text-[15px] lg:text-[13px] px-4 py-2 rounded-md font-semibold leading-6 lg:font-bold tracking-wide bg-yellow-50 text-black hover:scale-95 transition-all duration-200 cursor-pointer">
                Upload File
                <input
                  id="file-upload"
                  type="file"
                  class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-1.5 bg-richblack-500 text-richblack-5 rounded-md mt-5"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
