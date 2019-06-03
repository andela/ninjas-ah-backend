/* eslint-disable import/named */

import status from '../config/status';
import * as article from '../queries/articles';

// eslint-disable-next-line valid-jsdoc
/**
 * middleware function used in create comment controller to make check if the article exists
 * @param { object } req the request from the user
 * @param { object } res The response from the server
 * @param { function } next  return object
 */
const checkArticle = async (req, res, next) => {
  try {
    const findArticle = await article.get({
      slug: req.params.articleSlug
    });
    if (!findArticle) {
      return res.status(status.NOT_FOUND).send({
        message: 'That article does not exist'
      });
    }
    next();
  } catch (error) {
    return res.status(status.SERVER_ERROR).send({
      message: 'Ooops, something went wrong'
    });
  }
};
export default checkArticle;
