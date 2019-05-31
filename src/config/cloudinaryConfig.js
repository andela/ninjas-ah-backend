import { config, uploader } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const cloudinaryConfig = () => config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || null,
  api_key: process.env.CLOUDINARY_API_KEY || null,
  api_secret: process.env.CLOUDINARY_API_SECRET || null
});
export { cloudinaryConfig, uploader };
