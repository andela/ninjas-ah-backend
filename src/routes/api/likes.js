import { Router } from 'express';
import CommentLikeController from '../../controllers/CommentLikeController';
import checkArticle from '../../middlewares/checkArticle';
import verifyToken from '../../middlewares/verifyToken';
import ArticleLikeController from '../../controllers/ArticleLikeController';
import checkComment from '../../middlewares/checkComment';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleLike from '../../middlewares/checkArticleLike';
import checkCommentLike from '../../middlewares/checkCommentLike';

const router = Router();

router.post(
  '/:articleSlug/comments/:commentId/like',
  verifyToken,
  checkArticle,
  checkComment,
  checkCommentLike,
  asyncHandler(CommentLikeController.create)
);

router.post(
  '/:articleSlug/:status',
  verifyToken,
  checkArticle,
  checkArticleLike,
  asyncHandler(ArticleLikeController.createLike)
);
export default router;
