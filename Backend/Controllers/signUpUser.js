import users from '../Models/userModels.js'

async function signUpUser(req, res) {

    const { firstName, lastName, phone, email, password, confirmPassword } = req.body.userData

    if (!firstName || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please enter all the fields." })
    }
    if (password != confirmPassword) {
        return res.status(400).json({ message: "Password and Confirm Password must be same." })
    }
    try {
        const userExists = await users.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists please login to continue." })
        }
        const newUser = new users({ firstName, lastName, phone, email, password, confirmPassword })
        const userRegistered = await newUser.save()
        if (userRegistered) {
            return  res.status(200).json({ message: "You are registered sucessfully." })
        } else {
            return  res.status(400).json({ message: "Error occured while saving your information to database." })
        }
    }
    catch (error) {
        return  res.status(500).json({ message: "Error occured while saving interacting with database." })
    }
}

export default signUpUser