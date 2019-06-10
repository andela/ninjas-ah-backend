/* eslint-disable import/named */
import status from '../config/status';
import * as Comment from '../queries/comments';
// eslint-disable-next-line valid-jsdoc
/**
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkComment(req, res, next) {
  const { articleSlug, commentId } = req.params;
  const comment = await Comment.getSingle({ id: commentId, articleSlug });
  if (!comment) {
    return res.status(status.NOT_FOUND).json({ errors: { message: 'Comment not found' } });
  }
  next();
}
