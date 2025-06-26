import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_SECRET,
  secure_distribution: "mydomain.com",
  upload_prefix: "https://api-eu.cloudinary.com",
});
export default cloudinary;
