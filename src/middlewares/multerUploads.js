import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import cloudinaryConfig from '../config/cloudinaryConfig';

dotenv.config();
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // Maximum allowed image size: 1MB

const cdnConnect = cloudinaryConfig();

const storage = cloudinaryStorage({
  cloudinary,
  folder: cdnConnect.cloud_name,
  allowedFormat: ['jpg', 'png', 'jpeg']
});
const multerUploads = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE }
});
export default multerUploads;
