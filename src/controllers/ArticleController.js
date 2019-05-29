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
  static async bookmarkOrFavorite(req, res) {
    const resourceAction = req.url.search(/\/bookmark/g) > 0 ? 'bookmark' : 'favorite';
    const result = await Article[resourceAction].add(req.user.id, req.params.slug);

    if (result.errors) {
      if (result.errors.name === 'SequelizeUniqueConstraintError') {
        result.errors = {
          code: status.EXIST,
          errors: { [resourceAction]: `sorry, this article is already in ${resourceAction}s` }
        };
      } else if (result.errors.name === 'SequelizeForeignKeyConstraintError') {
        result.errors = {
          code: status.UNAUTHORIZED,
          errors: { account: 'sorry, your account is not valid' }
        };
      } else {
        result.errors = { code: status.SERVER_ERROR, errors: 'oops, something went wrong' };
      }
    }

    return result.errors
      ? res.status(result.errors.code).json({ ...result.errors })
      : res.status(status.CREATED).json({ [resourceAction]: result });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getBookmarksOrFavorites(req, res) {
    const resourceAction = req.url.search(/\/bookmarked/g) > 0 ? 'bookmark' : 'favorite';
    const result = await Article[resourceAction].getAll(req.user.id);

    return result.errors
      ? res.status(status.SERVER_ERROR).json({ errors: 'oops, something went wrong' })
      : res.status(status.OK).json({ [[`${resourceAction}s`]]: result });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async removeBookmarkOrFavorite(req, res) {
    const resourceAction = req.url.search(/\/bookmark/g) > 0 ? 'bookmark' : 'favorite';
    const result = await Article[resourceAction].remove(req.user.id, req.params.slug);

    if (result.errors) {
      return res.status(status.SERVER_ERROR).json({
        errors: 'oops, something went wrong'
      });
    }

    return !result
      ? res.status(status.BAD_REQUEST).json({
        errors: { [resourceAction]: `article not removed from ${resourceAction}s` }
      })
      : res.status(status.OK).json({
        message: `article successfully removed from ${resourceAction}s `
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
