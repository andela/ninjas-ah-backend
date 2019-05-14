/* eslint-disable import/named */
import status from '../config/status';
import getSingleComment from '../queries/comments/getSingleComment';
import db from '../models';
import singleLike from '../queries/comments/singleLike';

// eslint-disable-next-line valid-jsdoc
/**
 * the middleware to check if the like exists
 * @param {object} req the request
 * @param { object } res the response
 * @param { function } next returns the object
 */
export default async function checkCommentLike(req, res, next) {
  try {
    const userId = req.body.userId || req.params.userId || 1;
    const comment = await getSingleComment({ id: req.params.commentId });
    if (!comment) {
      return res.status(status.NOT_FOUND).send({ message: 'The comment does not exist' });
    }
    const getSingleLike = await singleLike({
      userId,
      commentId: req.params.commentId,
      articleSlug: req.params.articleSlug
    });
    if (getSingleLike) {
      const where = { id: req.params.commentId };
      await db.Comment.update({ likes: comment.likes - 1 }, { where });
      return res.send({ message: 'You already liked the comment, so you removed the like' });
    }
    next();
  } catch (error) {
    return res.status(status.SERVER_ERROR).send({ message: 'Ooops something went wrong' });
  }
}
