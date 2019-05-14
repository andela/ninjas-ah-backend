import { Router } from 'express';
import CommentController from '../../controllers/CommentController';
import Validation from '../../middlewares/validateComment';
import checkArticle from '../../middlewares/checkArticle';
import checkComment from '../../middlewares/checkComment';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';

const router = Router();

router.post(
  '/:articleSlug/comments',
  verifyToken,
  Validation,
  checkArticle,
  CommentController.create
);
router.get('/:articleSlug/comments', verifyToken, asyncHandler(CommentController.getAll));
router.put(
  '/:articleSlug/comments/:commentId',
  Validation,
  checkArticle,
  checkComment,
  CommentController.edit
);
router.delete(
  '/:articleSlug/comments/:commentId',
  verifyToken,
  checkArticle,
  checkComment,
  CommentController.delete
);

export default router;
