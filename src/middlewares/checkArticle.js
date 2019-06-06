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
  const { articleSlug } = req.params;
  const findArticle = await article.get({ slug: articleSlug });
  if (!findArticle) {
    return res
      .status(status.NOT_FOUND)
      .json({ errors: { message: 'That article does not exist' } });
  }
  next();
};
export default checkArticle;
