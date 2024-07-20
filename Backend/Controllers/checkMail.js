import users from '../Models/userModels.js'


async function checkMail(req,res){
    const {email}=req.query
    if(!email){
        return res.status(400).json({message:"Enter your email"})
    }
    try {
        const userExists=await users.findOne({email})
        if(userExists){
            return res.status(200).json({sucess:"disabled",message:"User already exists."})
        }else{
            return res.status(200).json({sucess:"",message:""})
        }
        
    } catch (error) {
        return res.status(500).json({message:"Error interacting with database."})
    }

}
export default checkMail