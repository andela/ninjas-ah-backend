import { Router } from 'express';
import ArticleController from '../../controllers/ArticlesController';
import validateArticle from '../../middlewares/validation/articles';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticle from '../../middlewares/checkArticle';

const articles = Router();
// create article
articles.post('/articles/', validateArticle.create, asyncHandler(ArticleController.saveArticle));
articles.get('/articles/', asyncHandler(ArticleController.getAllArticles));
articles.get('/articles/:slug', checkArticle, asyncHandler(ArticleController.getSpecificArticle));
articles.put(
  '/articles/:slug',
  validateArticle.update,
  checkArticle,
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/publish',
  validateArticle.slug,
  checkArticle,
  asyncHandler(ArticleController.update)
);
articles.put(
  '/articles/:slug/publish',
  validateArticle.slug,
  checkArticle,
  asyncHandler(ArticleController.update)
);
articles.put(
  '/articles/:slug/unpublish',
  validateArticle.slug,
  checkArticle,
  asyncHandler(ArticleController.update)
);
articles.delete(
  '/articles/:slug',
  checkArticle,
  validateArticle.slug,
  asyncHandler(ArticleController.update)
);

export default articles;
