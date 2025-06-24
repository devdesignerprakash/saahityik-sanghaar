import mongoose, { SchemaTypes } from 'mongoose'

const postSchema= new mongoose.Schema({
    title:{type:String,required:true},
    postType:{type:SchemaTypes.ObjectId, ref:'PostType',required:true},
    content:{type:String, required:true},
    author:{type:String, required:true},
    image:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comments:[{
        comment:{type:String,default:""},
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
    }]
},{
    timestamps:true
})
const Post = mongoose.model('Post',postSchema)

export default Post