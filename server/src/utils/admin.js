import User from "../models/user.model.js"

export const initAdmin=async()=>{
    const adminEmail=process.env.ADMIN_EMAIL
    const adminPassword=process.env.ADMIN_PASSWORD
    const adminUserName=process.env.ADMIN_USERNAME

    const existingAdmin= await User.findOne({email:adminEmail})
    if(existingAdmin){
        return
    }
    await User.create({
        fullName:"Prakash Neupane",
        gender:"male",
        userType:"admin",
        address:"Mirmee-07, Kaligandaki",
        password:adminPassword,
        email:adminEmail,
        userName:adminUserName
    })
    console.log('Admin created Successfully')
}