import { Router } from 'express';
import TagController from '../../controllers/TagController';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';

const tags = Router();

// create article
tags.put('/articles/:slug/tags', checkArticleBySlug, asyncHandler(TagController.update));
tags.delete('/articles/:slug/tags', checkArticleBySlug, asyncHandler(TagController.update));
tags.get('/tags', asyncHandler(TagController.getAll));

export default tags;
