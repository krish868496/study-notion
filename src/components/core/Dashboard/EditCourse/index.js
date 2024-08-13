import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {setCourse, setEditCourse} from '../../../../slices/courseSlice'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsApi';
import RenderSteps from '../AddCourse/RenderSteps';

const EditCourse = () => {
  const dispatch = useDispatch();
  const {courseId} = useParams();
  console.log(courseId);
  const {course} = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true)
      const response = await getFullDetailsOfCourse(courseId, token);
      if(response?.courseDetails){
        dispatch(setEditCourse(true))
        dispatch(setCourse(response?.courseDetails))
      }
     setLoading(false)
    }
    populateCourseDetails()
  }, [])

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className='text-richblack-5'>
        <h1>Edit Course</h1>
        <div className="">
          {
            course ? (<RenderSteps />) : (<p>Course not found</p>)
          }
        </div>
    </div>
  )
}

export default EditCourse