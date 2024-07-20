import users from '../Models/userModels.js'

async function loginUser(req,res){
    const {email,password}=req.query

    if(!email || !password){
        return res.status(200).json({message:"Please enter both the fields"})
    }
    try {
        const user=await users.findOne({email})
        if (user){
            if (user.password==password){
                return res.status(200).json({user})
            }
            else{
                return res.status(400).json({message:"Invalid login credential."})
            }

        }else{
            return res.status(400).json({message:"You are not registered please signup to continue."})
        }
        
    } catch (error) {
        return res.status(500).json({message:"Error occured while interacting with database."})
    }

}

export default loginUser