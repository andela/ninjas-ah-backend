/* eslint-disable import/named */
import status from '../config/status';
import { create } from '../queries/comments/createlikes';
import db from '../models';
import { getSingleComment } from '../queries/comments/getSingleComment';
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
    const findComment = await getSingleComment({
      id: req.params.commentId
    });
    const userId = req.userId || req.params.userId || 1;
    const likeComment = await create({
      userId,
      commentId: req.params.commentId
    });
    findComment.likes += 1;
    await db.Comment.update(
      {
        likes: findComment.likes
      },
      {
        where: {
          id: req.params.commentId
        }
      }
    );

    return res.status(status.CREATED).send({
      status: status.CREATED,
      message: 'U liked the comment',
      data: likeComment
    });
  }
}
