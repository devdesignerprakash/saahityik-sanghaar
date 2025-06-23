import mongoose from 'mongoose'

const postTypeSchema= new Schema({
    postType:{type:String, required:true},
    remarks:{type:String}
})
const PostType= mongoose.model('PostType',postTypeSchema)
export default PostType