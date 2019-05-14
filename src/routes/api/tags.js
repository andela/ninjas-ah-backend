import { Router } from 'express';
import TagController from '../../controllers/TagController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateArticle from '../../middlewares/validation/articles';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import validateTags from '../../middlewares/validation/validateTags';
import verifyToken from '../../middlewares/verifyToken';

const tags = Router();

// create article
tags.put(
  '/articles/:slug/tags',
  verifyToken,
  checkArticleBySlug,
  validateTags.create,
  validateArticle.slug,
  asyncHandler(TagController.update)
);
tags.delete(
  '/articles/:slug/tags',
  verifyToken,
  checkArticleBySlug,
  asyncHandler(TagController.update)
);
tags.get('/tags', asyncHandler(TagController.getAll));

export default tags;
