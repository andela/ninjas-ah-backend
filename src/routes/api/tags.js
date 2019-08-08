import { Router } from 'express';
import TagController from '../../controllers/TagController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateArticle from '../../middlewares/validation/articles';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import validateTags from '../../middlewares/validation/validateTags';
import verifyToken from '../../middlewares/verifyToken';
import checkPermissions from '../../middlewares/checkPermissions';

const tags = Router();

// create article
tags.put(
  '/articles/:slug/tags',
  verifyToken,
  checkArticleBySlug,
  validateTags.create,
  validateArticle.slug,
  checkPermissions({
    route: 'articles',
    action: 'edit'
  }),
  asyncHandler(TagController.update)
);
tags.delete(
  '/articles/:slug/tags',
  verifyToken,
  checkArticleBySlug,
  checkPermissions({
    route: 'tags',
    action: 'delete'
  }),
  asyncHandler(TagController.update)
);
tags.get('/tags', asyncHandler(TagController.getAll));

export default tags;
