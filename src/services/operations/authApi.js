import { toast } from 'react-hot-toast'
import { setLoading, setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setUser } from '../../slices/profileSlice'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../apis'

const {
        SENDOTP_API,
        SIGNUP_API,
        LOGIN_API,
        RESETPASSTOKEN_API,
        RESETPASSWORD_API,
        PASSWORDCHANGE_API
} = endpoints

export function sendOtp(email, navigate) {
        return async (dispatch) => {
                // const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", SENDOTP_API, { email, checkUserPresent: true })
                        console.log(response);
                        if (!response?.data?.success) {
                                throw new Error(response?.data?.message)
                        }
                        toast.success("OTP sent successfully")
                } catch (error) {
                        console.log(error);
                        toast.error("OTP sending failed")

                }
                navigate('/verify-otp')
                dispatch(setLoading(false))
        }
}

export function login(email, password, navigate) {
        return async (dispatch) => {
                // const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", LOGIN_API, {
                                email, password
                        })
                        if (!response?.data?.success) {
                                toast.error("Login Failed", response?.data?.message)
                                throw new Error(response?.data?.message)
                        }
                        toast.success("Login Successful")
                        console.log(response?.data?.data)
                        dispatch(setToken(response?.data?.token))
                        const userImage = response?.data?.data?.image ?
                                response?.data?.data?.image : `https://api.dicebear.com/5.x/initial/svg?seed=${response?.data?.data?.firstName} ${response?.data?.data?.lastName}`
                        dispatch(setUser({ ...response?.data?.data, image: userImage }))
                        localStorage.setItem("token", JSON.stringify(response?.data?.token))
                        localStorage.setItem("user", JSON.stringify(response?.data?.data))
                        navigate("/dashboard/my-profile") 
                } catch (error) {
                        console.log(error);
                        toast.error("login failed")

                }
                dispatch(setLoading(false))

        }
}
export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, contactNumber, navigate) {
        return async (dispatch) => {
                // const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", SIGNUP_API, {
                                accountType, firstName, lastName, email, contactNumber, password, confirmPassword, otp,
                        })
                        if (!response?.data?.success) {
                                toast.error("Signup Failed", response?.data?.message)
                                throw new Error(response?.data?.message)
                        }

                        toast.success("Signup Successfully")
                        navigate('/login')
                } catch (error) {
                        console.log(error);
                        toast.error("login failed")

                }
                dispatch(setLoading(false))

        }
}


export function logout(navigate) {
        return (dispatch) => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                toast.success("logout successfully")
                dispatch(setToken(null))
                dispatch(setUser(null))
                // dispatch(resetCart())
                navigate("/")
        }
}

export function getResetToken(email, setEmailSend) {
        return async (dispatch) => {
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })
                        console.log(response, "response: ");
                        if (!response?.data?.success) {
                                toast.error("Reset password failed", response?.data?.message)
                                throw new Error(response?.data?.message)
                        }
                        toast.success("Reset Email sent successfully")
                        setEmailSend(true)
                } catch (error) {
                        console.log(error);
                        toast.error(error)
                }
                dispatch(setLoading(false))
        }

}
export function resetPassword(password, confirmPassword, token) {
        console.log(password, confirmPassword, token);
        return async (dispatch) => {
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token })
                        console.log(response, "response: ");
                        if (!response?.data?.success) {
                                toast.success("Password reset failed", response?.data?.message)
                                throw new Error(response?.data?.message)
                        }
                        toast.success("Password reset successfully")
                        // setEmailSend(true)
                } catch (error) {
                        console.log(error);
                        toast.error(error)
                }
                dispatch(setLoading(false))
        }

}
export function passwordChange(password, newPassword, confirmNewPassword, token) {
        return async (dispatch) => {
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", PASSWORDCHANGE_API, { password, newPassword, confirmNewPassword }, {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                        })
                        console.log(response, "response: ");
                        if (!response?.data?.success) {
                                toast.success("Password reset failed", response?.data?.message)
                                throw new Error(response?.data?.message)
                        }
                        toast.success("Password change successfully")
                        // setEmailSend(true)
                } catch (error) {
                        console.log(error);
                        toast.error(error)
                }
                dispatch(setLoading(false))
        }

}