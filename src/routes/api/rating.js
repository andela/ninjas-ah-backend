import { Router } from 'express';
import RatingController from '../../controllers/RatingController';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import validateArticle from '../../middlewares/validation/articles';
import validateRating from '../../middlewares/validation/validateRating';
import verifyToken from '../../middlewares/verifyToken';
import checkPermissions from '../../middlewares/checkPermissions';

const rating = Router();

rating.post(
  '/rating/:slug/article',
  verifyToken,
  checkArticleBySlug,
  validateRating.create,
  checkPermissions({
    route: 'articles',
    action: 'create'
  }),
  asyncHandler(RatingController.create)
);

rating.get('/rating/:slug/article', checkArticleBySlug, asyncHandler(RatingController.get));
rating.get(
  '/rating/articles',
  validateArticle.pagination,
  asyncHandler(RatingController.sortArticlesByRating)
);

rating.get(
  '/rating/:slug/articles',
  checkArticleBySlug,
  validateArticle.pagination,
  asyncHandler(RatingController.ArticleRatings)
);
export default rating;
