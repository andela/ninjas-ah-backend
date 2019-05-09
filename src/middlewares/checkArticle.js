/* eslint-disable import/named */
import status from '../config/status';
import { getOne } from '../queries/articles/oneArticle';

// eslint-disable-next-line valid-jsdoc
/**
 * middleware funnction used in create comment controller to make checknif the article exists
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkArticle(req, res, next) {
  try {
    const article = await getOne({
      id: req.params.articleId
    });

    if (!article) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        message: 'That article does not exist'
      });
    }
    return next();
  } catch (error) {
    return res.status(status.SERVER_ERROR).send({
      status: status.SERVER_ERROR,
      message: 'Ooops, something went wrong'
    });
  }
}
