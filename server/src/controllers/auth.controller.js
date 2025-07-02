import User from "../models/user.model.js"
import { generateToken } from "../utils/token.js"
import bcrypt from 'bcryptjs'
export const signUp=async(req,res)=>{
    try{
        const {fullName,email, address, gender,userName, password}=req.body
        console.log(req)
        const existUser= await User.findOne({
            $or:[{userName:userName},{email:email}]
        })
        if(existUser){
            return res.status(400).json({msg:"user already exist"})
        }
        const newUser= await User.create({
            fullName,
            email,
            address,
            gender,
            userName,
            password
        })
       const token= generateToken(newUser._id,newUser.userType)
       res.status(201).json({
        msg:"user created successfully",
        newUser,
        token
       })
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}
export const login=async(req,res)=>{
    console.log(req.body)
    try{
        const {userName,email, password}=req.body
        if(!userName &&!email){
            return res.status(400).json({msg:'User Name or Email is required'})

        }
        const existUser= await User.findOne({
            $or:[{userName:userName},{email:email}]
        })
        if(!existUser){
            return res.status(400).json({msg:"user not found"})
        }
        const isPasswordMatch= bcrypt.compareSync(password,existUser.password)
        if(!isPasswordMatch){
            return res.status(401).json({msg:"Invlaid Crenditals"})
        }
        console.log(existUser)
        const token=generateToken(existUser._id,existUser.userType)
        res.status(200).json({
            msg:"user logged in successfully",
            token
        })  
    }
    catch(error){
        res.status(500).json({error:error.message})
    }

}