import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../common/constant";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course, step } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const goBack = () => {
    dispatch(setStep(2));
  };
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) setValue("public", true);
  }, []);
  const gotToCourses = () => {
    // dispatch(resetCourseState()) 
    navigate('/dashboard/my-course')
  };
  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no updation in form
      // no need to make api call
      gotToCourses();
      return;
    }
    // if form is updated
    const formData = new FormData();
    formData.append("courseId", course?._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);

    const result = await editCourseDetails(formData, token);
    console.log(result);
    if (result) {
      gotToCourses();
      
    }
    setLoading(false);
  };
  const onsubmit = () => {
    handleCoursePublish();
  };
  return (
    <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-richblack-5">
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label htmlFor="public">
            <span>Make this course as public</span>
          </label>
          <input
            type="checkbox"
            id="public"
            {...register("public", { required: true })}
            className="rounded-md h-4 w-4"
          />
          <div className="flex justify-end gap-x-3">
            <button disabled={loading} type="button" onClick={goBack}>
              go back
            </button>
            <IconBtn disabled={loading} text="Save Changes" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
