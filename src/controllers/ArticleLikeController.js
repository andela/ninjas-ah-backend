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
    let message = 'You liked the article';
    const userId = req.user.id;
    const { articleSlug, status } = req.params;
    const createLike = await article.create({
      userId,
      articleSlug,
      status
    });

    await updateArticleLikes(req);
    if (req.params.status === 'dislike') {
      message = 'You disliked the article';
      return res.status(statusCode.CREATED).json({ message, createLike });
    }
    return res.status(statusCode.CREATED).json({ message, createLike });
  }

  /**
   * A method to display all likes on an article
   * @param {object} req the request to get like
   * @param {object} res the response of like from server
   * @returns {object} the return after liking a particular article
   */
  static async getAllLikes(req, res) {
    const { articleSlug } = req.params;
    const findAllLikes = await article.getAllLikes({ status: 'like', articleSlug });
    const findAllDislikes = await article.getAllLikes({ status: 'dislike', articleSlug });
    return res.status(statusCode.OK).json({
      likes: findAllLikes.length,
      dislikes: findAllDislikes.length,
      whoLiked: { userId: findAllLikes.map(value => value.userId) },
      whoDisliked: { userId: findAllDislikes.map(value => value.userId) }
    });
  }
}
