/* eslint-disable import/named */
import status from '../config/status';
import { getOne } from '../queries/comments/getSingleComment';
// eslint-disable-next-line valid-jsdoc
/**
 * middleware funnction used in create comment controller to make checknif the article exists
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkComment(req, res, next) {
  try {
    const comment = await getOne({
      id: req.params.id,
      articleId: req.params.articleId
    });
    if (!comment) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        message: 'The comment does not exist'
      });
    }
    next();
  } catch (error) {
    return res.status(status.SERVER_ERROR).send({
      status: status.SERVER_ERROR,
      message: 'Ooops, something went wrong'
    });
  }
}
