import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema= new mongoose.Schema({
    fullName:{type:String, required:true},
    address:{type:String, required:true},
    gender:{type:String, required:true, enum:["male", "female", "other"]},
    email:{type:String, required:true, unique:true},
    userName:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    userType:{type:String, default:"user"}
},{
    timestamps:true
})
//hash the passsowrd before it save
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,10)
        next()
    }
}
)
const User= mongoose.model("User",userSchema)
export default User