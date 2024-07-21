import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function VerifyOtp() {

  const location = useLocation()
  const userData = location.state
  const email = userData.email
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [disableOtpButton,setDisableOtpButton]=useState('')
  const [redirecting,setRedirecting]=useState(false)
  const [otpButton, setOtpButton] = useState(true)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  
  useEffect(()=>{
    checkUserInDatabase();
  },[email])

  async function checkUserInDatabase(){
    setMessage('')
    setLoading(true);
    await axios.get(`https://sign-in-backend-rose.vercel.app/checkmail?email=${email}`)
    .then(response=>{
      setDisableOtpButton(response.data.sucess)
      setMessage(response.data.message)
      setLoading(false);
      return
    })
    .catch(error=>{
      if (error.response) {
        if (error.response.status == 400) {
          return setMessage(error.response.data.message);
        }
      }
      setLoading(false);

    })
  }


  async function sendOtp() {
    setMessage('')
    setLoading(true);
    await axios.post('https://sign-in-backend-rose.vercel.app/sendOtp', { email })
      .then(response => {
        setOtpButton(false)
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status == 400) {
            setMessage(error.response.data.message);
          }
        }
        setLoading(false);
      })
  }

  async function verifyOtp() {
    setMessage('')
    setLoading(true);
    await axios.get(`https://sign-in-backend-rose.vercel.app/verifyuser?email=${email}&otp=${otp}`)
      .then(response => {
        if (response.data.verified == true) {
          register();
        }
        setLoading(false);

      })
      .catch(error => {
        if (error.response) {
          if (error.response.status == 400) {
            setMessage(error.response.data.message);
          }
        }
        setLoading(false);

      })
  }

  async function register() {
    setMessage('')
    setLoading(true);
    await axios.post('https://sign-in-backend-rose.vercel.app/signup', { userData })
      .then(response => {
        setMessage(response.data.message)
        setLoading(false)
        setRedirecting(true);
        setTimeout(() => {
          navigate('/signin') 
        }, 3000); 
        
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status == 400 || error.response.status == 500) {
            setMessage(error.respomse.data.message)
          }
        }
        setLoading(false);
      })
  }




  return (
    <>
      <div className='flex justify-between items-center h-screen'>
        <div className=' inline-block w-2/5'>
          <img
            className='w-full'
            src="https://img.freepik.com/premium-vector/secure-email-otp-authentication-verification-method_258153-468.jpg?w=2000"
            alt="Verify OTP " />
        </div>
        <div className='' >
          <ul className='text-left'>
            <h1
              className='m-2 mb-14 text-3xl font-semibold'
            >We'll also need to verify your email.</h1>
            <li className='my-3 flex text-xl'>
              <svg
                className='mr-2'
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px" fill="#000000">
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
              <h1>So you can hit the ground running and start using our <span className='font-semibold'>services.</span></h1>
            </li>
            <li className='my-3 flex text-xl'>
              <svg
                className='mr-2'
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px" fill="#000000">
                <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" /></svg>
              <h1>To verify you during log in through <span className='font-semibold'>two-factor authentication (2FA).</span></h1>
            </li>
            <li className='my-2 flex text-xl'>
              <svg
                className='mr-2'
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px" fill="#000000">
                <path d="M440-200h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm120-480h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
              <h1>To help us <span className='font-semibold'>mitigate fraud and abuse.</span></h1>
            </li>
          </ul>
          <hr className='m-5 h-0.5 bg-gray-300 ' />
          <h1
            className='text-small text-red-500'
          >{message}</h1>
          {!disableOtpButton&&(
              <h1
              className='m-2 text-xl'
            >Send otp to <span className='font-semibold'>{email.substring(0, 4) + '*****' + email.substring(email.indexOf('@'))} </span>for verification.</h1>
            )}
          {
            otpButton && (
              <div>
                <button
                  className={`${disableOtpButton ? 'bg-gray-300 cursor-not-allowed px-10 mt-5 py-1 text-xl text-white rounded rounded-full' : 'px-10 mt-5 py-1 text-xl text-white rounded rounded-full bg-blue-500 '}`}
                  disabled={disableOtpButton}
                  onClick={sendOtp}
                >{loading ? (
                  <CircularProgress size={24} color="inherit"/>
                ) : (
                  'Send OTP'
                )}</button>
              </div>
            )}
          {
            !otpButton && (
              <div className='flex flex-col items-center'>
                <input
                  className='outline-0 focus:border-blue-600 focus:duration-0 pl-12 h-9 w-[300px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                  placeholder='Enter OTP'
                  type="number"
                  onChange={(e) => { setOtp(e.target.value) }}
                />
                <button
                  className='px-10 mt-5 py-1 text-xl text-white rounded rounded-full bg-blue-500'
                  onClick={verifyOtp}
                >{loading ? (
                  <CircularProgress size={24} color="inherit"/>
                ) : (
                  'Verify'
                )}</button>
              </div>
            )
          }
        </div>
      </div>
      {redirecting ? (
        <Backdrop
        className='flex flex-col'
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={redirecting}
        > 
          <h1 className='text-4xl text-green-500'>{message}</h1>
          <hr/>
          <h1 className='text-2xl text-green-500'>Redirecting you to homepage.</h1>
          <CircularProgress color="inherit" />
        </Backdrop>
      ):""}
    </>

  )
}

export default VerifyOtp
