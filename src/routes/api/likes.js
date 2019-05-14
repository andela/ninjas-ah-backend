import { Router } from 'express';
import checkCommentLike from '../../middlewares/checkCommentLike';
import CommentLikeController from '../../controllers/CommentLikeController';
import checkArticle from '../../middlewares/checkArticle';
import checkArticleLike from '../../middlewares/checkArticleLike';

import ArticleLikeController from '../../controllers/ArticleLikeController';
import checkArticleDislike from '../../middlewares/checkArticleDislike';
import ArticleDislikeController from '../../controllers/ArticleDislikeController';

const router = Router();

router.post(
  '/:articleSlug/comments/:commentId/likes',
  checkArticle,

  checkCommentLike,
  CommentLikeController.create
);
router.post('/:articleSlug/likes', checkArticle, checkArticleLike, ArticleLikeController.create);
router.post(
  '/:articleSlug/dislikes',
  checkArticle,
  checkArticleDislike,
  ArticleDislikeController.create
);
export default router;
