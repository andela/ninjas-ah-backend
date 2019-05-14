/* eslint-disable import/named */
import status from '../config/status';
import create from '../queries/comments/createlikes';
import singleLike from '../queries/comments/singleLike';
import db from '../models';
import { dbUpdate } from '../helpers/queryHelper';
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
    const getSingleLike = await singleLike(like);
    if (getSingleLike) {
      return res.send({
        errors: {
          message: 'You already liked the comment,unless you want to unlike'
        }
      });
    }
    const likeComment = await create(like);
    const findAllLikes = await db.CommentLike.findAll({
      where: { commentId }
    });
    await dbUpdate(db.Comment, { likes: findAllLikes.length }, { id: req.params.commentId });
    return res.status(status.CREATED).send({
      message: 'You liked the comment',
      like: likeComment
    });
  }

  /**
   *
   * @param {object } req the request
   * @param { object} res the response
   * @returns { object } returns the object
   */
  static async delete(req, res) {
    const userId = req.user.id;
    const { commentId, articleSlug } = req.params;
    const like = { userId, articleSlug, commentId };
    const getSingleLike = await singleLike(like);
    if (!getSingleLike) {
      return res.send({
        errors: { message: 'You did not like the comment yet, so you can unlike it' }
      });
    }
    await db.CommentLike.destroy({ where: like });
    const findAllLikes = await db.CommentLike.findAll({
      where: { commentId }
    });
    await dbUpdate(db.Comment, { likes: findAllLikes.length }, { id: req.params.commentId });
    return res.status(status.OK).send({
      message: 'You unliked the comment',
      number: findAllLikes.length
    });
  }
}
