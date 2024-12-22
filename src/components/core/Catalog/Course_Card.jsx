import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

const Course_Card = ({ course, Height }) => {
  console.log(course)
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReview);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="w-[384px] ">
      <Link to={`/courses/${course?._id}`}>
        <div>
          <div>
            <img
              src={course?.thumbnail}
              alt="thumbnail"
              className={`${Height} w-[384px] rounded-xl object-cover h-[201px]`}
            />
          </div>
          <div className="my-2">
            <p className="text-[16px] leading-6 font-medium">
              {course?.courseName}
            </p>
            <p className="font-normal text-[16px] leading-6">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="font-normal leading-6 text-yellow-100">
              <span>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="font-normal leading-6 text-richblack-500">
                {course?.ratingAndReview?.length} Ratings
              </span>
            </div>
            <p className="text-[20px] leading-7 font-semibold font-inter text-richblack-5">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
