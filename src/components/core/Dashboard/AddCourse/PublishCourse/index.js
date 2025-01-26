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
        console.log(getValues());
        console.log(getValues("publish"));
        console.log(getValues("public"));
    if (course?.status === COURSE_STATUS.PUBLISHED) setValue("public", true);
  }, []);
  const gotToCourses = () => {
    // dispatch(resetCourseState())
    navigate("/dashboard/my-courses");
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
      <h1 className="text-xl leading-9">Publish Course</h1>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <label htmlFor="public">
            <span>Make this course as public</span>
          </label>
          <input
            type="checkbox"
            id="public"
            {...register("public", { required: true })}
            className="w-4 h-4 rounded-md"
          />
        </div>
          <div className="flex justify-end gap-x-3">
            <IconBtn disabled={loading} onClick={goBack}>
              go back
            </IconBtn>
            <IconBtn disabled={loading} type="active">
              Save Changes
            </IconBtn>
          </div>
      </form>
    </div>
  );
};

export default PublishCourse;
