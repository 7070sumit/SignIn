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
    html: msg
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




 



}

export default mailOtp