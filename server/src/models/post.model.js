import mongoose, { SchemaTypes } from 'mongoose'

const postSchema= new mongoose.Schema({
    title:{type:String,required:true},
    postType:{type:SchemaTypes.ObjectId, ref:'PostType',required:true},
    content:{type:String, required:true},
    author:{type:String, required:true},
    image:{type:String},
    likes:[{type:SchemaTypes.ObjectId, ref:"User"}],
    comments:[{
        comment:{type:String},
        user:{type:Schema.Types.ObjectId},
        default:""
    }]
},{
    timestamps:true
})
const Post = mongoose.model('Post',postSchema)

export default Post