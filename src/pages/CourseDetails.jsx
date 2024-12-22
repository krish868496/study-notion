import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/StudentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsApi";
import GetAvgRating from "../utils/avgRating";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  console.log(courseId);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));
  const {
    _id: Course_id,
    courseName,
    courseDescription,
    thumbnail = "",
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData || {};

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e.id != id)
    );
  };
  useEffect(() => {
    try {
      const getCourseFullDetails = async () => {
        const response = await fetchCourseDetails(courseId);
        if (response) {
          setCourseData(response);
        }
      };
      getCourseFullDetails();
    } catch (error) {}
  }, [courseId]);

  const [reviewCount, setReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(courseData?.ratingAndReview);
    setReviewCount(count);
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseData?.courseContent?.forEach((section) => {
      lectures += section.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures); // update total lectures when courseData changes  // or use useMemo to avoid unnecessary re-renders
  }, [courseData]);

  const handleBuyCourse = async () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to purchase the course",
      btnText: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-richblack-5">
      <div className="relative flex justify-start">
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        <div>
          <span>
            <p>{reviewCount}</p>
          </span>
          <RatingStars Review_Count={reviewCount} Star_Size={24} />
          <span>{`(${ratingAndReview?.length})`}</span>
          <span>{`(${studentsEnrolled?.length})`}</span>
        </div>

        <div>
          <p>Created By {instructor?.firstName}</p>
        </div>
        <div>
          <p>Created At {createdAt}</p>
          <p>English</p>
        </div>
        <div className="">
          <CourseDetailsCard
            course={courseData}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
      <div className="">
        <p>What you will Learn</p>
        <div>{whatYouWillLearn}</div>
      </div>
      <div>
        <div>
          <p>Course Content:</p>
          <div className="flex justify-between gap-x-3">
            <div>
              <span>{courseContent.length} Section(S)</span>
            </div>
            <div>{totalNoOfLectures}</div>
            <div>{courseData?.data?.totalDuration} total length</div>
          </div>
          <button onClick={() => setIsActive([])}>Collapse all Sections</button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal />}
    </div>
  );
};

export default CourseDetails;
