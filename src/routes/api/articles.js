import { Router } from 'express';
import ArticleController from '../../controllers/ArticleController';
import validateArticle from '../../middlewares/validation/articles';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';

const articles = Router();
// create article
articles.post('/articles/', validateArticle.create, asyncHandler(ArticleController.saveArticle));
articles.get('/articles/', asyncHandler(ArticleController.getAllArticles));
articles.get(
  '/articles/:slug',
  checkArticleBySlug,
  asyncHandler(ArticleController.getSpecificArticle)
);
articles.put(
  '/articles/:slug',
  validateArticle.update,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/publish',
  validateArticle.slug,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);
articles.put(
  '/articles/:slug/publish',
  validateArticle.slug,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);
articles.put(
  '/articles/:slug/unpublish',
  validateArticle.slug,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);
articles.delete(
  '/articles/:slug',
  checkArticleBySlug,
  validateArticle.slug,
  asyncHandler(ArticleController.update)
);

export default articles;
