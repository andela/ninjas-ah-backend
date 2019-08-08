import status from '../config/status';
import * as comment from '../queries/comments/likes';
import updateCommentLikes from '../queries/comments/updateCommentLikes';

/**
 * Class to control likes for comments
 */
export default class CommentLikeController {
  /**
   *
   * @param {object } req the request
   * @param { object} res the response
   * @returns { object } returns the object
   */
  static async create(req, res) {
    const userId = req.user.id;
    const { commentId, articleSlug } = req.params;
    const like = { userId, commentId, articleSlug };
    const likeComment = await comment.createLike(like);
    await updateCommentLikes(req);
    return res.status(status.CREATED).send({
      message: 'You liked the comment',
      createLike: likeComment
    });
  }

  /**
   * A method to display all likes on an article
   * @param {object} req the request to get like
   * @param {object} res the response of like from server
   * @returns {object} the return after liking a particular article
   */
  static async getAll(req, res) {
    const { articleSlug, commentId } = req.params;
    const findAllLikes = await comment.getAllLikes({ articleSlug, commentId });
    return res.status(status.OK).json({
      commentId,
      likes: findAllLikes.length,
      whoLiked: { userId: findAllLikes.map(value => value.userId) }
    });
  }
}
