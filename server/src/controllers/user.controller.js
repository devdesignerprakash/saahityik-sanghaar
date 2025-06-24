import User from "../models/user.model.js"
export const getAllUsers=async(req,res)=>{
    try{
        const allUsers=await User.find()
        if(allUsers.length>0){
            res.status(200).json(allUsers)
        }
        res.status(400).json({msg:"No users found"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const getUser=async(req,res)=>{
    try{
        const {id}=req.user
        const user= await User.findById({_id:id})
        if(!user){
            return res.status(400).json({msg:"user not found"})
        }
        const{password:pass,...userDetail}=user._doc
        res.status(200).json(userDetail)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const deleteUser=async(req,res)=>{
    try{
        const {userType}=req.user
        const {id}=req.params
        if(userType!=='admin'){
            return res.status(401).json({msg:"unauthorized action"})
        }
        const deletedUser= await User.findByIdAndDelete({_id:id})
        res.status(200).json({msg:"user deleted successfully",deletedUser})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}