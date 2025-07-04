import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export default cloudinary;
