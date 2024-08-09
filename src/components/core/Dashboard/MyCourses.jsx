import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi'
import IconBtn from '../../common/IconBtn'
import CoursesTable from './InstructorCourses/CoursesTable'

const MyCourses = () => {
        const {token} = useSelector((state) => state.auth)
        const navigate = useNavigate()
        const [courses, setCourses] = useState([])
        useEffect(() => {
                const fetchCourses = async () => {
                        const result = await fetchInstructorCourses(token);
                        if(result){
                                setCourses(result)
                        }
                }
                fetchCourses();
        }, [])
  return (
    <div>
        <div className='text-richblack-5'>
                <h1>My Courses</h1>
                <IconBtn 
                text="Add Courses"
                onClick = {() => navigate('/dashboard/add-course')}>
                        {/* aad icon  */}
                </IconBtn>
        </div>
        {courses && <CoursesTable courses = {courses} setCourses = {setCourses} />}
    </div>
  )
}

export default MyCourses