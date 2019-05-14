/* eslint-disable import/named */
import status from '../config/status';
import { getSingleComment } from '../queries/comments/getSingleComment';
import db from '../models';
import { singleLike } from '../queries/comments/singleLike';

// eslint-disable-next-line valid-jsdoc
/**
 * the middleware to check if the like exists
 * @param {object} req the request
 * @param { object } res the response
 * @param { function } next returns the object
 */
export default async function FindCommentLike(req, res, next) {
  try {
    const userId = req.userId || req.userId || 1;
    const condition = {
      id: req.params.commentId
    };
    const comment = await getSingleComment(condition);
    if (!comment) {
      const notFoundMessage = {
        status: 404,
        message: 'The comment does not exist'
      };
      return res.status(status.NOT_FOUND).send(notFoundMessage);
    }
    const getSingleLike = await singleLike({
      userId,
      commentId: req.params.commentId
    });
    if (getSingleLike) {
      await db.Comment.update(
        { likes: comment.likes - 1 },
        {
          where: {
            id: req.params.commentId
          }
        }
      );
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        message: 'You already liked the comment, so you unliked'
      });
    }
    next();
  } catch (error) {
    return res.status(status.SERVER_ERROR).send({
      status: status.SERVER_ERROR,
      message: 'Ooops something went wrong'
    });
  }
}
