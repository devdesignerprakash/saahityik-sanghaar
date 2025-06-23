import User from "../models/user.model.js"
import { generateToken } from "../utils/token.js"
export const signUp=async(req,res)=>{
    try{
        const {fullName,email, address, gender,userName, password}=req.body
        const newUser= await User.create({
            fullName,
            email,
            address,
            gender,
            userName,
            password
        })
        
       const token= generateToken(newUser._id)
       res.status(201).json({
        newUser,
        token
       })
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}