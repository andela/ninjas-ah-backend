import { Router } from 'express';
import UploadController from '../../controllers/UploadController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import { multerUploads } from '../../middlewares/multer';
import validateArticle from '../../middlewares/validation/articles';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';

const upload = Router();
upload.post('/upload', verifyToken, multerUploads, asyncHandler(UploadController.save));
upload.get('/gallery', verifyToken, validateArticle.pagination, asyncHandler(UploadController.get));
upload.post(
  '/articles/:slug/cover',
  verifyToken,
  checkArticleBySlug,
  asyncHandler(UploadController.setCover)
);

export default upload;
