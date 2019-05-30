import status from '../config/status';

import { Article } from '../queries';

/**
 * RatingController: Class that handles article rating
 */
class RatingController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async create(req, res) {
    const data = {
      rating: req.body.rating,
      articleId: req.article.id,
      userId: req.user.id
    };
    const response = await Article.rate.create(data);
    return response.errors
      ? res.status(status.BAD_REQUEST).send({ response })
      : res.status(response === 'created' ? status.CREATED : status.OK).send({
        rating: {
          message:
              response === 'created'
                ? 'Thank you for rating this article'
                : 'Your article rating has been updated'
        }
      });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async get(req, res) {
    const rating = await Article.rate.get({ articleId: req.article.id });
    return res.status(status.OK).send({
      article: rating
    });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async sortArticlesByRating(req, res) {
    const { limit, offset } = req.query;
    const articles = await Article.rate.sort(parseInt(limit, 0) || 20, offset || 0, {
      keyword: req.query.keyword,
      author: req.query.author,
      tag: req.query.tag
    });
    return articles.length >= 1 && !!articles
      ? res.status(status.OK).send({
        articles,
        articlesCount: articles.length
      })
      : res.status(status.NOT_FOUND).send({ message: 'No articles found' });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Responfromse  server
   * @returns {object} Object representing the response returned
   */
  static async ArticleRatings(req, res) {
    const { limit, offset } = req.query;
    const articleRatings = await Article.rate.articleRatings(
      parseInt(limit, 0) || 20,
      offset || 0,
      req.article.id
    );
    return Object.keys(articleRatings).length
      ? res.status(status.OK).send({
        articleRatings,
        articlesCount: articleRatings.length
      })
      : res.status(status.NOT_FOUND).send({ message: 'No rating for this article' });
  }
}

// validation
export default RatingController;
