import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const VideoDetails = () => {
        const location = useLocation();
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completeLectures } = useSelector(
    (state) => state.viewCourse
  );
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId && sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        // let assume all fields are present
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        const filteredVideoData = filteredData?.[0].subsection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex((data) => data._id === subSectionId)
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
  };
  const isLastVideo = () => {
     const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
      const noOfSubSections = courseSectionData[
        currentSectionIndex
      ].subsection.length;
      const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex((data) => data._id === subSectionId)
      if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1){
        return true;
      }
      else{
        return false;
      }
  };
  const gotToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex((data) => data._id === subSectionId)
    if(currentSubSectionIndex !== noOfSubSections - 1){
      // same section ki next video me jao 
      const nextSubSectionId = courseSectionData[currentSectionIndex].subsection[currentSectionIndex + 1]._id;
      // nexxt video pr jao 
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      // diff section ki frist video 
      const nextSectionId = courseSectionData[currentSectionIndex + 1];
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subsection[0]._id;
      // is video pr jao 
      navigate(`/view-course/${courseId}/section/${nextSectionId}/subsection/${nextSubSectionId}`)
    }
  };
  const gotToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subsection.length;
        const currentSubSectionIndex = courseSectionData[
          currentSectionIndex
        ].subSectionId.findIndex((data) => data._id === subSectionId);
        if (currentSectionIndex === 0 && currentSubSectionIndex != 0) {
          // same section prevvideo 
          const prevSubSectionId = courseSectionData[currentSectionIndex].subsection[currentSubSectionIndex - 1]

           navigate(
             `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
           );
        } else {
          const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
          const prevSubSectionLength = courseSectionData[currentSectionIndex -1].subsection.length;
          const prevSubSectionId = courseSectionData[currentSectionIndex -1].subsection[prevSubSectionLength -1]._id;
           navigate(
             `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
           );
        }
  };
  const handleLectureCompletion = () => {};
  return <div></div>;
};

export default VideoDetails;
