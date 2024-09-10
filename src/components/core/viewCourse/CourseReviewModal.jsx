import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);
  const onSubmit = async () => {
    // await createRating(
    //   {
    //     courseId: courseEntireData._id,
    //     rating: data.courseRating,
    //     review: data.courseExperience,
    //   },
    //   token
    // );
  };

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };
  return (
    <div>
      <div>
        {/* Modal Header  */}
        <div>
          <p>Add Review</p>
          <button onClick={setReviewModal(false)}>Close</button>
          {/* modal body  */}
          <div>
            <img
              src={user?.image}
              className="aspect-square w-[50px] rounded-full object-cover"
              alt="profile picture"
            />
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>Posting publicly</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReactStars
            count={5}
            onchange={ratingChanged}
            size={24}
            activeColor="#ff070"
          />

          <div>
            <label htmlFor="courseExperiance">Add your Experiance</label>
            <textarea
              name=""
              id="courseExperiance"
              placeholder="Add your experiance here"
              {...register("courseExperiance", { required: true })}
              className="form-style min-h-[130px] w-full"
            />
            {errors.courseExperience && <span>Please Add your experience</span>}
          </div>
          {/* cancel and save button  */}
          <div>
            <button onClick={() => setReviewModal(false)}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
