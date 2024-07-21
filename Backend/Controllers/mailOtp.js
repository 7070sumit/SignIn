import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import generateOTP from './otpGenerator.js'
import otps from '../Models/otpModel.js';

dotenv.config();


async function mailOtp(req, res) {
  const { email } = req.body
  

  const OTP = generateOTP();
  

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const msg = '<p>Your OTO is ' + OTP + ' <p/>'

  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP",
    message: "hello",
    html: <div style="max-width: 600px; margin: 40px auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; margin-top: 0;">One-Time Password (OTP)</h2>
    <p style="font-size: 16px; margin-bottom: 20px;">Hello!</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Your OTP is: <strong>${otp}</strong></p>
    <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Please enter this OTP to complete your registration.</p>
    <p style="font-size: 14px; color: #666; margin-bottom: 20px;">If you didn't request this OTP, please ignore this email.</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Best regards,</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Authenticator</p>
  </div>
  }

  const userExists=await otps.findOne({email})
  if(userExists){
    return res.status(400).json({ message: "Unable to send otp please wait a while and try again." })
  }
  else{
    transporter.sendMail(mailOption,async (error,info)=>{
      if (error) {
        return res.status(400).json({ message: "Some error occured while sending otp." })
      }else{
        const newotp = new otps({ email, emailOtp: OTP })
        const otpSent = await newotp.save()
        if (otpSent) {
          return res.status(200).json({ message: "Otp has been sent sucessfully" })
        } else {
          return res.status(400).json({ message: "Error occured while storing otp." })
        }
      }
    })
    
  }




  // transporter.sendMail(mailOption, async (error, info) => {
  //   if (error) {
  //     return res.status(400).json({ message: "Some error occured while sending otp." })
  //   }
  //   else {
  //     const userExists = await otps.findOne({ email })
  //     if (userExists) {
  //       return res.status(400).json({ message: "Unable to send otp please wait a while and try again." })
  //     } else {
        
  //       const newotp = new otps({ email, emailOtp: OTP })
  //       const otpSent = await newotp.save()
  //       if (otpSent) {
  //         return res.status(200).json({ message: "Otp has been sent sucessfully" })
  //       } else {
  //         return res.status(400).json({ message: "Error occured while storing otp." })
  //       }

  //     }
  //   }
  // })



}

export default mailOtp