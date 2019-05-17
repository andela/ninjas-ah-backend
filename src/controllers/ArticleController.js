import status from '../config/status';
import * as helpers from '../helpers';

import { Article } from '../queries';

/**
 * A class to handle actions performed on articles
 */
export default class ArticleController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async saveArticle(req, res) {
    const { coverUrl, tagList } = req.body;
    const newArticle = await Article.create({
      userId: req.user.id || 0,
      slug: helpers.generator.slug(req.body.title),
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      body: req.body.body.trim(),
      coverUrl,
      tagList,
      readTime: helpers.generator.readtime(req.body.body)
    });
    return res.status(status.CREATED).send({
      article: newArticle
    });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getAllArticles(req, res) {
    const {
      limit, offset, keyword, author, tag
    } = req.query;
    const articles = await Article.getAll(parseInt(limit, 0) || 20, offset || 0, {
      keyword,
      author,
      tag
    });
    if (articles.length >= 1 && !!articles) {
      res.status(status.OK).send({
        articles,
        articlesCount: articles.length
      });
    } else {
      res.status(status.NOT_FOUND).send({ message: 'No articles found' });
    }
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async userArticleDrafts(req, res) {
    const { limit, offset } = req.query;
    const { id } = req.user;
    const drafts = await Article.getUserArticles(parseInt(limit, 0) || 20, offset || 0, {
      userId: id,
      status: 'draft'
    });
    if (Object.keys(drafts).length > 0) {
      res.status(status.OK).send({
        articles: drafts,
        articlesCount: drafts.length
      });
    } else {
      res.status(status.NOT_FOUND).send({ message: 'No articles found' });
    }
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async userArticlePublished(req, res) {
    const { limit, offset } = req.query;
    const published = await Article.getUserArticles(parseInt(limit, 0) || 20, offset || 0, {
      userId: req.user.id,
      status: 'published'
    });
    return published.length >= 1 && !!published
      ? res.status(status.OK).send({
        articles: published,
        articlesCount: published.length
      })
      : res.status(status.NOT_FOUND).send({ message: 'No articles found' });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getSpecificArticle(req, res) {
    const oneArticle = await Article.get({ slug: req.params.slug });
    return res.status(status.OK).send({
      article: oneArticle
    });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async update(req, res) {
    let updateArticle = {};
    let message = '';
    if (Object.keys(req.body).length > 0) {
      updateArticle = {
        userId: req.userId || req.body.userId,
        title: req.body.title.trim(),
        body: req.body.body.trim(),
        description: req.body.description.trim(),
        readTime: helpers.generator.slug(req.body.body)
      };
      message = 'Article has been updated';
    } else if (req.url.search(/\/publish/g) > 0) {
      [updateArticle, message] = [{ status: 'published' }, 'Article has been published'];
    } else if (req.url.search(/\/unpublish/g) > 0) {
      [updateArticle, message] = [{ status: 'draft' }, 'Article has been unpublished'];
    } else if (req.method === 'DELETE') {
      [updateArticle, message] = [{ status: 'deleted' }, 'Article has been deleted'];
    }
    await Article.update(updateArticle, req.params.slug);
    return res.status(status.OK).send({ message });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async bookmark(req, res) {
    const bookmarkedArticle = await Article.bookmark.add(req.user.id, req.params.slug);
    const errors = bookmarkedArticle.errors || null;
    let errorMessage = 'Oups, something went wrong';
    let errorStatuscode = status.SERVER_ERROR;

    if (errors && errors.name === 'SequelizeUniqueConstraintError') {
      errorStatuscode = status.EXIST;
      errorMessage = { bookmark: 'sorry, you have already bookmarked this article' };
    }
    if (errors && errors.name === 'SequelizeForeignKeyConstraintError') {
      errorStatuscode = status.UNAUTHORIZED;
      errorMessage = { account: 'sorry, your account is not valid' };
    }

    return errors
      ? res.status(errorStatuscode).json({ errors: errorMessage })
      : res.status(status.CREATED).json({
        message: 'article successfuly bookmarked',
        bookmark: bookmarkedArticle
      });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getBookmarks(req, res) {
    const bookmarkedArticles = await Article.bookmark.getAll(req.user.id || 0);
    const errors = bookmarkedArticles.errors || null;

    return errors
      ? res.status(status.SERVER_ERROR).json({ errors: { bookmark: errors.message } })
      : res.status(status.OK).json({ bookmarks: bookmarkedArticles });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async removeBookmark(req, res) {
    const userId = req.user.id || 0;
    const { slug } = req.params;

    const removedBookmark = await Article.bookmark.remove(userId, slug);

    if (removedBookmark.errors) {
      return res.status(status.SERVER_ERROR).json({
        errors: { bookmark: removedBookmark.errors.message }
      });
    }

    if (!removedBookmark) {
      return res.status(status.BAD_REQUEST).json({
        errors: { bookmark: 'bookmark not removed' }
      });
    }
    return res.status(status.OK).json({
      message: 'bookmark successfuly removed'
    });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async share(req, res) {
    return res.status(status.OK).json({
      message: 'Thank you for sharing!',
      article: req.article
    });
  }
}
