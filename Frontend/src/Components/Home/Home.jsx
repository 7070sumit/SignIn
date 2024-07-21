import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


function Home() {

  const location = useLocation()
  const userData = location.state
  const [userId,setUserId]=useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')

  useEffect(() => {
    assignValues()
  }, [])


  function assignValues() {
    console.log(userData);
    setUserId(userData.user._id)
    setFirstName(userData.user.firstName)
    setLastName(userData.user.lastName)
    setEmail(userData.user.email)
    setPhone(userData.user.phone)
  }





  return (
    <div className='flex flex-col items-start justify-center h-screen'>
      <div className='ml-10'>
        <h1 className='text-4xl font-medium text-gray-700'>Welcome back,</h1>
        <h1 className='mt-5 text-4xl font-bold text-orange-500 font-serif'>{firstName}.</h1>
      </div>
      <div className='mt-20 flex items-center justify-center w-screen '>
        <div>
          <table class="table-auto mb-4">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2 text-center text-xl w-48 border border-gray-500">Description</th>
                <th class="px-4 py-2 text-center text-xl w-60 border border-gray-500">Detail</th>
              </tr>
            </thead>
            <tbody>
            <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 text-xl  border border-gray-500">User Id</td>
                <td class="px-4 py-2 border text-xl font-medium text-blue-600 border-gray-500">{userId}</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 text-xl  border border-gray-500">First Name</td>
                <td class="px-4 py-2 border text-xl font-medium text-blue-600 border-gray-500">{firstName}</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 text-xl  border border-gray-500">Last Name</td>
                <td class="px-4 py-2 border text-xl font-medium text-blue-600 border-gray-500">{lastName}</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 text-xl  border border-gray-500">Email Address</td>
                <td class="px-4 py-2 border text-xl font-medium text-blue-600 border-gray-500">{email}</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 text-xl  border border-gray-500">Phone Number</td>
                <td class="px-4 py-2 border text-xl font-medium text-blue-600 border-gray-500">{phone}</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Home
