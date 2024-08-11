import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import {RxCross1} from "react-icons/rx"
import IconBtn from "../../../../common/IconBtn";
import Upload from '../CourseInformation/Upload'

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    getValue,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("videoFile", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }
    setLoading(true);
    // api call
    const result = await updateSubSection(formData, token);
    
    if (result) {
      const updatedCourse = course?.courseContent?.map((section) => section?._id === modalData?.sectionId ? result : section)
      console.log(updatedCourse, "updated course");
      const updatedCourseDetails = {...course, courseContent: updatedCourse}
      // todo same check
      dispatch(setCourse(updatedCourseDetails));
    }
    setModalData(null);
    setLoading(false);
  };
  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubSection();
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);

    setLoading(true);

    //     api call
    const result = await createSubSection(formData, token);
    const updateCourse = course?.courseContent?.map((section) => section?._id === modalData ? result : section?.subSection)
    const updateCourseContent = {...course, courseContent:updateCourse}
    if (updateCourseContent) {
      // todo
      dispatch(setCourse(updateCourseContent));
    }
    setModalData(null);
    setLoading(false);

  };
  return (
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"}
            {add && "Adding"}
            {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div>
            <label htmlFor="">Lecture Title</label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter lectule Title"
              {...register("lectureTitle", { required: true })}
              className="w-full"
            />
            {errors.lectureTitle && <span>Lecture Title is required</span>}
          </div>
          <div>
            <label htmlFor="lectureDesc">Lecture Description</label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full min-h-[130px]"
            />
            {errors.lectureDesc && <span>Lecture description is required</span>}
          </div>
          {!view && (
            <div>
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
