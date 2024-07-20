import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Landing() {


  return (
    <div
    className='flex flex-col items-center justify-center'
    >
      <div className='-mt-5 w-full flex justify-end shadow-2xl rounded-full bg-transparent bg-gradient-to-r from-white to-orange-400'>
        <Link
          className='px-3 py-2 m-2 text-lg font-semibold text-white rounded rounded-full bg-green-600 hover:bg-green-500 hover:duration-300'
          to='/signup'
        >
          <button>Register</button>
        </Link>

        <Link
          className='px-3 py-2 m-2 bg-white text-lg font-semibold rounded rounded-full border border-gray-400 hover:bg-gray-400 hover:duration-300'
          to='/signin'
        >
          <button
          >Signin</button>
        </Link>
      </div>
      <div
      className='mt-20 w-60 h-60'
      >
        <img 
        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT3oZf-GEIysGo_GfQ_I6DYoifN4n8m9mURF9dtdsSoDN2XST7U" 
        alt="Landing image" />
      </div>
      </div>
  )
}

export default Landing