import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    try{
     const token=req.headers.authorization.split(" ")[1]
     const verifyToken= jwt.verify(token,process.env.JWT_SECRET)
      if(!verifyToken){
       return res.status(401).json({msg:"unauthorized user"})
    }
    const {id,userType}=verifyToken
    req.id=id
    req.userType=userType
    next()
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
