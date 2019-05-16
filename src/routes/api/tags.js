import { Router } from 'express';
import TagController from '../../controllers/TagController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateArticle from '../../middlewares/validation/articles';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import validateTags from '../../middlewares/validation/validateTags';

const tags = Router();

// create article
tags.put(
  '/articles/:slug/tags',
  checkArticleBySlug,
  validateTags.create,
  validateArticle.slug,
  asyncHandler(TagController.update)
);
tags.delete('/articles/:slug/tags', checkArticleBySlug, asyncHandler(TagController.update));
tags.get('/tags', asyncHandler(TagController.getAll));

export default tags;
