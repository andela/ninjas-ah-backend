/* eslint-disable import/named */
import status from '../config/status';
import getSingleComment from '../queries/comments/getSingleComment';
// eslint-disable-next-line valid-jsdoc
/**
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkComment(req, res, next) {
  try {
    const condition = {
      id: req.params.id,
      articleSlug: req.params.articleSlug
    };
    const comment = await getSingleComment(condition);
    if (!comment) {
      const notFoundMessage = {
        message: 'The comment does not exist'
      };
      return res.status(status.BAD_REQUEST).send(notFoundMessage);
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
