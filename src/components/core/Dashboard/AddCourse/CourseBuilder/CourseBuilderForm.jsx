import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsApi";
import {
  setStep,
  setEditCourse,
  setCourse,
} from "../../../../../slices/courseSlice";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course, step } = useSelector((state) => state.course);
  console.log(course);
  console.log(course.courseContent);
  console.log(course.courseContent.length);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", " ");
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one subsection to each section");
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  };
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      // we are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
      console.log(result);
    } else {
      if (data.sectionName === "") {
        toast.error("Section name cannot be empty");
        return;
      }
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id,
        },
        token
      );
    }
    console.log(result);
    // update value
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // when click on second time it edit section name will be equal to second id and hit the execute the cancel edit  funciton
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setValue("sectionName", sectionName);
    setEditSectionName(sectionId);
  };
  return (
    <div>
      <div className="rounded-lg text-richblack-5 bg-richblack-800 w-[600px] p-5 border-richblack-700 min-h-[250px] flex flex-col gap-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label htmlFor="sectionName">
              Course Builder <sup>*</sup>
            </label>
            <input
              type="text"
              id="sectionName"
              placeholder="Add section name"
              {...register("sectionName", { required: true })}
              className="w-[547px] py-6 px-4 text-richblack-50 bg-richblack-600 rounded-xl shadow-custom-input focus:border-none focus:outline-none mt-3"
            />
            {errors.sectionName && (
              <span className="text-red-500">Section Name is required</span>
            )}
          </div>
          <div className="flex mt-10 gap-x-5">
            <IconBtn type="submit" outline={true} customClasses={"text-white"}>
              {editSectionName ? "Edit Section Name" : "Create Section"}{" "}
              <MdAddCircleOutline className="text-yellow-50" />
            </IconBtn>
            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm underline text-richblack-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {course?.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )}
        <div className="flex justify-end my-5 gap-x-8">
          <IconBtn onClick={goBack}>Back</IconBtn>
          <IconBtn onClick={goToNext} type="active">
            Next <BiRightArrow />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
