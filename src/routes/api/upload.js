import { Router } from 'express';
import UploadController from '../../controllers/UploadController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import { multerUploads } from '../../middlewares/multer';

const upload = Router();
upload.post('/upload', verifyToken, multerUploads, asyncHandler(UploadController.save));

export default upload;
