import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';





function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [message, setMessage] = useState('')
    const [userExistMessage, setUserExistsMessage] = useState('');
    const [resetButton, setResetButton] = useState('disabled')
    const [emailField, setEmailField] = useState('true')
    const [loading, setLoading] = useState(false)
    const [redirecting,setRedirecting]=useState(false)
    const navigate = useNavigate('')


    useEffect(() => {
        checkUser()
    }, [email])

    async function checkUser() {
        setMessage('')
        if (!email) {
            return
        }
        setLoading(true)
        await axios.get(`https://sign-in-backend-rose.vercel.app/checkmail?email=${email}`)
            .then(response => {
                setLoading(false)
                if (response.status == 200) {
                    if (response.data.sucess == 'disabled') {
                        setLoading(false)
                        setUserExistsMessage('')
                        setResetButton('')
                        setMessage('')
                        return
                    } else if (response.data.sucess == '') {
                        setResetButton('disabled')
                        return setUserExistsMessage('Email not registered please signup.')
                    }
                }

            })
            .catch(error => {
                setLoading(false)
                if (error.response) {
                    if (error.response.data == 400 || error.response.data == 500) {
                        return setMessage(error.response.data.message)
                    }
                }
            })

    }

    async function sendOtp() {
        setMessage('')
        if (!email) {
            return setMessage('Please enter your email-address.')
        }
        setLoading(true)
        await axios.post('https://sign-in-backend-rose.vercel.app/sendotp', { email })
            .then(response => {
                setLoading(false)
                if (response.status == 200) {
                    setEmailField(false)
                    return setMessage()
                }
            })
            .catch(error => {
                setLoading(false)
                if (error.response) {
                    if (error.response.status == 400) {
                        return setMessage(error.response.data.message)
                    }
                }
            })
    }

    async function verifyOtp() {
        setMessage('')
        setLoading(true)
        axios.get(`https://sign-in-backend-rose.vercel.app/verifyuser?email=${email}&otp=${otp}`)
            .then(response => {
                setLoading(false)
                if (response.status == 200) {
                    setMessage('You have been verified sucessfully.')
                    setRedirecting(true);
                    setTimeout(() => {
                        navigate('/signin/forgetpassword/resetpassword', { state: email })
                    }, 3000);
                }
            })
            .catch(error => {
                setLoading(false)
                if (error.response) {
                    if (error.response.status == 400) {
                        return setMessage(error.response.data.message)
                    }
                }
            })
    }


    return (
        <>
            <div className='flex items-center justify-around h-screen'>
                <div className=''>
                    <img
                        className='w-96'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq43Z8epdseZzN29Tb1uC_QmDHFxtdgO-hhg&s"
                        alt="Forget Password" />
                </div>
                <div
                    className='flex flex-col items-start'
                >
                    <h1
                        className='mb-5 text-4xl font-medium'
                    >
                        Forgot
                    </h1>
                    <h1
                        className='mb-16 text-4xl font-medium'
                    >
                        Your Password ?
                    </h1>
                    {emailField && (
                        <div className='flex flex-col'>
                            <input
                                className='outline-0 px-4 w-80 h-10 border bg-gray-300 text-black'
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="text"
                                placeholder='Email Address'
                            />
                            <p className='text-red-500'>{userExistMessage}</p>
                            <p className='text-red-500'>{message}</p>
                            <button
                                className={`${resetButton ? 'px-10 mt-7 py-1 text-xl text-white rounded rounded-full bg-gray-400 cursor-not-allowed' : 'px-10 mt-7 py-1 text-xl text-white rounded rounded-full bg-blue-500 hover:bg-blue-600 duration-100'}`}
                                onClick={sendOtp}
                                disabled={resetButton}
                            >{loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Reset Password'
                            )}</button>
                            <Link
                                to='/signin'
                                className='text-lg text-gray-500 font-semibold hover:text-gray-600 duration-100'
                            >
                                Back to signin.
                            </Link>
                        </div>
                    )}


                    {!emailField && (
                        <div className='flex flex-col items-center justify-center'>
                            <h1
                                className='mb-5 text-lg'
                            >Otp has been sucessfully sent to <span className='text-lg font-bold'>{email.substring(0, 4) + '*****' + email.substring(email.indexOf('@'))}</span></h1>
                            <input
                                className='outline-0 px-4 w-80 h-10 border bg-gray-300 text-black'
                                onChange={(e) => { setOtp(e.target.value) }}
                                type="number"
                                placeholder='OTP'
                            />
                            <p className='text-red-500'>{message}</p>
                            <button
                                className='px-10 mt-7 py-1 text-xl text-white rounded rounded-full bg-blue-500 hover:bg-blue-600 duration-100'
                                onClick={verifyOtp}
                            >{loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Verify OTP'
                            )}</button>
                        </div>
                    )}

                </div>
            </div>
            {redirecting ? (
                <Backdrop
                    className='flex flex-col'
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={redirecting}
                >
                    <h1 className='text-4xl text-green-500'>{message}</h1>
                    <hr />
                    <h1 className='text-2xl text-green-500'>Redirecting to reset password page..</h1>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : ""}
        </>
    )
}

export default ForgotPassword
