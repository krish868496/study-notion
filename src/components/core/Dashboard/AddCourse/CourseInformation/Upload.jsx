import React, { useEffect, useState } from "react";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video,
  viewData,
  editData,
}) => {
  const [preview, setPreview] = useState(viewData || editData || null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Register the input with react-hook-form
    register(name, { required: true });
  }, [name, register]);

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
        setFile(selectedFile);
        setPreview(reader.result);
        setValue(name, selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>
      {preview && (
        <div className="mb-2">
          {video ? (
            <video src={preview} controls className="w-full h-auto" />
          ) : (
            <img src={preview} alt="Preview" className="w-full h-auto" />
          )}
        </div>
      )}
      <input
        type="file"
        id={name}
        // accept={video ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {errors[name] && (
        <span className="text-red-500">{name} is required.</span>
      )}
    </div>
  );
};

export default Upload;
