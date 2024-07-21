import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


function ResetPassword() {
  const location = useLocation()
  const email = location.state;
  const navigate=useNavigate();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [redirecting, setRedirecting] = useState(true)
  const [loading, setLoding] = useState(false)

  async function resetPassword() {
    console.log(password);
    console.log(confirmPassword);
    if (!password || !confirmPassword) {
      return setMessage('Please enter both the fields.')
    }
    if (password != confirmPassword) {
      return setMessage('Password and Confirm Password must be same.')
    }
    console.log('in reset password');
    setLoding(true)
    await axios.put('https://sign-in-backend-rose.vercel.app/resetpassword', { email, password, confirmPassword })
      .then(response => {
        setLoding(false)
        if (response.status == 200) {
          setRedirecting(false)
          setTimeout(() => {
            navigate('/signin')
        }, 3000);
          return setMessage(response.data.message)
        }
      })
      .catch(error => {
        setLoding(false)
        if (error.response) {
          if (error.response.status == 400 || error.response.status == 500) {
            return setMessage(error.response.data.message)
          }
        }
      })
  }




  return (
    <div
      className='flex flex-col items-center justify-center'
    >
      <div>
        <img
          className='w-[500px]'
          src="https://static.vecteezy.com/system/resources/previews/011/842/991/non_2x/man-is-working-at-a-computer-use-a-computer-mouse-and-typing-on-keyboard-illustration-simple-graphic-style-vector.jpg"
          alt="" />
      </div>
      {!redirecting && (
        <div>
          <h1 className='mb-5 text-3xl font-semibold text-green-600 '>Password updated.</h1>
          <h1 className='text-3xl font-semibold'>Redirecting to login..</h1>
        </div>
      )}

      {redirecting && (
        <div>
          <h1
            className='mb-16 text-3xl font-semibold'
          >Enter your new Password.</h1>
          <ul
            className='flex flex-col items-center justify-center'>
            <li
              className='mb-5 flex flex-col items-start'
            >
              <label
                className='text-lg font-semibold'
              >Password</label>
              <input
                className='px-2 outline-0 bg-gray-200 hover:bg-gray-300 duration-100 text-black'
                onChange={(e) => { setPassword(e.target.value) }}
                type="password" />
            </li>
            <li
              className='mb-5 flex flex-col items-start'
            >
              <label
                className='text-lg font-semibold'
              >Confirm Password</label>
              <input
                className='px-2 outline-0 bg-gray-200 hover:bg-gray-300 duration-100 text-black'
                onChange={(e) => { setConfirmPassword(e.target.value) }}
                type="text" />
            </li>
          </ul>
          <button
            className='px-10 py-1 text-xl text-white rounded rounded-full bg-blue-500 hover:bg-blue-600 duration-100'
            onClick={resetPassword}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Reset Password'
            )}
          </button>
        </div>
      )}

    </div>
  )
}

export default ResetPassword
