import {toast} from 'react-hot-toast'
import {setLoading, setToken} from '../../slices/authSlice'
import {resetCart} from '../../slices/cartSlice'
import {setUser} from '../../slices/profileSlice'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../apis'

const {
        SENDOTP_API,
        SIGNUP_API,
        LOGIN_API,
        RESETPASSTOKEN_API,
        RESETPASSWORDS_API,
} = endpoints

export function sendOtp(email, navigate){
        return async (dispatch) => {
                const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", SENDOTP_API, {email, checkUserPresent: true})
                        if(!response.data.success){
                                throw new Error(response.data.message)
                        }
                        toast.success("OTP sent successfully")
                } catch (error) {
                        console.log(error);
                        toast.error("OTP sending failed")
                        
                }
        }
}

export function login(email, password, navigate){
        return async (dispatch) => {
                const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", LOGIN_API, {
                                email, password
                        })
                        if(!response.data.success){
                                throw new Error(response.data.message)
                        }

                        toast.success("Login Successful")
                        dispatch(setToken(response.data.token))
                        const userImage = response.data.user.image ? 
                                response.data.user.image : `https://api.dicebear.com/5.x/initial/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
                                dispatch(setUser({...response.data.user, image: userImage}))
                                localStorage.setItem("token", JSON.stringify(response.data.token))
                                navigate("/dashboard/my-profile")
                } catch (error) {
                        console.log(error);
                        toast.error("login failed")
                        
                }

        }
}
export function signUp(accountType, fristName, lastName, email, password, confirmPassword, otp, navigate){
        return async (dispatch) => {
                const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", LOGIN_API, {
                                accountType, fristName, lastName, email, password, confirmPassword, otp,
                        })
                        if(!response.data.success){
                                throw new Error(response.data.message)
                        }

                        toast.success("Signup Successfully")
                        navigate('/login')
                        const userImage = response.data.user.image ? 
                                response.data.user.image : `https://api.dicebear.com/5.x/initial/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
                                dispatch(setUser({...response.data.user, image: userImage}))
                                localStorage.setItem("token", JSON.stringify(response.data.token))
                                navigate("/dashboard/my-profile")
                } catch (error) {
                        console.log(error);
                        toast.error("login failed")
                        
                }

        }
}


export function logout(navigate){
        return  (dispatch) => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                toast.success("logout successful")
                dispatch(setToken(null))
                dispatch(setUser(null))
                dispatch(resetCart())
                toast.success("Logged Out")
                navigate("/")
        }
}

export function getResetToken(email, setEmailSend){
        return async(dispatch) => {
                dispatch(setLoading(true))
                try {
                        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})
                        console.log(response, "response: ");
                        if(response.data.success) {
                                throw new Error(response.data.message)
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