import { Router } from 'express';
import UploadController from '../../controllers/UploadController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import multerUploads from '../../middlewares/multerUploads';
import validateArticle from '../../middlewares/validation/articles';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';

const upload = Router();
upload.post(
  '/upload',
  verifyToken,
  multerUploads.array('image', 1),
  asyncHandler(UploadController.save)
);
upload.get('/gallery', verifyToken, validateArticle.pagination, asyncHandler(UploadController.get));
upload.post(
  '/articles/:slug/cover',
  verifyToken,
  checkArticleBySlug,
  asyncHandler(UploadController.setCover)
);

export default upload;
