import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'






const Landing = () => {

  const navigate=useNavigate()
  function handelSignIn(){
    navigate('/signup')
  }
  
  function handelSignUp(){
    navigate('/signin')
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-500">
      <header className="w-full bg-white shadow-md fixed top-0">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-lg font-bold">LOGO</div>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-800 hover:text-blue-600">Home</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-600">Services</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-600">About</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-600">Blog</a></li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">SECURE YOUR ACCOUNT</h1>
        <p 
        className="text-gray-600 mb-8 font-semibold">
        Protect your account with our easy-to-use two-factor authenticator.
        </p>  
      </main>
      <section className="relative w-full h-64 flex items-center justify-center">
      <button 
      onClick={handelSignUp}
      className="px-6 py-2 mr-10 bg-orange-500 text-white font-semibold border border-orange-500  rounded-full hover:bg-orange-600 shadow-md shadow-orange-100"
      >SIGN IN</button>
      <button 
      onClick={handelSignIn}
      className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 border border-gray-300 shadow-md shadow-white "
      >SIGN UP</button>
      </section>
    </div>
  );
}

export default Landing;
