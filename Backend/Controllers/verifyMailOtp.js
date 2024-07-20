
import otps from '../Models/otpModel.js'

async function verifyMailOtp(req,res){
    const {email,otp}=req.query
    if (!email || !otp){
        return res.status(400).json({message:"Please enter your otp."})
    }
    try {
        const user=await otps.findOne({email})
        if (user){
            if (user.emailOtp==otp){
                return res.status(200).json({verified:true,user})
            }
            else{
                return res.status(400).json({message:"Invalid OTP"})
            }
            
        }else{
            res.status(400).json({message:"Otp was not sent sucessfully"})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error occured while interacting with the data base."})
    }   
}
export default verifyMailOtp