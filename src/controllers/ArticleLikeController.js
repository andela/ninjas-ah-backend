import statusCode from '../config/status';
import * as article from '../queries/articles/likes';
import updateArticleLikes from '../queries/articles/updateArticleLikes';

/**
 * A class to control the Article likes
 */
export default class ArticleLikeController {
  /**
   * A method to create an article like
   * @param {object} req the request to get like
   * @param {object} res the response of like from server
   * @returns {object} the return after liking a particular article
   */
  static async createLike(req, res) {
    let message = 'You likes the article';
    const userId = req.user.id;
    const { articleSlug, status } = req.params;
    const createLike = await article.createLike({
      userId,
      articleSlug,
      status
    });

    updateArticleLikes(req);
    if (status === 'dislike') {
      message = 'You disliked the article';
    }
    res.status(statusCode.CREATED).json({ message, createLike });
  }
}
