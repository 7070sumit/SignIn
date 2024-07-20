import users from '../Models/userModels.js'
async function resetPassword(req,res){
    const {email,password,confirmPassword}=req.body

    if (!email||!password||!confirmPassword){
        return res.status(400).json({message:"Please enter all the fields"})
    }
    if (password!=confirmPassword){
        return res.status(400).json({message:"Password & Confirm Password must be same."})
    }
    try {
        const user=await users.findOne({email})
        if (user){
            user.password=password;
            user.confirmPassword=confirmPassword;
            const sucess=await user.save()
            console.log(sucess);
            if(sucess){
                return res.status(200).json({message:"Your password has been updated sucessfully."})
            }else{
                return res.status(400).json({message:"Unable to reset your password."})
            }
        }else{
            return res.status(400).json({message:"You are not registered please login to continue."})
        }
        
    } catch (error) {
        return res.status(500).json({message:"Error occured while interacting with the database."})
    }



}
export default resetPassword;