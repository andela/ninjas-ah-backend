/* eslint-disable import/named */
import status from '../config/status';
import { getSingleComment } from '../queries/comments/getSingleComment';
// eslint-disable-next-line valid-jsdoc
/**
 * middleware funnction used in create comment controller to make checknif the article exists
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkComment(req, res, next) {
  try {
    const condition = {
      id: req.params.id,
      articleId: req.params.articleId
    };
    const comment = await getSingleComment(condition);
    if (!comment) {
      const notFoundMessage = {
        status: 404,
        message: 'The comment does not exist'
      };
      return res.status(status.NOT_FOUND).send(notFoundMessage);
    }
    next();
  } catch (error) {
    const response = {
      status: 500,
      error: 'Ooops, something went wrong'
    };
    return res.status(status.SERVER_ERROR).send(response);
  }
}
