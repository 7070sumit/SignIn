import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'





function SignUp() {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState('')
  const [validMail,setValidMail]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()


  function emailValidation(){
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.match(pattern)){
      setValidMail('');
    }else{
      setValidMail('Please enter a valid e-mail.')
    }
  }

  async function register(e){
    e.preventDefault()
    setMessage('')
    if (!firstName||!email||!phone||!password||!confirmPassword){
      return setMessage("Please Enter all the fields.")
    }
    if (password!=confirmPassword){
      return setMessage("Password and Confirm Password must be same.")
    }
    setLoading(true)
    const userData={
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    }
    navigate('/signup/verify',{state:userData})
    setLoading('false')
  }


  return (
    <div className='flex items-center'>
      <div className='p-5 m-2 ml-20 mt-10 rounded shadow-2xl max-w-fit flex flex-col items-start justify-start'>
        <h1
          className='mb-2 text-left text-xl font-semibold'
        >Create New Account</h1>
        <form action="POST">
          <ul className=''>
            <li
              className='flex'>
                <section
                className='p-2 m-1 flex flex-col items-start'>
              <label
                className='font-medium'
              >First Name</label>
              <input
                className='outline-0 focus:duration-0 mr-5 pl-12 h-9 w-[145px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                type="text"
                onChange={(e) => { setFirstName(e.target.value) }}
              />
              </section>
              <section
                className='p-2 m-1 flex flex-col items-start'>
              <label
                className='ml-3 font-medium'
              >Last Name</label>
              <input
                className='outline-0 focus:duration-0 ml-3 pl-12 h-9 w-[145px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                type="text"
                onChange={(e) => { setLastName(e.target.value) }}
              />
              </section>
            </li>
            <li className=' p-2 m-1 flex flex-col items-start justify-center'>
              <label
                className='font-medium'
              >Email</label>
              <input
                className='outline-0 focus:border-blue-600 focus:duration-0 pl-12 h-9 w-[300px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                type="text"
                onChange={(e) => {
                   setEmail(e.target.value)
                   emailValidation() 
                  }}
              />
              <p className='text-red-600 text-sm'>{validMail}</p>
            </li>
            <li className=' p-2 m-1 flex flex-col items-start justify-center'>
              <label
                className='font-medium'
              >Phone Number</label>
              <input type="tel"
                className='text-left outline-0 focus:border-blue-600 focus:duration-0 pl-12 h-9 w-[300px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                placeholder="+91"
                onChange={(e)=>{setPhone(e.target.value)}}
                 />
            </li>
            <li className=' p-2 m-1 flex flex-col items-start justify-center'>
              <label
                className='font-medium'
              >Password</label>
              <input
                className='outline-0 focus:border-blue-600 focus:duration-0 pl-12 h-9 w-[300px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                autoComplete='on' />
            </li>
            <li className=' p-2 m-1 flex flex-col items-start justify-center'>
              <label
                className='font-medium'
              >Confirm Password</label>
              <input
                className='outline-0 focus:border-blue-600 focus:duration-0 pl-12 h-9 w-[300px] relative text-lg tracking-widest bg-trueGray-50  border-b border-gray-800 leading-6 focus:border-gray-400 hover:border-b hover:border-blue-400 hover:duration-200 hover:bg-gray-50'
                type="text"
                onChange={(e) => { setConfirmPassword(e.target.value) }}
                autoComplete='on'
              />
            </li>
            <h1
            className='text-lg text-red-600' 
            >{message}</h1>
            <li className='p-2 m-1 flex flex-col items-center justify-center'>
              <button
                className='px-10 py-1 text-xl text-white rounded rounded-full bg-blue-500'
                onClick={register}
              >Register</button>
            </li>

          </ul>
        </form>

        <h1
          className='text-left text-lg font-semibold'
        >
          Already have a account?
          <Link
            to='/signin'
            className='ml-2 text-blue-500 '
          >
            Sign in
          </Link></h1>
      </div>
      <div
        className='ml-96'
      >
        <img
          className='w-96'
          src="https://agencypluma.com/wp-content/uploads/2023/10/9092664-1.png"
          alt="SignIn Photo" />
      </div>
    </div>
  )
}

export default SignUp
