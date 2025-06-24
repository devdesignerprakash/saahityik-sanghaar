import PostType from "../models/postType.model.js"
export const createPostType=async(req,res)=>{
    try{
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ msg: 'Only admin can create post types' });
        }
        const {postType,remarks}=req.body
    
        const existPostType= await PostType.findOne({postType})
        if(existPostType){
            return res.status(422).json({msg:"post type already exist"})
        }
        const newPostType= await PostType.create({
            postType,
            remarks
        })
        res.status(201).json(newPostType)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const getAllPostTypes=async(req,res)=>{
    try{
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ msg: 'Only admin can get post types' });
        }
        const allPostTypes= await PostType.find()
        if(allPostTypes.length>0){
            return res.status(200).json(allPostTypes)
        }
        return res.status(400).json({msg:"No any post Type found"})

    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const updatePostType=async(req,res)=>{
    try{
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ msg: 'Only admin can update post types' });
        }
        const {id}= req.params
         const {postType}=req.body
        const existpostType= await PostType.findOne({_id:id})
        if(!existpostType){
            return res.status(400).json({msg:"post type not found"})
        }
        const updatedPostType= await PostType.findByIdAndUpdate({_id:id},{
            postType
        },{new:true})
        res.status(200).json(updatedPostType)
    }catch(error){
        res.status(500).json({error:error})
    }
}
export const deletePostType=async(req,res)=>{
    try{
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ msg: 'Only admin can delete post types' });
        }
        const {id}= req.params
        const existpostType= await PostType.findOne({_id:id})
        if(!existpostType){
            return res.status(400).json({msg:"post type not found"})
        }
        const deletedPostType= await PostType.findByIdAndDelete({_id:id})
        res.status(200).json({deletedPostType,
            msg:"deleted successfully"
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }
}