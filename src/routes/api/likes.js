import { Router } from 'express';
import CommentLikeController from '../../controllers/CommentLikeController';
import checkArticle from '../../middlewares/checkArticle';
import verifyToken from '../../middlewares/verifyToken';
import ArticleLikeController from '../../controllers/ArticleLikeController';
import ArticleDislikeController from '../../controllers/ArticleDislikeController';
import checkComment from '../../middlewares/checkComment';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router.post(
  '/:articleSlug/comments/:commentId/like',
  verifyToken,
  checkArticle,
  checkComment,
  asyncHandler(CommentLikeController.create)
);
router.post(
  '/:articleSlug/comments/:commentId/unlike',
  verifyToken,
  checkArticle,
  checkComment,
  asyncHandler(CommentLikeController.delete)
);

router.post(
  '/:articleSlug/like',
  verifyToken,
  checkArticle,
  asyncHandler(ArticleLikeController.like)
);
router.post(
  '/:articleSlug/unlike',
  verifyToken,
  checkArticle,
  asyncHandler(ArticleLikeController.unlike)
);
router.post(
  '/:articleSlug/dislike',
  verifyToken,
  checkArticle,
  asyncHandler(ArticleDislikeController.dislike)
);
router.post(
  '/:articleSlug/undislike',
  verifyToken,
  checkArticle,
  asyncHandler(ArticleDislikeController.undislike)
);
export default router;
