import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function handelSignup() {
    navigate('/signup')
  }

  async function signin() {
    if (!email || !password) {
      return setMessage('Please enter both the fields')
    }
    setLoading(true)
    await axios.get(`https://sign-in-backend-rose.vercel.app/login?email=${email}&password=${password}`)
      .then(response => {
        setLoading(false)
        if (response.status == 200) {
          navigate('/home', { state: response.data })
        }
      })
      .catch(error => {
        console.log(error);
        console.log('in error');
        setLoading(false)
        if (error.response) {
          if (error.response.status == 400 || error.response.status == 500) {
            return setMessage(error.response.data.message)
          }
        }
      })
  }

  return (
    <div
      className='flex items-center justify-center h-screen'
    >
      <div
        className='flex rounded-[44px] h-[500px] shadow-2xl'
      >
        <div
          className='p-5 flex-1 flex-col h-[500px]'
        >
          <h1
            className='p-2 m-5 text-3xl font-semibold'
          >Signin</h1>
          <p
            className='text-lg'
          >Welcome Back! Login to access your details.</p>
          <ul className='flex flex-col items-center justify-center'>
            <li className='px-5 my-3 w-60 flex items-center justify-center h-12 border rounded-full hover:bg-gray-50 duration-100'>
              <span>
                <svg
                  className=''
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="34px"
                  fill="#5f6368">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
              </span>
              <input
                className='outline-0'
                onChange={(e) => { setEmail(e.target.value) }}
                type="text"
                placeholder='Email'
              />
            </li>
            <li
              className='px-5 my-3 w-60 flex items-center justify-center h-12 border rounded-full hover:bg-gray-50 duration-100'
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="34px"
                  fill="#5f6368">
                  <path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z" /></svg>
              </span>

              <input
                className='outline-0'
                type="password"
                onChange={((e) => { setPassword(e.target.value) })}
                placeholder='Password'
              />
            </li>
          </ul>
          <section
            className='flex flex-col items-center justify-center'
          >
            <Link
              to='/signin/forgetpassword'
              className='text-lg text-blue-400'
            >
              Forgot your password?
            </Link>
            <h1 className='mt-5 text-red-500'
            >{message}</h1>
            <button
              className='px-10 mt-7 py-1 text-xl text-white rounded rounded-full bg-blue-500 hover:bg-blue-600 duration-100'
              onClick={signin}
            >{loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'SIGN IN'
            )}
            </button>
          </section>
        </div>
        <div
          className='p-5 bg-gradient-to-b from-cyan-200 to-cyan-700 flex flex-col items-center justify-center border h-[500px] w-[400px] rounded-br-[44px] rounded-tr-[44px]'
        >
          <h1
            className='-mt-8 text-4xl text-white font-medium'
          >Create,</h1>
          <h1
            className='mt-2 text-4xl text-white font-medium'
          >Account!</h1>
          <p
            className='mt-5 text-lg font-medium text-white'
          >Sign up if you still don't have an account.....</p>
          <button
            className='px-10 mt-24 py-1 text-xl text-white rounded rounded-full border border-white bg-cyan-500  hover:bg-cyan-600 duration-100'
            onClick={handelSignup}
          >SIGN UP</button>
        </div>

      </div>
    </div>
  )
}

export default SignIn
