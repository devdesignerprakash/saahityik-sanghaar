import jwt from 'jsonwebtoken'

export const generateToken=(userId,userType)=>{
    const token = jwt.sign({id:userId,userType:userType}, process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    return token
}