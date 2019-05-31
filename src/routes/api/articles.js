import { Router } from 'express';
import ArticleController from '../../controllers/ArticleController';
import validateArticle from '../../middlewares/validation/articles';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import verifyToken from '../../middlewares/verifyToken';
import shareArticle from '../../middlewares/shareArticle';

const articles = Router();
// create article
articles.post(
  '/articles',
  verifyToken,
  validateArticle.create,
  asyncHandler(ArticleController.saveArticle)
);

articles.get('/articles/bookmarked', verifyToken, ArticleController.getBookmarksOrFavorites);
articles.get('/articles/favorited', verifyToken, ArticleController.getBookmarksOrFavorites);

articles.get(
  '/articles',
  validateArticle.pagination,
  asyncHandler(ArticleController.getAllArticles)
);
articles.get(
  '/articles/:slug',
  checkArticleBySlug,
  asyncHandler(ArticleController.getSpecificArticle)
);
articles.get(
  '/profile/articles/drafts',
  verifyToken,
  asyncHandler(ArticleController.userArticleDrafts)
);
articles.get(
  '/profile/articles/published',
  verifyToken,
  asyncHandler(ArticleController.userArticlePublished)
);
articles.put(
  '/articles/:slug',
  verifyToken,
  validateArticle.update,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/publish',
  verifyToken,
  validateArticle.slug,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/publish',
  verifyToken,
  validateArticle.slug,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/unpublish',
  verifyToken,
  validateArticle.slug,
  checkArticleBySlug,
  asyncHandler(ArticleController.update)
);

articles.delete(
  '/articles/:slug',
  verifyToken,
  checkArticleBySlug,
  validateArticle.slug,
  asyncHandler(ArticleController.update)
);

articles.patch(
  '/articles/:slug/bookmark',
  verifyToken,
  checkArticleBySlug,
  ArticleController.bookmarkOrFavorite
);
articles.patch(
  '/articles/:slug/favorite',
  verifyToken,
  checkArticleBySlug,
  ArticleController.bookmarkOrFavorite
);

articles.delete(
  '/articles/:slug/bookmark',
  verifyToken,
  checkArticleBySlug,
  ArticleController.removeBookmarkOrFavorite
);

articles.delete(
  '/articles/:slug/favorite',
  verifyToken,
  checkArticleBySlug,
  ArticleController.removeBookmarkOrFavorite
);

articles.get(
  '/articles/:slug/share/facebook',
  verifyToken,
  checkArticleBySlug,
  shareArticle,
  ArticleController.share
);

articles.get(
  '/articles/:slug/share/twitter',
  verifyToken,
  checkArticleBySlug,
  shareArticle,
  ArticleController.share
);

articles.get(
  '/articles/:slug/share/linkedin',
  verifyToken,
  checkArticleBySlug,
  shareArticle,
  ArticleController.share
);

articles.get(
  '/articles/:slug/share/gmail',
  verifyToken,
  checkArticleBySlug,
  shareArticle,
  ArticleController.share
);

export default articles;
