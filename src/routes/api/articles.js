import { Router } from 'express';
import ArticleController from '../../controllers/ArticleController';
import validateArticle from '../../middlewares/validation/articles';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';
import verifyToken from '../../middlewares/verifyToken';
import shareArticle from '../../middlewares/shareArticle';
import multerUploads from '../../middlewares/multerUploads';
import checkPermissions from '../../middlewares/checkPermissions';
import checkArticlePermissions from '../../middlewares/checkArticlePermissions';

const articles = Router();

// create article
articles.post(
  '/articles',
  verifyToken,
  checkPermissions({
    route: 'articles',
    action: 'create'
  }),
  multerUploads.array('coverUrl', 1),
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
  '/articles/drafts',
  verifyToken,
  checkPermissions({
    route: 'articles',
    action: 'read'
  }),
  asyncHandler(ArticleController.userArticleDrafts)
);
articles.get(
  '/articles/published',
  verifyToken,
  checkPermissions({
    route: 'articles',
    action: 'read'
  }),
  asyncHandler(ArticleController.userArticlePublished)
);
articles.get(
  '/articles/:slug',
  checkArticleBySlug,
  (req, res, next) => (req.article.status !== 'published'
    && res.status(404).json({
      errors: {
        article: 'article not found'
      }
    }))
    || next(),
  asyncHandler(ArticleController.getSpecificArticle)
);
articles.get(
  '/profile/articles/:slug',
  verifyToken,
  checkArticleBySlug,
  checkPermissions({ route: 'articles', action: 'read' }),
  checkArticlePermissions({
    normal: 'self',
    admin: 'self'
  }),
  asyncHandler(ArticleController.getSpecificArticle)
);
articles.put(
  '/articles/:slug',
  validateArticle.update,
  verifyToken,
  checkArticleBySlug,
  checkPermissions({ route: 'articles', action: 'edit' }),
  checkArticlePermissions({
    normal: 'self',
    admin: 'self'
  }),
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/publish',
  verifyToken,
  validateArticle.slug,
  checkArticleBySlug,
  checkPermissions({ route: 'articles', action: 'edit' }),
  checkArticlePermissions({ normal: 'self', admin: 'self' }),
  asyncHandler(ArticleController.update)
);

articles.put(
  '/articles/:slug/unpublish',
  verifyToken,
  checkArticleBySlug,
  validateArticle.slug,
  checkPermissions({ route: 'articles', action: 'edit' }),
  checkArticlePermissions({
    normal: 'self',
    admin: 'all'
  }),
  asyncHandler(ArticleController.update)
);

articles.delete(
  '/articles/:slug',
  verifyToken,
  checkPermissions({ route: 'articles', action: 'delete' }),
  checkArticleBySlug,
  checkArticlePermissions({
    normal: 'self',
    admin: 'all'
  }),
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
