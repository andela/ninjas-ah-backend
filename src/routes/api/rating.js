import { Router } from 'express';
import RatingController from '../../controllers/RatingController';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
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

export default rating;
