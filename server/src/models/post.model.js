import mongoose, { SchemaTypes } from 'mongoose'

const postSchema= new mongoose.Schema({
    title:{type:String,required:true},
    postType:{type:SchemaTypes.ObjectId, ref:'PostType',required:true},
    content:{type:String, required:true},
    author:{type:String, required:true},
    imageUrl:{type:String},
    status:{type:String, enum:["published","pending","rejected"], default:"pending"},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    postedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    publishedAt: { type: Date, default:null},
    comments:[{
        text:{type:String,default:""},
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        createdAt:{type:Date,default:null}
    }]
},{
    timestamps:true
})
const Post = mongoose.model('Post',postSchema)

export default Post