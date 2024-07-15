import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdatePassword from './pages/VerifyOtp';
import VerifyEmail from './pages/VerifyEmail';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import PrivateRoute from './components/common/PrivateRouter';
import { ACCOUNT_TYPE } from './components/common/constant';
import { useSelector } from 'react-redux';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';

function App() {
  const user = useSelector((state) => state.auth.signupData)
  console.log(user);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='verify-email/:id' element={<VerifyEmail />} />
        <Route path='/reset-password/:id' element={<ResetPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
        {/* <Route element={<PrivateRoute>
          <Dashboard /></PrivateRoute>} >
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Settings />} />
          {
            user?.accountType = ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path='/dashboard/card' element={<Cart />} />
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
              </>
            )
          }

          {
            user?.accountType = ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path='/dashboard/add-course' element={<AddCourse />} />
              <Route path='/dashboard/my-courses' element={<MyCourses />} />
              <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
              </>
            )
          }
          <Route path='/dashboard/my-courses' element={<MyCourses />} />

          </Route>


        <Route element={<PrivateRoute><ViewCourse />
        </PrivateRoute>} >
          {
            user?.accountType = ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails />} />
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
              </>
            )
          }
        
        </Route> */}




        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
