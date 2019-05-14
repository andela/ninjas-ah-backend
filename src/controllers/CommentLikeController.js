/* eslint-disable import/named */
import status from '../config/status';
import create from '../queries/comments/createlikes';
import db from '../models';
import getSingleComment from '../queries/comments/getSingleComment';
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
    const condition = {
      id: req.params.commentId
    };
    const findComment = await getSingleComment(condition);
    const userId = req.userId || req.params.userId || 1;
    const comment = {
      userId,
      commentId: req.params.commentId,
      articleSlug: req.params.articleSlug
    };
    const likeComment = await create(comment);
    const likecondition = { likes: findComment.likes + 1 };
    await db.Comment.update(likecondition, { where: condition });

    return res.status(status.CREATED).send({
      message: 'You liked the comment',
      like: likeComment
    });
  }
}
