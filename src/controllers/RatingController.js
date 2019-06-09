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
}
export default RatingController;
