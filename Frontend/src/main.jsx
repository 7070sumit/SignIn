import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import {SignIn,SignUp,Home,Landing, VerifyOtp, ForgotPassword,ResetPassword} from './Components'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Landing/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='signin'>
        <Route path='' element={<SignIn/>}/>
        <Route path='forgetpassword'>
        <Route path='' element={<ForgotPassword/>}/>
        <Route path='verify' element={<VerifyOtp/>}/>
        <Route path='resetpassword' element={<ResetPassword/>}/>
        </Route>
      </Route>
      <Route path='signup'>
      <Route path='' element={<SignUp/>}/>
      <Route path='verify' element={<VerifyOtp/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
</React.StrictMode>,
)
