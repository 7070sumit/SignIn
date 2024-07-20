import express from 'express'
import signUpUser from '../Controllers/signUpUser.js';
import loginUser from '../Controllers/loginUsers.js';
import resetPassword from '../Controllers/resetPassword.js'
import mailOtp from '../Controllers/mailOtp.js';
import verifyMailOtp from '../Controllers/verifyMailOtp.js';
import checkMail from '../Controllers/checkMail.js';



const router=express.Router();


router.get('/',(req,res)=>{
    return res.send('<h1>Hello from vercel</h1>')
})

router.post('/signup',(req,res)=>{
    signUpUser(req,res);
})
router.get('/login',(req,res)=>{
    loginUser(req,res)
})
router.put('/resetpassword',(req,res)=>{
    resetPassword(req,res)
})
router.post('/sendotp',(req,res)=>{
    mailOtp(req,res);
})
router.get('/verifyuser',(req,res)=>{
    verifyMailOtp(req,res)
})
router.get('/checkmail',(req,res)=>{
    checkMail(req,res)
})

export default router