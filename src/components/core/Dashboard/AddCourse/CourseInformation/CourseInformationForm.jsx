import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { setStep, setCourse } from "../../../../../slices/courseSlice";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../common/constant";
import ChipInput from "./ChipInput";
import Upload from "./Upload";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString()
    )
      return true;
    else return false;
  };

  // handle next button click
  const onsubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData?.append("courseId", course._id);
        // will append only that value are changed
        if (currentValues.courseTitle !== course.courseName) {
          formData?.append("courseName", data?.courseTitle);
        }
        if (currentValues.courseTags !== course.tag) {
          formData?.append("tag", data?.courseTags);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData?.append("courseDescription", data?.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData?.append("price", data?.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData?.append("whatYouWillLearn", data?.courseBenefits);
        }

        if (currentValues.courseCategory !== course.category) {
          formData?.append("category", data?.courseCategory);
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData?.append("thumbnail", data?.courseImage);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData?.append(
            "instructions",
            JSON.stringify(data?.courseRequirements)
          );
           formData?.append("status", COURSE_STATUS.DRAFT);
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the course");
      }
      return;
    }
    // add or update course
    const formData = new FormData();
    formData?.append("courseName", data?.courseTitle);
    formData?.append("courseDescription", data?.courseShortDesc);
    formData?.append("price", data?.coursePrice);
    formData?.append("whatYouWillLearn", data?.courseBenefits);
    formData?.append("category", data?.courseCategory);
    formData?.append("instructions", JSON.stringify(data?.courseRequirements));
    formData?.append("thumbnailImage", data?.courseImage);
    formData?.append("tag", data?.courseTags);
    formData?.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div>
          <label htmlFor="">
            Course Title <sup>*</sup>{" "}
          </label>
          <input
            type="text"
            name="courseTitle"
            id="courseTitle"
            placeholder="Enter course title"
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <span className="text-red-500">Course Title is required</span>
          )}
        </div>

        <div>
          <label htmlFor="">
            Course Short Description <sup>*</sup>{" "}
          </label>
          <textarea
            name="courseShortDesc"
            id="courseShortDesc"
            placeholder="Enter course description"
            {...register("courseShortDesc", { required: true })}
            className="min-w-[140px] w-full"
          />
          {errors.courseShortDesc && (
            <span className="text-red-500">
              Course Short Description is required
            </span>
          )}
        </div>

        <div className="relative">
          <label htmlFor="">
            Course Price <sup>*</sup>{" "}
          </label>
          <textarea
            name="coursePrice"
            id="coursePrice"
            placeholder="Enter course price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="min-w-[140px] w-full"
          />
          <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
          {errors.courseShortDesc && (
            <span className="text-red-500">Course price is required</span>
          )}
        </div>

        <div>
          <label htmlFor="courseCategory">
            Course Category <sup>*</sup>{" "}
          </label>
          <select
            id="courseCategory"
            name="courseCategory"
            defaultValue=""
            {...register("courseCategory", { required: true })}
          >
            <option disabled value="">
              Choose a Category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option value={category?._id} key={index}>
                  {category?.name}
                </option>
              ))}
          </select>

          {errors.courseCategory && (
            <span className="text-red-500">Course category is required</span>
          )}
        </div>
        {/* create a custom component for handling tag input  */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags and press enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* create a component for uploading and showing preview of media  */}
        <Upload
          name="courseImage"
          label="Course Image"
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Benefits of the course  */}
        <div>
          <label htmlFor="">Benefits of the course</label>
          <textarea
            name=""
            id="courseBenefits"
            placeholder="Enter Benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="min-h-[130px] w-full"
          />
          {errors.courseBenefits && (
            <span>Benefits of the course are required</span>
          )}
        </div>
        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <div className="">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="flex items-center gap-x-2 bg-richblack-300"
            >
              Continue Without Saving
            </button>
          )}
          <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
        </div>
      </form>
    </>
  );
};

export default CourseInformationForm;
