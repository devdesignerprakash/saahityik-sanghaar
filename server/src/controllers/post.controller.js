import Post from "../models/post.model.js";
import PostType from "../models/postType.model.js";

export const createPost=async(req,res)=>{
    console.log(req.body)
    try{
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ msg: 'Only admin can create post' });
        }
        const {title,postType,content,author,image}=req.body
        const existPostType= await PostType.findOne({postType})
        if(!existPostType){
            return res.status(400).json({ error: "Invalid postType name" })
        }
        const newPost= await Post.create({
            title,
            postType:existPostType._id,
            content,
            author,
            image
        })
        res.status(201).json(newPost)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const getPosts=async(req,res)=>{
    try{
        const allPosts= await Post.find()
        if(allPosts.length>0){
           return res.status(200).json(allPosts)
        }
        return res.staus(400).json({msg:"no post found"})

    }catch(error){
        res.status(500).json({error:error.message})
    }
}