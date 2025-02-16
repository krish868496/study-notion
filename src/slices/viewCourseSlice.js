import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        courseSectionData: [],
        courseEntireData: [],
        completedLectures: [],
        updateLecture: [],
        totalNoOfLectures: 0,
}


const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.updateLecture = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
  },
});

export const { setCourseSectionData, setEntireCourseData, setCompletedLectures, updateCompletedLectures, setTotalNoOfLectures } = viewCourseSlice.actions

export default viewCourseSlice.reducer