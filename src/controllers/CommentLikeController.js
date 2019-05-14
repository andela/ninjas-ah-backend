/* eslint-disable import/named */
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
    updateCommentLikes(req);
    return res.status(status.CREATED).send({
      message: 'You liked the comment',
      like: likeComment
    });
  }
}
