import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'
const storage= multer.diskStorage({
    destination:function (req,file,cb) {
         cb(null, '/uloads')  
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

export const optionalImageUpload=async(req,res,next)=>{
   try{
    const uploadImage=  upload.single('image')
    uploadImage(req,res,async (err))=>{
        try{


        }catch(error){

        }
    }

   }catch(error){
    res.status(500).json({error:error.message})
   }

}

//to upload file