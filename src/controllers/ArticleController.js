import status from '../config/status';
import { generateReadTime, generateSlug } from '../helpers';

import { Article } from '../queries';

/**
 * Author: Gilles Kagarama
 * @returns {object} Object representing the response returned
 */
class ArticleController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async saveArticle(req, res) {
    const title = req.body.title.trim();
    const body = req.body.body.trim();
    const description = req.body.description.trim();
    const slug = generateSlug(title);
    const readTime = generateReadTime(body);
    const { coverUrl, tagList } = req.body;
    const newArticle = await Article.create({
      userId: req.body.userId || 1,
      slug,
      title,
      description,
      body,
      coverUrl,
      tagList,
      readTime
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
    const allArticle = await Article.getAll();
    return res.status(status.OK).send({
      articles: allArticle
    });
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
        readTime: generateReadTime(req.body.body)
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
}

// validation
export default ArticleController;
