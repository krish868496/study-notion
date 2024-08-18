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
  console.log(course, "course");
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("SectionName", "");
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
    console.log("step")
    dispatch(setStep(3));
    console.log("step baad wala")
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
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id,
        },
        token
      );
    }
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
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };
  return (
    <div>
      <div className="text-richblack-5">
        <p>Course Builder form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="sectionName">
              Section name <sup>*</sup>
            </label>
            <input
              type="text"
              id="sectionName"
              placeholder="Add section name"
              {...register("sectionName", { required: true })}
              className="w-full text-richblack-900"
            />
            {errors.sectionName && (
              <span className="text-red-500">Section name is required</span>
            )}
          </div>
          <div className="mt-10 flex gap-x-5">
            <IconBtn
              type="submit"
              text={editSectionName ? "Edit Section Name" : "Create Section"}
              outline={true}
              customClasses={"text-white"}
            >
              <MdAddCircleOutline className="text-yellow-50" />
            </IconBtn>
            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-richblack-300 underline"
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
        <div className="flex gap-x-3">
          <button
            className="rounded-md cursor-pointer flex items-center "
            onClick={goBack}
          >
            Back
          </button>
          <IconBtn text="Next" onClick={goToNext}>
            <BiRightArrow />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
