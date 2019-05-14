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
  asyncHandler(CommentController.create)
);
router.get(
  '/:articleSlug/comments',
  verifyToken,
  checkArticle,
  asyncHandler(CommentController.getAll)
);
router.put(
  '/:articleSlug/comments/:commentId',
  Validation,
  checkArticle,
  checkComment,
  asyncHandler(CommentController.edit)
);
router.delete(
  '/:articleSlug/comments/:commentId',
  verifyToken,
  checkArticle,
  checkComment,
  asyncHandler(CommentController.delete)
);
router.delete(
  '/:articleSlug/comments/:commentId',
  verifyToken,
  checkArticle,
  checkComment,
  CommentController.delete
);

export default router;
