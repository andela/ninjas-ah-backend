import { Router } from 'express';
import ArticleController from '../../controllers/ArticlesController';
import validateArticle from '../../middlewares/validation/articles';
import errorCatcher from '../../middlewares/errorCatcher';
import checkArticle from '../../middlewares/checkArticle';

const articles = Router();
// create article
articles.post('/articles/', validateArticle.create, errorCatcher(ArticleController.saveArticle));
articles.get('/articles/', errorCatcher(ArticleController.getAllArticles));
articles.get('/articles/:slug', checkArticle, errorCatcher(ArticleController.getSpecificArticle));
articles.put(
  '/articles/:slug',
  validateArticle.update,
  checkArticle,
  errorCatcher(ArticleController.update)
);

articles.put(
  '/articles/:slug/publish',
  validateArticle.slug,
  checkArticle,
  errorCatcher(ArticleController.update)
);
articles.put(
  '/articles/:slug/publish',
  validateArticle.slug,
  checkArticle,
  errorCatcher(ArticleController.update)
);
articles.put(
  '/articles/:slug/unpublish',
  validateArticle.slug,
  checkArticle,
  errorCatcher(ArticleController.update)
);
articles.delete(
  '/articles/:slug',
  checkArticle,
  validateArticle.slug,
  errorCatcher(ArticleController.update)
);

export default articles;
