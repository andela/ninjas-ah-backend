import { Router } from 'express';
import RatingController from '../../controllers/RatingController';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import validateRating from '../../middlewares/validation/validateRating';
import verifyToken from '../../middlewares/verifyToken';

const tags = Router();

tags.post(
  '/rating/:slug/article',
  verifyToken,
  checkArticleBySlug,
  validateRating.create,
  asyncHandler(RatingController.create)
);

tags.get('/rating/:slug/article', checkArticleBySlug, asyncHandler(RatingController.get));

export default tags;
